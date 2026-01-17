FROM node:22.12-alpine AS builder
WORKDIR /app

# Build-time envs (passed from Coolify/CI) so Vite can inline them
ARG VITE_SENTRY_DSN
ARG VITE_SENTRY_TRACES_SAMPLE_RATE
ARG VITE_SENTRY_REPLAYS_SESSION_RATE
ARG VITE_SENTRY_REPLAYS_ERROR_RATE
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN \
	VITE_SENTRY_TRACES_SAMPLE_RATE=$VITE_SENTRY_TRACES_SAMPLE_RATE \
	VITE_SENTRY_REPLAYS_SESSION_RATE=$VITE_SENTRY_REPLAYS_SESSION_RATE \
	VITE_SENTRY_REPLAYS_ERROR_RATE=$VITE_SENTRY_REPLAYS_ERROR_RATE

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM nginx:1.29.3-alpine
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]