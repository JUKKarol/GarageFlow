import { expect, request as playwrightRequest } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class AuthSupport {
  async login(
    email: string,
    password: string,
    apiUrl: string,
  ): Promise<LoginResponse> {
    const loginResponse = await (
      await playwrightRequest.newContext()
    ).post(`${apiUrl}/auth/login`, {
      data: {
        email,
        password,
      },
    });

    expect(loginResponse.status()).toBe(200);
    const loginResponseBody = await loginResponse.json();
    const accessToken = loginResponseBody.accessToken;
    const refreshToken = loginResponseBody.refreshToken;

    return { accessToken, refreshToken };
  }
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
