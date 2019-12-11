const  UpController = require('../controllers/usuariospermitidos')

module.exports = (app)=>{
    const uController =  new UpController (app.datasource.models.usuariospermitidos, app.datasource.sequelize)

    app.route('/permitidos')
    .all(app.auth.authenticate())
        .post(async(req, res)=>{
            try{
                await uController.post(req.body)
                .then(rs =>{
                    res.send(true).status(201)
                })
                .catch(e =>{
                    console.error(e)
                })
            }catch(e){
                console.log(e)
                res.status(400)
            }
        })


    
}