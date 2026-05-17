const {test, expect, request} = require('@playwright/test');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('User API', () => {

    test('GET all users returns 200', async({request}) => {
        const response = await request.get(`${BASE_URL}/users`);
            expect(response.status()).toBe(200);

    })

    test('GET single user returns correct data', async({request}) => {
        const response = await request.get(`${BASE_URL}/users/1`);
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.id).toBe(1);
        expect(body.email).toBeTruthy();
    })

    test('POST creates new user', async({request}) => {
        const response = await request.post(`${BASE_URL}/posts`, {
            data: {
                title: 'Test Post',
                body: 'This is a test',
                userId: 1
            }
        });
        const body = await response.json();
        expect(response.status()).toBe(201);
        expect(body.id).toBeTruthy();
        expect(body.title).toBe('Test Post')
    })

    test('GET non-existent user returns 404', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/users/999`);
        expect(response.status()).toBe(404);
    });
    
    test('GET users returns array with 10 users', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/users`);
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBe(10);
    });
})