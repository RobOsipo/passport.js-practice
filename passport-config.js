const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')




function initialize(passport, getUserByEmail) {
    const authenticateUser = (email, password, done) => {
        const user = getUserByEmail(email)
        if (user === null) {
            return done(null, false, {message: 'Invalid email'})
        }
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user)
        } else {
            return done(null, false, {message: 'Password incorrect'})
        }
    } catch (err) {
        return done(err)
    }

    passport.use(new LocalStrategy({ usernameField: 'email'}), authenticateUser )
    passport.serialize((user,done) => {

    })
    passport.deserialize((id,done) => {

    })
}


module.exports = initialize