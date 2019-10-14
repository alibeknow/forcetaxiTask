module.exports = (sequelize, DataTypes) => {
  var UserProject = sequelize.define('UserProject', {
   
  });

  UserProject.associate = function(models){
    models.User.belongsToMany(models.Project, { through: UserProject });
    models.Project.belongsToMany(models.User, { through: UserProject });
  };


  return UserProject;
};