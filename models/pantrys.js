module.exports = function (sequelize,DataTypes) {
  const Pantry = sequelize.define("pantry",{
    ingredient:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1],
        is: /^[a-z\s]+$/i
      },
    },
    quantity:{
      type:DataTypes.INTEGER,
      allowNull:true,
      validate:{
        min:0
      }
    },
  },{freezeTableName:true});

  Pantry.associate = function(models){
    Pantry.belongsTo(models.user,{
      foreignKey:{
        allowNull:true
      }
    });
  };

  return Pantry;
};