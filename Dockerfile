FROM denoland/deno:alpine-2.0.5 AS build

WORKDIR /opt/app

COPY deno.json deno.lock ./
RUN deno install
COPY ./ ./
RUN deno task compile


FROM gcr.io/distroless/cc AS production

WORKDIR /opt/app

COPY --from=build /opt/app/dist/app ./dist/app

EXPOSE 3000
ENTRYPOINT ["/opt/app/dist/app"]
