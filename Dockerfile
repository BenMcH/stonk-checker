FROM hayd/deno:alpine-1.7.2

WORKDIR /app
ADD index.js /app

CMD deno run --allow-net index.js
