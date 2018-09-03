module.exports = {
  mongodb: {
    server: 'mongodb://localhost:27017/dsa',
    port: 27017
  },
  front: {
    url: 'http://localhost:3001'
  },
  api: {
    name: 'dsa',
    port: 3000,
    host: 'http://192.168.0.25:3000'
  },
  whitelistedDomains: ['http://localhost:3000', 'http://192.168.0.28'],
  mailOptions : {
    auth: {
      api_user: 'aleguizamon',
      api_key: 'dsatpfinal6'
    }
  }
};
