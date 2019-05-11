module.exports = function(sequelize, DataTypes) {
    var schedule = sequelize.define("schedule", {
      plant: {
        type: DataTypes.STRING,
        allowNull: false
      },
      maturity_timeline: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
    schedule.associate = function(models) {
      // We're saying that a schedule post should belong to a user
      // A schedule post can't be created without a user due to the foreign key constraint
      schedule.belongsTo(models.user, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return schedule;
  };