import {
  test,
  expect,
  request as playwrightRequest,
  APIRequestContext,
} from '@playwright/test';
import dotenv from 'dotenv';
import { AuthSupport } from '../supports/auth.support';

dotenv.config();

let requestContext: APIRequestContext;

const apiUrl = process.env.BASE_URL!;
const email = process.env.USER_EMAIL!;
const password = process.env.USER_PASSWORD!;
const authSupport = new AuthSupport();

test.beforeAll(async () => {
  const loginResponse = await authSupport.login(email, password, apiUrl);

  requestContext = await playwrightRequest.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${loginResponse.accessToken}`,
    },
  });
});

test.afterAll(async () => {
  await requestContext.dispose();
});

test('should login, get users and account info', async () => {
  const infoResponse = await requestContext.get(
    `${apiUrl}/auth/manage/info/full`,
  );

  expect(infoResponse.status()).toBe(200);
  const infoResponseBody = await infoResponse.json();
  expect(infoResponseBody.email).toBe(email);

  const userResponse = await requestContext.get(`${apiUrl}/auth/manage/info`);

  expect(userResponse.status()).toBe(200);
  const userResponseBody = await userResponse.json();
  expect(userResponseBody.email).toBe(email);
});

test('should refresh token', async () => {
  const loginResponse = await authSupport.login(email, password, apiUrl);

  const loginContext = await playwrightRequest.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${loginResponse.accessToken}`,
    },
  });

  const refreshResponse = await loginContext.post(`${apiUrl}/auth/refresh`, {
    data: {
      refreshToken: loginResponse.refreshToken,
    },
  });

  expect(refreshResponse.status()).toBe(200);
  const refreshResponseBody = await refreshResponse.json();
  expect(refreshResponseBody.accessToken).toBeDefined();

  const refreshContext = await playwrightRequest.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${refreshResponseBody.accessToken}`,
    },
  });

  const infoResponse = await refreshContext.get(`${apiUrl}/auth/user`);

  expect(infoResponse.status()).toBe(200);
  const infoResponseBody = await infoResponse.json();
  expect(Array.isArray(infoResponseBody)).toBe(true);
  expect(
    infoResponseBody.some((user: { email: string }) => user.email === email),
  ).toBe(true);
});
