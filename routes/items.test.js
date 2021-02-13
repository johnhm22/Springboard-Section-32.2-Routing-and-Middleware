const request = require("supertest");

const app = require('../app');
let items = require('../fakeDb');

process.env.NODE_ENV = "test";

let avocado = {
    name: 'avocados',
    price: '75'
}

beforeEach(function() {
    items.push(avocado)
});

afterEach(function(){
    items.length = 0;
})

describe("Get /item", () => {
    test("get all items", async () => {
        const res = await request(app).get('/item');
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({items: [avocado]})
    })
});


describe("Post /item", () => {
    test("post an item", async () => {
        const res = await request(app).post('/item').send({name: "muesli", price: 2.50});
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({item: {name: "muesli", price: 2.50}})
    })
    test("post a duplicate item", async () => {
        const res = await request(app).post('/item').send({name: "avocados", price: 75});
        expect(res.statusCode).toBe(400)
    })
    test("post an item with missing data", async () => {
        const res = await request(app).post('/item').send({});
        expect(res.statusCode).toBe(400)
})
});


describe("Get /item/:name", () => {
    test("get a specific item", async () => {
        const res = await request(app).get(`/item/${avocado.name}`);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({item: {"name": "avocados", "price": "75"}})
    })
    test("get an invalid item", async () => {
        const res = await request(app).get('/item/cheese');
        expect(res.statusCode).toBe(404)
    })
});



describe("Patch /item", () => {
    test("Updating the name of an item", async() =>{
        const res = await request(app).patch(`/item/${avocado.name}`).send({name: 'broccoli'});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: {"name": 'broccoli', "price": "75"}});
    })
});


describe("delete an item", ()=> {
    test("Delete an item", async() => {
        const res = await request(app).delete(`item/${avocado.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: 'Deleted'});
    })
    test("Delete an item that doesn't exist", async() => {
        const res = await request(app).delete(`item/spaghetti`);
        expect(res.statusCode).toBe(404);
    })
});


//tests to do 
// 1. Get all items - done
// 2. Get a single item
//      2.1 an item that exists - not OK
//      2.2 an item that doesn't exist - not OK
// 3. Delete an item
//      3.1 an item that exists - to test
//      3.2 an item that doesnt exist - to test
// 4. Add an item
//      4.1 A successful creation - not OK
//      4.2 A duplicate
//      4.3 An attempt with missing data