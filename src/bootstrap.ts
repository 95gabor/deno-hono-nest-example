import {
  AbstractHttpAdapter,
  NestFactory,
  HttpAdapterHost,
} from '@nestjs/core';
import { AppModule } from './app.module.ts';
import { AllExceptionsFilter } from './all-exception.filter.ts';
import { INestApplication } from '@nestjs/common';

export async function bootstrap(
  adapter: AbstractHttpAdapter,
): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, adapter);
  const adapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));

  return app;
}
