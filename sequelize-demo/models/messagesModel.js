module.exports = (sequelize, DataTypes) => {
    return sequelize.define('messages', {
        content: {
            type: DataTypes.STRING,
        }
    })
}