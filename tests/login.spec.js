const { test, expect } = require("@playwright/test");
const { LoginPage} = require("../pages/LoginPage");

test ('successful login', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

})

test ('invalid login show error', async ({page}) =>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong_user', 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();

})

test ('empty fields show wrror', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toBeVisible();

})