const passport = require('passport')
const  Strategy= require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt


module.exports = (app) => {
    const jwtConfig = app.config.jwt
    const usuario = app.datasource.models.usuarios
    
    const opts = {} 

    opts.secretOrKey = jwtConfig.secret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

    const strategy = new Strategy(opts, (payload, done)=>{
        usuario
        .findOne({where:payload.id})
        .then(usuario =>{
            if(usuario){ 
                return done(null, {
                    id: usuario.id,
                    tag: usuario.tag
                })
            }
            return done(null, false)
        })
        .catch(error => done(error, null))
    })

    passport.use(strategy)

    return{
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate ('jwt', jwtConfig.session)
    }
} 
