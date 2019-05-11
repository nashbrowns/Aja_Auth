/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
    var rpiData = sequelize.define("rpi", {
      light: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      temp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      mac_address: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });

    rpiData.associate = function(models) {
        // We're saying that rpi data should belong to a user
        rpiData.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return rpiData;
  }
  