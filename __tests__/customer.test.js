const request = require("supertest");
const app = require("../app");
const { User, Movie, Genre } = require("../models");

//Register Customer
describe("POST /pub/register", () => {
  test("POST /pub/register - success test", () => {
    const payload = {
      username: "Giovanni",
      email: "gio2@gmail.com",
      password: "12345",
      phoneNumber: "43563456",
      address: "bandung",
    };
    return request(app)
      .post("/pub/register")
      .send(payload)
      .then((result) => {
        expect(result.status).toBe(201);
        expect(result.body).toBeInstanceOf(Object);
        expect(result.body).toHaveProperty("id");
        expect(result.body).toHaveProperty("email", expect.any(String));
        expect(result.body).toHaveProperty("email", payload.email);
      })
      .catch((err) => {});
  });
});

describe(`POST /pub/register`, () => {
  test(`POST /pub/register - error test`, () => {
    let payload = {
      username: "Giovanni",
      password: "12345",
    };
    return request(app)
      .post("/pub/register")
      .send(payload)
      .then((result) => {
        expect(result.status).toBe(400);
        expect(result.body).toBeInstanceOf(Object);
        expect(result.body).toHaveProperty("message", expect.any(Array));
        expect(result.body.message[0]).toContain("Email is required !");
      });
  });
});

//login customer succes
describe("POST /pub/login", () => {
  test("POST /pub/login - success test", () => {
    const payload = {
      email: "gio2@gmail.com",
      password: "12345",
    };
    return request(app)
      .post("/pub/login")
      .send(payload)
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
        expect(result.body).toHaveProperty("access_token", expect.any(String));
        expect(result.body).toHaveProperty("user");
        expect(result.body).toBeInstanceOf(Object);
        expect(result.body).toHaveProperty("id", expect.any(Number));
        expect(result.body).toHaveProperty("username", expect.any(String));
        expect(result.body).toHaveProperty("email", expect.any(String));
        expect(result.body).toHaveProperty("email", payload.email);
        expect(result.body).toHaveProperty("password", expect.any(String));
        expect(result.body).toHaveProperty("role", expect.any(String));
        expect(result.body).toHaveProperty("phoneNumber", expect.any(String));
        expect(result.body).toHaveProperty("address", expect.any(String));
      })
      .catch((err) => {});
  });
});

//login customer wrong password
describe(`POST /pub/login`, () => {
  test(`POST /pub/login - error test`, async () => {
    let payload = {
      email: "gio2@gmail.com",
      password: "wrong",
    };
    const result = await request(app).post(`/pub/login`).send(payload);
    expect(result.status).toBe(401);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "invalid email or password");
  });
});

//login customer wrong email
describe(`POST /pub/login`, () => {
  test(`POST /pub/login - error test`, async () => {
    let payload = {
      email: "gio233@gmail.com",
      password: "12345",
    };
    const result = await request(app).post(`/pub/login`).send(payload);
    expect(result.status).toBe(401);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("message", expect.any(String));
    expect(result.body).toHaveProperty("message", "invalid email or password");
  });
});

//get movies
describe(`GET /pub/movies`, () => {
  test(`GET /pub/movies - success test`, async () => {
    const result = await request(app).get("/pub/movies");
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("count", expect.any(Number));
    expect(result.body).toHaveProperty("rows", expect.any(Array));
    expect(result.body.rows).toBeInstanceOf(Array);
    expect(result.body.rows[0]).toBeInstanceOf(Object);
    expect(result.body.rows[0]).toHaveProperty("id", expect.any(Number));
    expect(result.body.rows[0]).toHaveProperty("title", expect.any(String));
    expect(result.body.rows[0]).toHaveProperty("synopsis", expect.any(String));
    expect(result.body.rows[0]).toHaveProperty(
      "trailerUrl",
      expect.any(String)
    );
    expect(result.body.rows[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(result.body.rows[0]).toHaveProperty("rating", expect.any(Number));
    expect(result.body.rows[0]).toHaveProperty("status", expect.any(String));
    expect(result.body.rows[0]).toHaveProperty("genreId", expect.any(Number));
    expect(result.body.rows[0]).toHaveProperty("authorId", expect.any(Number));
  });
});
