import { z } from "zod/v4";
import { app } from "@/src/app.ts";

const port = z.string().min(1).parse(process.env.PORT);

app.listen(port, () => {
  // biome-ignore lint/suspicious/noConsole: required for server logging
  console.log(`Example app listening on port ${port}`);
});
