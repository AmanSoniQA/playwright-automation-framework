const { test, expect } = require('./fixtures');

test ('add item to cart', async({loginPage, cartPage, page }) => {

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL('/cart.html');
    await expect(cartPage.cartItem).toBeVisible();

})

test('remove item from cart', async ({ loginPage, cartPage, page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await cartPage.removeItem();
    await expect(cartPage.cartItem).not.toBeVisible();
});