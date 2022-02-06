import supertest from "supertest";
import { helloRouter } from "../application/handler";
import { TimeRouter } from "../domain/types";

describe("hello world testing", () => {
  it("should return 200", async () => {
    const response = await healthCheck();

    expect(response.status).toEqual(200);
  });
});

const healthCheck = () => supertest(helloRouter).get("/health");
