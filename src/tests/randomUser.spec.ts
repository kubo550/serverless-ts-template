import supertest from "supertest";
import { helloRouter } from "../application/handler";
import nock from "nock";
import { User } from "../domain/User";

describe("random-user", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    expect(nock.pendingMocks()).toHaveLength(0);
    expect(nock.isDone()).toBeTruthy();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const fakeUser: Partial<User> = {
    gender: "male",
    name: {
      title: "Mr",
      first: "Ryder",
      last: "Ma",
    },
    location: {
      street: {
        number: 7440,
        name: "Concession Road 6",
      },
      city: "Cumberland",
      state: "Alberta",
      country: "Canada",
      postcode: "E8J 2X4",
      coordinates: {
        latitude: "-60.9257",
        longitude: "-36.1882",
      },
      timezone: {
        offset: "-2:00",
        description: "Mid-Atlantic",
      },
    },
    email: "ryder.ma@example.com",
  };

  it("should return json", async () => {
    nock("https://randomuser.me/api")
      .get("/")
      .reply(200, { results: [fakeUser] });

    const response = await randomUser();

    expect(response.statusCode).toEqual(200);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("location");

    expect(response.body.name).toHaveProperty("first");
    expect(response.body.name).toHaveProperty("last");

    expect(response.body.location).toHaveProperty("street");
    expect(response.body.location).toHaveProperty("city");
  });

  it("should handle error during fetching user", async () => {
    nock("https://randomuser.me/api").get("/").replyWithError("Error");

    const response = await randomUser();

    expect(response.statusCode).toEqual(200);

    expect(response.body).toHaveProperty("error");
  });
});

const randomUser = () => supertest(helloRouter).get("/random-user").expect(200);
