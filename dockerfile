FROM node:bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# This will override the .env port variable. Keep this in mind when setting up an image.
ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]
