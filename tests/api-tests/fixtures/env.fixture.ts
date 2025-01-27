import { test as baseTest } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

type EnvFixtures = {
  env: {
    BASE_URL: string;
    USER_EMAIL: string;
    USER_PASSWORD: string;
  };
};

export const test = baseTest.extend<EnvFixtures>({
  // eslint-disable-next-line no-empty-pattern
  env: async ({}, use) => {
    const env = {
      BASE_URL: process.env.BASE_URL!,
      USER_EMAIL: process.env.USER_EMAIL!,
      USER_PASSWORD: process.env.USER_PASSWORD!,
    };
    await use(env);
  },
});

export { expect } from '@playwright/test';
