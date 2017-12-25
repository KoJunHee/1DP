var config = {
    name: 'API',
    server: {
        host: '0.0.0.0',
        port: 8000,
        labels: ['api'],
        routes: {
            cors: { credentials: 'true' }
        }
    },
    database: {
        mongo:
        {
            host: 'ds249605.mlab.com',
            username: 'junhee.ko',
            password: 'qq1212qq1212!',
            port: '49605',
            database: '1dp'
        }
    }
};


module.exports = config;