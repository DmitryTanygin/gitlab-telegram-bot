FROM node:16-alpine

WORKDIR /gitlab-telegram-bot

COPY package*.json ./

RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --omit=dev

# копируем исходный код
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start" ]