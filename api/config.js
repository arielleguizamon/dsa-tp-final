module.exports = {
  mongodb: {
    server: 'mongodb://localhost:27017/base',
    port: 27017
  },
  front: {
    url: 'http://localhost:3001'
  },
  api: {
    name: 'base-admin',
    port: 3000
  },
  whitelistedDomains: ['http://localhost', 'http://192.168.0.5']
};
