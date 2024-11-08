import { handler } from './src/lambda.ts';
import helloEvent from './events/hello.json' with { type: 'json' };
import { LambdaEvent } from "@hono/hono/aws-lambda";

const corsResult = await handler(helloEvent as unknown as LambdaEvent);
console.log(corsResult);
