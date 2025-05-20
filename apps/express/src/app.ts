import { getHealthcheckHandler } from "@/src/handlers/healthcheck/get-healthcheck-handler.js";
import { getSomeDataHandler } from "@/src/handlers/some-data/get-some-data-handler.js";
import { putSomeDataHandler } from "@/src/handlers/some-data/put-some-data-handler.js";
import cors from "cors";
import express from "express";
import { z } from "zod/v4";

const app = express();

app.use(cors());

app.get("/api/healthcheck", getHealthcheckHandler);
app.get("/api/some-data", getSomeDataHandler);
app.put("/api/some-data", putSomeDataHandler);

const port = z.string().min(1).parse(process.env.PORT);

app.listen(port, () => {
  // biome-ignore lint/suspicious/noConsole: required for server logging
  console.log(`Example app listening on port ${port}`);
});
