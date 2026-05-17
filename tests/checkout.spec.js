const { test, expect} = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { users } = require('../data/users');
const { checkoutData } = require('../data/checkoutData');

let checkoutPage;
let cartPage;

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

})



test ('complete checkout flow', async({page}) => {

   

    
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await cartPage.clickCheckout();
    await checkoutPage.fillingShipingDetails(checkoutData.valid.firstName, checkoutData.valid.lastName, checkoutData.valid.zipCode);
    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL('/checkout-complete.html');
    await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
})