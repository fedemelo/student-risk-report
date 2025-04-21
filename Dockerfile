FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

# Build and export static site
COPY . .
RUN yarn build
# Expose default Next.js port
EXPOSE 3000

# Run Next.js server
CMD ["yarn", "start"]
