const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

const User = require('../models/user.models')
require('dotenv').config()


router.post('/register', (req, res) => {
    // Form Validation
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid) return res.status(400).json(errors);

    User.findOne({email : req.body.email})
    .then(user => {
        if(user) return res.status(400).json({ email : "Email already exists"})
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })

})

// Login User
router.post('/login', (req, res) => {
    
    // Check Validation
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) return res.status(400).json(errors);

    const { email , password } = req.body;

    User.findOne( { email })
        .then(user => {
            if(!user) return res.status(400).json({ emailnotfound : "Email not found"});

            bcrypt.compare(password, user.password)
                  .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name
                            };

                            jwt.sign(
                                payload,
                                process.env.secretOrKey,
                                {
                                    expiresIn: 31556926
                                },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    });
                                }
                            )
                        } else {
                            return res.status(400).json({passwordincorrect: "Password incorrect"});
                        }

                  })
        })
})

module.exports = router;