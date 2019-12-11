const EmprestimoController = require('../controllers/emprestimo-controller')
const SolicitacoController = require('../controllers/solicitacao-controller')
const EspacoController = require('../controllers/espaco-controller')
const UsersController = require('../controllers/user-controller')
const UsuariosPermitidosController = require('../controllers/usuariospermitidos')
const ZHistoricoController = require('../controllers/zhistorico-controller')

module.exports = (app)=>{
    const emprestimoController =  new EmprestimoController (app.datasource.models.emprestimos, app.datasource.sequelize)
    const solicitacaoController = new SolicitacoController(app.datasource.models.solicitacoes)
    const espacoController = new EspacoController(app.datasource.models.espacos)
    const upController = new UsuariosPermitidosController(app.datasource.models.usuariospermitidos)
    const userController = new UsersController(app.datasource.models.usuarios)
    const historicoController = new ZHistoricoController(app.datasource.models.zhistoricos)

    app.route('/emprestimos')
    .all(app.auth.authenticate())
    .get(async(req, res)=>{
        try{
            var data = await emprestimoController.getAll()
            res.send(data)
        }catch(e){
            console.log(e)
            res.status(400)
        }
    })
    
    

    //esse metodo insere na tabela de emprestimos um novo registro
    //recebe no corpo da requsicao o id da solicitacao
    //ao fazer o insert, ele altera o estado do espaco, o tornando ocupado
    //altera o estado da solicitacao, deixando-a concluida
    app.route('/criaEmprestimo/')
    .all(app.auth.authenticate())
    .post(async (req, res)=>{   
        try {
            await solicitacaoController.updateConclusao(req.body.solicitacoId);

            let getIdThrough = await solicitacaoController.getIdThrough(req.body.solicitacoId);
            console.log(getIdThrough)

            let dupla = await upController.getdupla(getIdThrough.dataValues.usuariospermitidoId);

            console.log(dupla)

            await espacoController.updateStatus(dupla.dataValues.espacoId);

            var rs = await emprestimoController.post(req.body)
            res.send(rs).status(201)
        }catch(e){
            console.log(e)
            res.status(422)
        }          
    })

    
    //esse metodo get retorna todos os emprestimos que tem o campo is_ativo = true
    app.route('/emprestimosAtivos')
    .all(app.auth.authenticate())
    .get(async(req, res)=>{
        try{
            var data = await emprestimoController.getEmprestimos()
            res.send(data)
        }catch(e){
            console.log(e)
            res.status(400)
        }
    })

    app.route('/historico')
    .all(app.auth.authenticate())
    .get(async(req, res)=>{
        try{
            var data = await historicoController.getAll()
            res.send(data)
        }catch(e){
            console.log(e)
            res.status(400)
        }
    })
    
    
    //quando essa rota é chamada, ela muda o campo is_ativo para false na tabela de emprestimos
    //significando que o emprestimo chegou ao fim
    //e o usuario devolveu a chave
    //ela recebe como parametro o id do Emprestimo
    app.route('/finalizaemprestimo/')
    .all(app.auth.authenticate())
    .put(async (req, res)=>{    
        try{
                //chama o metodo para pegar  o id da solicitacao e guarda em uma variavel
            let solicitacao = await emprestimoController.getIdSolicitacao(req.body.id)
            let through = await solicitacaoController.getIdThrough(solicitacao.dataValues.solicitacoId);
           // console.log(through)//passa o id da solicitacao como parametro no metodo que pega o id de uuaiospermitidos e guarda o resultado em outravariavel
            
            let dupla = await upController.getDupla (through.dataValues.usuariospermitidoId)
            
            await espacoController.deixaDisponivel(dupla.dataValues.espacoId)
            await emprestimoController.put(req.body.id)

            let tempo = await emprestimoController.getTempo(req.body.id)
            let espaco = await espacoController.getByNome(dupla.dataValues.espacoId)
            let usuario = await userController.getByNome(dupla.dataValues.usuarioId)

            // console.log(tempo)
            // console.log(espaco)
            // console.log(usuario)

            await historicoController.post(espaco.dataValues.nome, usuario.dataValues.nome, tempo.dataValues)

            res.send(true).status(200)
        }catch(e){
            console.log(e)
            res.status(400)
        }  
    })

}