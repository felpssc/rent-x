import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/express/app";

import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

describe("CreateCategoryController", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuidV4();
    const passwordHash = await hash("admin", 8);

    const user = await connection.getRepository("users").create({
      id,
      name: "Admin",
      email: "admin@email.com",
      driver_license: "ABC123XYZ",
      password: passwordHash,
      isAdmin: true,
      created_at: new Date(),
    });

    await connection.getRepository("users").save(user);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post("/api/sessions").send({
      email: "admin@email.com",
      password: "admin",
    });

    const response = await request(app)
      .post("/api/categories")
      .send({
        name: "teste",
        description: "teste",
      })
      .set("Authorization", `Bearer ${responseToken.body.refresh_token}`);

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a category with existent name", async () => {
    const responseToken = await request(app).post("/api/sessions").send({
      email: "admin@email.com",
      password: "admin",
    });

    await request(app)
      .post("/api/categories")
      .send({
        name: "teste",
        description: "teste",
      })
      .set("Authorization", `Bearer ${responseToken.body.refresh_token}`);

    const response = await request(app)
      .post("/api/categories")
      .send({
        name: "teste",
        description: "teste",
      })
      .set("Authorization", `Bearer ${responseToken.body.refresh_token}`);

    expect(response.status).toBe(400);
  });

  it("Should be able to list categories", async () => {
    const responseToken = await request(app).post("/api/sessions").send({
      email: "admin@email.com",
      password: "admin",
    });

    await request(app)
      .post("/api/categories")
      .send({
        name: "teste",
        description: "teste",
      })
      .set("Authorization", `Bearer ${responseToken.body.refresh_token}`);

    await request(app)
      .post("/api/categories")
      .send({
        name: "teste2",
        description: "teste2",
      })
      .set("Authorization", `Bearer ${responseToken.body.refresh_token}`);

    const response = await request(app)
      .get("/api/categories")
      .set("Authorization", `Bearer ${responseToken.body.refresh_token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe("teste");
    expect(response.body[1].name).toBe("teste2");
  });
});
