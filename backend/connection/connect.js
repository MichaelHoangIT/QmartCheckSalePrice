var conn = function() {
    var conn = {
        server: 'NHATNC-LAP\\SQLEXPRESS',
        database: 'qmart',
        driver: "msnodesqlv8",
        options: {
            trustedConnection: true
        }
    };

    return conn;
};

module.exports = conn;