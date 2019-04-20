/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('author', {
    id: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'author'
  });
};
