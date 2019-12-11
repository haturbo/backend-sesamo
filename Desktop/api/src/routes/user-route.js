const  UsersController = require('../controllers/user-controller')
const ValidationContract = require('../validators/fluent-validator')
const UPController = require ('../controllers/usuariospermitidos')

module.exports = (app)=>{
    const userController =  new UsersController (app.datasource.models.usuarios, app.datasource.sequelize)
    const upController = new UPController(app.datasource.models.usuariospermitidos)

    app.route('/usuarios')
        .get((req, res)=>{
            userController
            .getAll()
            .then(rs => res.json(rs))
            .catch(error => {
                console.error(error)
            })

        })
    
        app.route('/cadastrousuarios')
        .post(async (req, res)=>{   
            try {
                
                let user = await userController.getByEmail(req.body.email)
                
                if (user){
                    return res.status(400).send({error: 'Email ja cadastrado'})
                }else{
                    var rs = await userController.post(req.body)
                    res.send(true).status(201)
                }
    
            }catch(e){
                console.log(e)
                res.status(422)
            }          
        })

        app.route('/cadastroMonitor/:espacoId')
        .post(async (req, res)=>{   
            try {
                
                let user = await userController.getByEmail(req.body.email)
                
                if (user){
                    return res.status(400).send({error: 'Email ja cadastrado'})
                }else{
                    var rs = await userController.post(req.body)
                    
                    let usuarioId = await userController.getId(req.body.nome)

                    await upController.postMonitor(req.params.espacoId, usuarioId.dataValues.id )
                    
                    res.send(true).status(201)
                    console.log(rs)
                }

            }catch(e){
                console.log(e)
                res.status(422)
            }          
        })

    .put( (req, res)=>{    
        return userController
        .put(req.body, req.params.id)
        .then(rs =>{
            res.json(rs.data)
        })
        .catch(error => {
            console.error(error.message)
            res.status(error.status)
        })
        
    })
    .delete(async (req, res)=>{
        return userController
            .delete(req.params.id)
            .then(rs =>{
                res.send(true).status(200)
            })
            .catch(error => {
                console.error(error)
                res.status(400)
            })
            
    })

    app.route('/tagusuario/:id')
    .get(async(req, res)=>{
        try{
            var data = await userController.getTag(req.params.id)
            res.send(data)
        }catch(e){
            console.log(e)
            res.status(400)
        }
    })

    app.route('/getIdUsuario/:id')
    .get(async(req, res)=>{
        try{
            var data = await userController.getIdUser(req.params.id)
            res.send(data)
        }catch(e){
            console.log(e)
            res.status(400)
        }
    })

    
}