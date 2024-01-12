import { describe } from "node:test";
import { app } from "../server";
import request from "supertest";

describe('Test',()=>{
    test('should first', async() => { 
        const rta = await request(app).get('/api/').expect(200);
        console.log(rta)
     })
})