const { User,Company,Project,Department,UserProject }          = require('../models');
const authService       = require('../services/auth.service');
const { to, ReE, ReS }  = require('../services/util.service');

const create = async function(req, res){
    const body = req.body;
    console.log(req.body);
    if(!body.unique_key && !body.email && !body.phone){
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()}, 201);
    }
}
module.exports.create = create;

const get = async function(req, res){
let user=req.body;

    let result=await User.findOne({ where: user });
    console.log('RESULT+========================================================',result);
    if (result)
    {return  ReS(res,{message:"okey",user:user.dataValues},200);}

    return ReS(res, {"message":"doesn't have AnyUser"});
}
module.exports.get = get;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if(err){
        if(err.message=='Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, {message :'Updated User: '+user.email});
}
module.exports.update = update;

const remove = async function(req, res){
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if(err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, {message:'Deleted User'}, 204);
}
module.exports.remove = remove;


const login = async function(req, res){
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {token:user.getJWT(), user:user.toWeb()});
}
module.exports.login = login;


const insertData = async function(req, res){
    console.log("insert Company");
    let company=await  Company.create({name:"ScreamAimFire"});
  console.log ("insert department");
   let dep=await Department.create({name:"Web Development",CompanyId:company.dataValues.id});
   console.log ("insert user");
   let user=await User.create({first:"ALibek",last:"Nauryzbayev",email:"alibek.amazing@gmail.com",phone:"+777709999431",password:"123456",DepartmentId:dep.dataValues.id});
  console.log("insert Project");
  let projects=[];
  projects[0]=await Project.create({name:"Project SampleTask"});
  projects[1]=await Project.create({name:"Project SampleTask#2"});
  projects[2]=await Project.create({name:"Project SampleTask#3"});
  let projectUsers=[];
  let i=0;
    projects.map((project)=>{
        ++i;
        projectUsers[0]=UserProject.create({ProjectId:project.dataValues.id,UserId:user.dataValues.id});

    })



return ReS(res,{message:"we DO THAT"});
}
module.exports.insertData = insertData;