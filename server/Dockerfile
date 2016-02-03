FROM node

RUN mkdir /code
ADD . /code

WORKDIR /code
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
