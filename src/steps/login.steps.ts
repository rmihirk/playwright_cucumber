import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'expect';
import { LoginPage } from '../pages/LoginPage';
import { fixture } from '../hooks/fixtures';


let loginPage: LoginPage;
Given('I am on the login page', async function () {
  loginPage = new LoginPage(fixture.page!);
  await loginPage!.navigate();
});

When('I enter username {string} and password {string}', async function (username: string, password: string) {
  await loginPage!.login(username, password);
});

Then('I can see login button is enabled', async function () {
  const isEnabled = await loginPage.loginButtonIsEnabled();
  expect(isEnabled).toBe(true);
});

Then('I can see login button is disabled', async function () {
  const isDisabled = await loginPage.loginButtonIsDisabled();
  expect(isDisabled).toBe(true);
});