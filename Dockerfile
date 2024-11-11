# Install dependencies
FROM denoland/deno:alpine-2.0.5 AS deps

WORKDIR /opt/app

COPY deno.json deno.lock ./
RUN deno install --lock
COPY ./ ./


# Build
FROM deps AS build
RUN deno task compile


# Production
FROM gcr.io/distroless/cc AS production

WORKDIR /var/task

EXPOSE 8080
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter
COPY --from=build /opt/app/dist/app ./

CMD ["/var/task/app"]
