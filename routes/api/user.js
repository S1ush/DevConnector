const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route   POSt api/user
// @desc    Register 
// @access  public
router.post('/', [
    check('name', 'Please Enter a name ').not().isEmpty(),
    check('email', 'Enter a valid email ').isEmail(),
    check('password', 'Enter a password of length 6 ').isLength({ min: 6 })


], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    console.log(req.body)
    res.send("user api")
})
module.exports = router;