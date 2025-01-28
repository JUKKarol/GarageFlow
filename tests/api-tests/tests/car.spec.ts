import {
  request as playwrightRequest,
  APIRequestContext,
} from '@playwright/test';
import { test, expect } from '../fixtures/env.fixture';
import { AuthSupport, LoginResponse } from '../supports/auth.support';
import { faker } from '@faker-js/faker';

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

test('should create car with brand and model', async ({ env }) => {
  const brandName = `${faker.vehicle.manufacturer()}${faker.number.int({ min: 1, max: 1000 })}`;
  const modelName = faker.vehicle.model();

  const brandResponse = await requestContext.post(`${env.BASE_URL}/brand`, {
    data: {
      name: brandName,
    },
  });

  expect(brandResponse.status()).toBe(200);
  const brandResponseBody = await brandResponse.json();
  expect(brandResponseBody.name).toBe(brandName);

  const modelResponse = await requestContext.post(`${env.BASE_URL}/model`, {
    data: {
      brandId: brandResponseBody.id,
      name: modelName,
    },
  });

  expect(modelResponse.status()).toBe(200);
  const modelResponseBody = await modelResponse.json();
  expect(modelResponseBody.name).toBe(modelName);

  const carResponse = await requestContext.post(`${env.BASE_URL}/car`, {
    data: {
      engine: 2000,
      fuelType: 1,
      registrationNumber: 'string',
      vin: faker.vehicle.vin(),
      yearOfProduction: 2020,
      modelId: modelResponseBody.id,
    },
  });

  expect(carResponse.status()).toBe(200);
  const carResponseBody = await carResponse.json();
  expect(carResponseBody.modelId).toBe(modelResponseBody.id);
});
