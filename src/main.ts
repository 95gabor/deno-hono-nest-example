import { HonoAdapter } from "@uki00a/nestjs-platform-hono";
import { bootstrap } from './bootstrap.ts';
import { Hono } from "@hono/hono";

async function boot() {
  const hono = new Hono();
  const adapter = HonoAdapter.create(hono);
  const app = await bootstrap(adapter);
  app.listen(3000);
}
boot();
