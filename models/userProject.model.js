module.exports = (sequelize, DataTypes) => {
  var UserProject = sequelize.define('UserProject', {
   
  });

  UserProject.associate = function(models){
    models.UserProject.belongsTo(models.User,{
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
    models.UserProject.belongsTo(models.Project,{
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
  };


  return UserProject;
};