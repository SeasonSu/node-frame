/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pets', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    birth: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'pets'
  });
};
