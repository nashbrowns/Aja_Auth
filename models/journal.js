module.exports = function(sequelize, DataTypes) {
    var journal = sequelize.define("journal", {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
    journal.associate = function(models) {
      // We're saying that a journal post should belong to a user
      // A journal post can't be created without a user due to the foreign key constraint
      journal.belongsTo(models.user, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return journal;
  };