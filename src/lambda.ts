
import { Hono } from "@hono/hono";
import { handle } from '@hono/hono/aws-lambda';
import { bootstrap } from './bootstrap.ts';
import { HonoAdapter } from "@uki00a/nestjs-platform-hono";

const hono = new Hono();
const adapter = HonoAdapter.create(hono);
const app = await bootstrap(adapter);
await app.init();

export const handler = handle(hono);
