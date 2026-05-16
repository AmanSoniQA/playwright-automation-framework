const { test, expect} = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

let checkoutPage;
let cartPage;

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

})



test ('complete checkout flow', async({page}) => {

   

    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await cartPage.clickCheckout();
    await checkoutPage.fillingShipingDetails('Aman', 'Soni', '462042');
    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
})