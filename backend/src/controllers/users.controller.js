const usrCtrl = {};

usrCtrl.getUser = (req,res)=> res.json({message : [] });
usrCtrl.createUser = (req,res)=> res.json({message : 'POST Request'});
usrCtrl.deleteUser =  (req,res)=> res.json({title : 'Update'});

module.exports = usrCtrl;