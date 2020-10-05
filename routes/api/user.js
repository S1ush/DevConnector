const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar')
const User = require("../../models/User")
const bcrypt = require('bcryptjs')

// @route   POSt api/user
// @desc    Register 
// @access  public
router.post('/', [
    check('name', 'Please Enter a name ').not().isEmpty(),
    check('email', 'Enter a valid email ').isEmail(),
    check('password', 'Enter a password of length 6 ').isLength({ min: 6 })


], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { email, name, password } = req.body;
    try {
        // if the user already exists 
        let email = await User.findOne({ email });
        if (email) {
            res.status(500).send("User already exist")
        }

        // gravatar
        const avatar = gravatar.url(
            email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        }
        )

        user = new User({
            name,
            email,
            avatar,
            password
        })

        // Encrpt 



    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }

    console.log(req.body)
    res.send("user api")
})
module.exports = router;