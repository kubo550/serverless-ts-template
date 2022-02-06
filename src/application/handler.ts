import serverless from "serverless-http";
import express, { Response } from "express";
import moment from "moment";
import axios from "axios";
import type { User } from "../domain/User";

export const helloRouter = express();

helloRouter.use(express.json());

helloRouter.post("/time", (req, res) => {
  const { startDate, format, unit, amount } = req.body;

  const date = moment(startDate, format).add(amount, unit).format(format);

  return res.json({ date });
});

helloRouter.get("/random-user", async (_req, res: Response<{}>) => {
  try {
    const { data } = await axios.get("https://randomuser.me/api/");

    return res.json(data.results[0] as User);
  } catch (error) {
    console.log((error as Error).message);

    return res.status(200).json({
      error: (error as Error).message,
    });
  }
});

helloRouter.get("/health", (_req, res) => {
  return res.sendStatus(200);
});

module.exports.handler = serverless(helloRouter);
