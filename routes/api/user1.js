const express = require('express');
const router = express.Router()
const { check, validationResult } = require('express-validator');

router.post('', [
    check('name', 'Please enter valid name ').not().isEmpty(),
    check('email', 'Pleaser enter a valie Email address').isEmail(),
    check()
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty) {
        return res.status(400).json({ error: error.array() })
    }
    res.send('user api ')
})



module.exports = router 