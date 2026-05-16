const { test,expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { CartPage } = require('../pages/CartPage');

let cartPage;

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
})

test.afterEach(async ({page}, testInfo) => {
    if (testInfo.status !== 'passed') {
        await page.screenshot({
            path: 'screenshots/${testInfo.title}.png'
        })

    }
})

test ('add item to cart', async ({page}) => {
   
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(cartPage.cartItem).toBeVisible();

})

test ('remove item from cart', async ({page}) => {
    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await cartPage.removeItem();
    await expect(cartPage.cartItem).not.toBeVisible();
});