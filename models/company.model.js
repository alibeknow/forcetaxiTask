module.exports= (sequelize,DataTypes)=>
{
const Company = sequelize.define("Company", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Company.associate = function(models) {
    models.Company.hasMany(models.Department);
  };
  Company.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
};

  return Company
}