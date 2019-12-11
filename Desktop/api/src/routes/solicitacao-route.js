const SolicitacaoController = require('../controllers/solicitacao-controller')
const UsuariosPermitidosController = require('../controllers/usuariospermitidos')
const UserController = require ('../controllers/user-controller')

module.exports = (app)=>{
    const solicitacaoController =  new SolicitacaoController (app.datasource.models.solicitacoes, app.datasource.sequelize)
   const upController = new UsuariosPermitidosController(app.datasource.models.usuariospermitidos)
    const userController = new UserController(app.datasource.models.usuarios)

    app.route('/solicitacoes')
    .all(app.auth.authenticate())
    .get(async(req, res)=>{
        try{
            var data = await solicitacaoController.getAll({})
            res.send(data)
        }catch(e){
            console.log(e)
            res.status(400)
        }
    })
    .post(async(req, res)=>{//RECEBE usuarioId e espacoId, busca o id da permissao e faz o post
        try{ 
            let permissaoIdServidor;
            let permissaoId = await upController.getPermissaoId(req.body)
            let tagUser = await userController.getTag(req.body.usuarioId)

            if (!permissaoId && tagUser.dataValues == 1){
                await upController.post(req.body)
                permissaoIdServidor = await upController.getPermissaoId(req.body)

                var x = await solicitacaoController.post(permissaoIdServidor.dataValues.id)
                res.send(x).status(201)
            }else{
                var rs = await solicitacaoController.post(permissaoId.dataValues.id)
                res.send(rs).status(201)
            }
    
        }catch(e){
            console.error(e)
            res.send({error: 'erro ao solicitar'}).status(400)
        }
    })

//essa rota GET devolve os nomes de todos os espacos ue foram solicitados e ainda nao foram aceitos 
//e se tu fez a modificação que mandei retorna o id da solicitacao 
    app.route('/espacosSolicitados')
    .all(app.auth.authenticate())
    .get( (req, res)=>{    
        solicitacaoController.getEspacosSolicitados() 
        .then(rs =>{
            console.log(rs)
            res.send(rs).status(200)
        })
        .catch(error =>{
            console.error(error)
            res.status(400)
        })
    })


}