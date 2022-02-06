import supertest from "supertest";
import { helloRouter } from "../application/handler";
import { TimeRouter } from "../domain/types";

describe("add to date", () => {
  it("should add time to given date", async () => {
    const startDate = "2020-01-01";
    const format = "YYYY-MM-DD";
    const unit = "days";
    const amount = 1;

    const response = await addTime({ startDate, format, unit, amount });

    expect(response.body.date).toEqual("2020-01-02");
  });

  it("should add time to given date", async () => {
    const startDate = "2020-01-01";
    const format = "YYYY-MM-DD";
    const unit = "days";
    const amount = 30;

    const response = await addTime({ startDate, format, unit, amount });

    expect(response.body.date).toEqual("2020-01-31");
  });
});

const addTime = ({ startDate, format, unit, amount }: TimeRouter) =>
  supertest(helloRouter)
    .post("/time")
    .send({ startDate, format, unit, amount })
    .expect(200);
