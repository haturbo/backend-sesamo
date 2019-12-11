const  EspacosController = require('../controllers/espaco-controller')

module.exports = (app)=>{
    const espacoController =  new EspacosController (app.datasource.models.espacos, app.datasource.sequelize)

    app.route('/espacos')
    .all(app.auth.authenticate())
        .get(async(req, res)=>{
            try{
                var data = await espacoController.getAll()
                res.send(data)
            }catch(e){
                console.log(e)
                res.status(400)
            }
        })
        .post(async (req, res)=>{   
            
            try {
                let espaco = await espacoController.espaco(req.body.nome)

                if(espaco){
                    return res.send('Espaco já cadastrado')
                }else{
                    var rs = await espacoController.post(req.body)
                    res.send(true).status(201)
                }
    
            }catch(e){
                console.log(e)
                res.status(422)
            }          
        })

    app.route('/espacos/:id')
    .all(app.auth.authenticate())
    .get(async(req, res)=>{
        try{
            var data = await espacoController.getById(req.params.id)
            res.send(data)
        }catch(e){
            console.log(e)
            res.status(400)
        }
    })
        .put(async (req, res)=>{    
            try{
                var rs = await espacoController.put(req.body, req.params.id)
                res.send(true).status(200)
            }catch(e){
                console.log(e)
                res.status(400)
            }  
        })
        .delete(async (req, res)=>{
            try{
                var rs = await espacoController.delete(req.params.id)

                res.send(true).status(204)
            }catch(e){
                console.log(e)
                res.status(400)
            }
        })

        app.route('/labsDisponiveis')
        .all(app.auth.authenticate())
        .get(async(req, res)=>{
            try{
                var data = await espacoController.getLabs(req.body)
                res.send(data)
            }catch(e){
                console.log(e)
                res.status(400)
            }
        })

        app.route('/getIdEspaco/:id')
    .get(async(req, res)=>{
        try{
            var data = await espacoController.getIdLab(req.params.id)
            res.send(data)
        }catch(e){
            console.log(e)
            res.status(400)
        }
    })

}