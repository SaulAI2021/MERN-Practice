const userCtrl = {};
const UserModel  = require('../models/User')
userCtrl.getUsers = async (req,res)=> {
  const users = await UserModel.find()
  res.json(users)
};
userCtrl.createUser = async (req,res)=> {
  const {username} = req.body;
  const newUser = new UserModel({
    username : username
  });
  await newUser.save();
  res.json({message : 'POST Request'})
}
userCtrl.deleteUser =  async (req,res)=> {
  await UserModel.findByIdAndDelete(req.params.id);
  res.json({message : "User eliminado"});
};
module.exports = userCtrl;