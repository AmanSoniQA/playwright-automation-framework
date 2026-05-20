const { test, expect, request } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const BASE_API_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Hybrid API + UI Validation', () => {

    test('API creates post and validates response', async ({ request, page }) => {
        const newPost = {
            title: 'Hybrid Test Post',
            body: 'Testing API and UI together',
            userId: 1
        };

        const apiResponse = await request.post(`${BASE_API_URL}/posts`, {
            data: newPost
        });

        const apiBody = await apiResponse.json();

        expect(apiResponse.status()).toBe(201);
        expect(apiBody.title).toBe(newPost.title);
        expect(apiBody.userId).toBe(newPost.userId);
        expect(apiBody.id).toBeTruthy();

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(
            process.env.USERNAME,
            process.env.PASSWORD
        );
        await expect(page).toHaveURL('/inventory.html');

        console.log(`✅ API created post with ID: ${apiBody.id}`);
        console.log(`✅ UI login verified successfully`);
    });

    test('GET user data and validate in UI', async ({ request, page }) => {
        const apiResponse = await request.get(`${BASE_API_URL}/users/1`);
        const userData = await apiResponse.json();

        expect(apiResponse.status()).toBe(200);
        expect(userData.id).toBe(1);
        expect(userData.email).toBeTruthy();

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(
            process.env.USERNAME,
            process.env.PASSWORD
        );
        await expect(page).toHaveURL('/inventory.html');

        console.log(`✅ API user email: ${userData.email}`);
        console.log(`✅ UI environment validated`);
    });
});