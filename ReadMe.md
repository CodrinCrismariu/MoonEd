# MoonEd
MoonEd is an open source electronic grade book 

### Features
- Normal e grade book features
- Direct messages
- Statistics for grades

### Development
MoonEd requires [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) to run. 

Clone the git repository
```sh
git clone https://github.com/CodrinCrismariu/MoonEd.git
```
Install the dependecies
```sh
cd Back-end
npm install
cd ..
cd Front-End
npm install
cd ..
```
If u are using this for production u can also do
```sh
cd Back-end 
npm install --production
cd ..
cd Front-End 
npm install --production
cd ..
```
To run in development mode u can run ```npm run``` in the Back-End and Front-End folder 
To run in production mode u only need to run the backend server with ```node index.js```

Also you need to change all the ip-s and ports from Back-End/variable.js and Front-End/Variable.js
so that they meet your requirements

In the MongoDB server you need to create a database named MoonEd and the app will do the rest

### Tech
- [Node.js](https://nodejs.org/en/) evented I/O for the backend
- [Express](http://expressjs.com/) fast node.js network app framework
- [ReactNative](https://reactnative.dev/) for cross-platform front-end
- [Socket.io](https://socket.io/) for real-time, bidirectional and event-based communication
- [Mongoose](https://mongoosejs.com/) elegant mongodb object modeling for node.js
- [Axios](https://axios-http.com/docs/intro) Promise based HTTP client for the browser and node.js
- [Expo](https://expo.dev/) to develop react-native apps on phones
