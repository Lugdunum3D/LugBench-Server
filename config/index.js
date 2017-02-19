module.exports = {
    server: {
        port: 5000
    },
    db: {
        uri_prod: process.env.PROD_MONGODB,
        uri_dev: process.env.DEV_MONGODB
    }
};
