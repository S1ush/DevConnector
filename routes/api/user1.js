// const express = require('express');
// const router = express.Router()
// const { check, validationResult } = require('express-validator');
// const User = require('../../models/User')
// const gravatar = require('gravatar')

// router.post('', [
//     check('name', 'Please enter valid name ').not().isEmpty(),
//     check('email', 'Pleaser enter a valie Email address').isEmail(),
//     check()
// ], async (req, res) => {
//     const error = validationResult(req);
//     if (!error.isEmpty) {
//         return res.status(400).json({ error: error.array() })
//     }
//     try {

//         const { user, email, password } = req.body()
//         // check exiting user
//         const email = User.findOne({ email })
//         if (email.isEmail) {
//             res.status(400).send("Already User Exits")
//         }

//         const avatar = gravatar.url(
//             email, {

//             s: '200',
//             d: 'mm',
//             r: 'pg'
//         }
//         )
//         // gravatar 

//         // encrypt password


//     } catch (err) {
//         console.error(err.message)
//     }
//     res.send('user api ')
// })



// module.exports = router 