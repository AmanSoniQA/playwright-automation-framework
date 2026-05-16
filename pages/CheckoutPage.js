class CheckoutPage {
    constructor (page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.zipCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.confirmationMessage = page.locator('.complete-header');
        this.finishButton = page.locator('[data-test="finish"]')

    }

    async fillingShipingDetails (firstName, lastName,zipCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
        await this.continueButton.click();
    }

    async finishCheckout () {
        await this.finishButton.click();
    }
}

module.exports = { CheckoutPage };