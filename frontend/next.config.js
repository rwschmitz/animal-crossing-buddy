module.exports = {
  env: {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    USER_NAME: process.env.USER_NAME,
    USER_PASS: process.env.USER_PASS,
    DB_PATH: process.env.DB_PATH,
  },
  target: 'serverless',
};
