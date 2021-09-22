# Shopify Technical Challenge

This is my submission for the Shopify Technical Challenge.

# Description

The image repo supports adding images (one by one or in bulk). There is a 2 mb size limit for uploading images. 

The frontend was built with React and the backend was built with Nodejs and REST APIs. 

# Running the application

To run the image repo locally:
1. First clone the repository:

```git clone https://github.com/betty-guo/imagerepo.git```

2. Starting the server:
```bash
$ cd server
$ npm install
$ node server.js
```
This starts the server on localhost:8080

3. Then start the client:
```bash
$ cd ../client # assuming you're currently in the server folder
$ npm install
$ npm start
```

The application should now be running on localhost:8081

# Testing

Start the application by following the above steps.
Then going into the client folder and run npm run test.

```bash
$ cd client
$ npm run test
```