/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sasa', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    seasoss: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'sasa'
  });
};
