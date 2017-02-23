module.exports = {
    server: {
        port: process.env.PORT || 5000
    },
    db: {
        uri_mongodb: process.env.URI_MONGODB,
    }
};
