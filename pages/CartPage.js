class CartPage {
    constructor(page) {
        this.page = page;
        this.cartIcon = page.locator('.shopping_cart_link');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.cartItem = page.locator('.cart_item');
    }

    async goto () {
        await this.page.goto('https://www.saucedemo.com/cart.html');
    }

    async clickCheckout () {
        await this.checkoutButton.click();
    }

    async removeItem () {
        await this.removeButton.click();
    }

   
}

module.exports = { CartPage };
