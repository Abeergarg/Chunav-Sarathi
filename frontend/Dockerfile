# Use the official Node.js image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Ensure .env is present for the build
ENV NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCeQsYF8IR_6k3ktGk7Gr7Oazo4RVbrjlk
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=chunav-sarathi-faad6.firebaseapp.com
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=chunav-sarathi-faad6
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=chunav-sarathi-faad6.firebasestorage.app
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=333450102099
ENV NEXT_PUBLIC_FIREBASE_APP_ID=1:333450102099:web:8adc1c2017054ceee94da6
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-LEBPNN6QQV
ENV GEMINI_API_KEY=AIzaSyA8B7_C6D5E4F3G2H1I0J9K8L7M6N5O4P
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyB_ffHWEP5s4IuuDT95Hb3p7Xc4mX3QDFQ

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
