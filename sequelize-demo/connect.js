const {Sequelize, DataTypes, Op, QueryTypes} = require("sequelize");
const dbConfig = require("./config");

const sequelize = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
        query: {
            raw: true
        }
    }
);

sequelize.sync();

const profsModel = require('./models/profsModel')(sequelize, DataTypes);
const messagesModel = require('./models/messagesModel')(sequelize, DataTypes);

module.exports = {
    db: sequelize,
    profsModel: profsModel,
    messagesModel: messagesModel,
}