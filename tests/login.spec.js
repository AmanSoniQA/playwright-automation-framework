const { test, expect } = require("@playwright/test");
const { LoginPage} = require("../pages/LoginPage");
const { users } = require("../data/users");

let loginPage;

test.beforeEach(async({page})=> {
    loginPage = new LoginPage(page);
    await loginPage.goto();
})

test ('successful login', async ({page}) => {
   
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

})

test ('invalid login show error', async ({page}) =>{
   
    await loginPage.login(users.invalid.username, users.invalid.password);
    await expect(loginPage.errorMessage).toBeVisible();

})

test ('empty fields show wrror', async ({page}) => {
    
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toBeVisible();

})