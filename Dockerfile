# Install dependencies
FROM denoland/deno:alpine-2.2.2 AS deps

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
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.0 /lambda-adapter /opt/extensions/lambda-adapter
COPY --from=build /opt/app/dist/app ./

CMD ["/var/task/app"]
