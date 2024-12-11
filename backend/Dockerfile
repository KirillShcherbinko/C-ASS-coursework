FROM node:18

COPY package.json package.json
RUN npm install

COPY . .

CMD ["npm", "start"]