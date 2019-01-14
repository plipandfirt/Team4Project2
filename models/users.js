/* eslint camelcase:0 */
module.exports = function(sequelize,DataTypes){
  return sequelize.define("user",{
    email:{
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isEmail: true
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull:true,
      validate:{
        len:[6],
        is: /^[a-z0-9!@#$%^&*-]+$/i
      }
    },
    username:{
      type: DataTypes.STRING,
    },
    google_id:{
      type:DataTypes.STRING,
    },
    first_name:{
      type: DataTypes.STRING,
      allowNull:true,
      validate:{
        len:[1],
        is: /^[a-z]+$/i
      }
    },
    last_name:{
      type:DataTypes.STRING,
      allowNull:true,
      validate:{
        len:[1],
        is:/^[a-z]+$/i
      }
    },
    image_url:{
      type: DataTypes.STRING,
      allowNull:true,
    }
  });
};