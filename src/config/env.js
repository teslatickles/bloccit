const env = {
    database: 'd5sel9598j3nbk',
    username: 'vlpjwsnjdondlb',
    password: '7d8cdd09ff1f5f847bc00af26ed0a2098fe2c737fc93dbc767952281a77e953f',
    host: 'ec2-54-243-128-95.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;