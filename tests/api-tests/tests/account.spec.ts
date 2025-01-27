import {
  request as playwrightRequest,
  APIRequestContext,
} from '@playwright/test';
import { test, expect } from '../fixtures/env.fixture';
import { AuthSupport, LoginResponse } from '../supports/auth.support';

let requestContext: APIRequestContext;

const authSupport = new AuthSupport();

test.beforeAll(async ({ env }) => {
  const loginResponse: LoginResponse = await authSupport.login(
    env.USER_EMAIL,
    env.USER_PASSWORD,
    env.BASE_URL,
  );

  requestContext = await playwrightRequest.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${loginResponse.accessToken}`,
    },
  });
});

test.afterAll(async () => {
  await requestContext.dispose();
});

test('should login, get users and account info', async ({ env }) => {
  const infoResponse = await requestContext.get(
    `${env.BASE_URL}/auth/manage/info/full`,
  );

  expect(infoResponse.status()).toBe(200);
  const infoResponseBody = await infoResponse.json();
  expect(infoResponseBody.email).toBe(env.USER_EMAIL);

  const userResponse = await requestContext.get(
    `${env.BASE_URL}/auth/manage/info`,
  );

  expect(userResponse.status()).toBe(200);
  const userResponseBody = await userResponse.json();
  expect(userResponseBody.email).toBe(env.USER_EMAIL);
});

test('should refresh token', async ({ env }) => {
  const loginResponse = await authSupport.login(
    env.USER_EMAIL,
    env.USER_PASSWORD,
    env.BASE_URL,
  );

  const loginContext = await playwrightRequest.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${loginResponse.accessToken}`,
    },
  });

  const refreshResponse = await loginContext.post(
    `${env.BASE_URL}/auth/refresh`,
    {
      data: {
        refreshToken: loginResponse.refreshToken,
      },
    },
  );

  expect(refreshResponse.status()).toBe(200);
  const refreshResponseBody: LoginResponse = await refreshResponse.json();
  expect(refreshResponseBody.accessToken).toBeDefined();

  const refreshContext = await playwrightRequest.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${refreshResponseBody.accessToken}`,
    },
  });

  const infoResponse = await refreshContext.get(`${env.BASE_URL}/auth/user`);

  expect(infoResponse.status()).toBe(200);
  const infoResponseBody = await infoResponse.json();
  expect(Array.isArray(infoResponseBody)).toBe(true);
  expect(
    infoResponseBody.some(
      (user: { email: string }) => user.email === env.USER_EMAIL,
    ),
  ).toBe(true);
});
