FROM node:latest

# Create the bot's directory
RUN mkdir -p /bot
WORKDIR /bot

COPY . /bot
RUN npm install
# COPY src/config.ts.template /bot/src/config.ts
RUN npx tsc --build

# Start the bot.
ENTRYPOINT ["node", "./lib/index.js"]