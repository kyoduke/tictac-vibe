FROM node:22-alpine AS builder

RUN addgroup -S -g 1001 appgroup && \
    adduser -S -G appgroup -u 1001 duser -D

WORKDIR /app

COPY . ./

RUN chown -R duser:appgroup .

USER duser

RUN npm install
RUN npm run build

FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
