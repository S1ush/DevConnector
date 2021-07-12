// const express = require('express');
// const router = express.Router;
// const {body,validationResult} = require('express-validator');
// const User = require('../../models/User')
// const gravatar = require('gravatar');
// const bcrpyt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('config');

// // @route   POSt api/user
// // @desc    Register
// // @access  public

// router.post('/',[
//  body('name','Enter name ').not().notEmpty()
// ], async (req,res) =>{
//     try{
//         const error = validationResult(req)
//         if(!error.isEmpty){
//             return res.send(400).json({error:error.array()});

//         }
//         const { name,email,password} = req.body
//         //  check user exist 
//         const user = await User.findOne({email})
//         if (user){
//             res.send(400).json ([error:'user already exists '])
//         }
//         // object to user
//         let user = new User({
//             name,
//             email,
//             password,
//             avatar 
//         }) 



//         //  gravatar 
//         const avatar = gravatar.url(email, )

//         //  encrpy 
//         const salt = bcrpyt.genSalt(10)
//         user.password = await bcrpyt.hash(user.password,salt)
//         //  jwt 
//         let payload = {
//             id : user.id
//         }

//         jwt.sign(payload,config.get('jwtSecret'),{
//             expiresIn: 36000
//         }(err, Token)=>{
//             if (err) throw: err
//             res.json({token})

//         })
        

//     }catch(err){
//         console.log(err.message);
//     }
// })




// module.exports = 