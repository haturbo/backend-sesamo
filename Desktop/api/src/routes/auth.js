const HttpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const UsersController = require('../controllers/user-controller')

module.exports = (app)=>{
    const userController =  new UsersController (app.datasource.models.usuarios)    
        
    app.route('/login')
    .post( async (req, res) =>{
        try{
            const response = await userController.signin(req.body)
            const login = response.login;
            
            console.log(login)

            if(login.id && login.isValid){
                const payload = {id: login.id, tag: login.tag}

                res.json({
                    token: jwt.sign(payload, app.config.jwt.secret, {expiresIn: '1h'})
                })
            } else{
                res.sendStatus(HttpStatus.UNAUTHORIZED)
            }

        }catch(e){
            console.error(e);
            res.sendStatus(HttpStatus.UNAUTHORIZED)
        }
    })
}