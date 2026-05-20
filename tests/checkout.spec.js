const {test, expect} = require('./fixtures');
const {users} = require('../data/users');
const {checkoutData} = require('../data/checkoutData');
const { LoginPage } = require('../pages/LoginPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('complete checkout flow', async({loginPage, cartPage, checkoutPage, page}) =>{
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await cartPage.clickCheckout();
    await checkoutPage.fillingShipingDetails(
        checkoutData.valid.firstName,
        checkoutData.valid.lastName,
        checkoutData.valid.zipCode
    );
    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL('/checkout-complete.html');
    await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
});

 

