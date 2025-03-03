import { HonoAdapter } from "@uki00a/nestjs-platform-hono";
import { bootstrap } from "./bootstrap.ts";
import { Hono } from "@hono/hono";
import { Logger } from "@nestjs/common";

async function boot() {
  const hono = new Hono();
  const adapter = HonoAdapter.create(hono);
  const app = await bootstrap(adapter);

  const port = 8080;
  await app.listen(port);
  Logger.log(`Listening on http://localhost:${port}`);
}

boot();
