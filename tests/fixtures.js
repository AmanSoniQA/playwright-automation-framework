const { test:base } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage.js');
const { CartPage } = require('../pages/CartPage.js');
const { CheckoutPage } = require('../pages/CheckoutPage.js');
const { users } = require('../data/users');

exports.test = base.extend({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await use(loginPage)
    },

    cartPage : async({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutPage: async({page}, use) => {
        const chekoutPage = new CheckoutPage(page);
        await use(chekoutPage);
    }
})

exports.expect = require('@playwright/test').expect;