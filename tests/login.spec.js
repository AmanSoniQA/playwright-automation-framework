const {test, expect} = require("@playwright/test");

test ("successfully login", async ({page}) => {

    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');


})

test ("invalid login show error", async ({page}) => {
    await page.goto("https://www.saucedemo.com");
    await page.locator('#user-name').fill('wrong_user');
    await page.locator('#password').fill('wrong_password');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
})


test ("empty fields show error", async({page}) => {
    await page.goto("https://www.saucedemo.com");
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible()
})
