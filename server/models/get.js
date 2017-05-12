/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('get', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'get'
  });
};
