/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('list', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    headImg: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'list'
  });
};
