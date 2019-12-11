
class SolicitacaoController{
    
    
    constructor (modelSolicitacao, sequelize){
        this.Solicitacao = modelSolicitacao;
        this.Object = sequelize;
    }

    async getAll(){
        try{
            var rs =  await this.Solicitacao.findAll({where:{ is_concluida: false}})
         return rs
        }catch(e){
            return e
        }
    }

    getEspacosSolicitados(){
        return this.Object.query('SELECT "espacos"."nome", "solicitacoes"."id" from "espacos", "solicitacoes", "usuariospermitidos" where "solicitacoes"."usuariospermitidoId" = "usuariospermitidos"."id" and "espacos"."id" = "usuariospermitidos"."espacoId" and "solicitacoes"."is_concluida" = false',
        { type: this.Object.QueryTypes.SELECT} )
        .then(rs => rs)
        .catch(e => e)
    }

     post(data){      
        return this.Solicitacao.create({
                    usuariospermitidoId: data,
                    is_concluida: false})
                    .then(rs => rs)
                    .catch(e => e)
        }
            

     updateConclusao(params){
        return this.Solicitacao.update({is_concluida: true}, {where:{id: params}})
        .then(rs => rs)
        .catch(e => e)
    }

    getIdThrough(data){
       return this.Solicitacao.findOne({attributes: ['usuariospermitidoId'], where:{id: data}})
        .then(rs => rs)
        .catch(e => e)
    }

    delete(data){
        return this.Solicitacao
        .destroy({where:{id: data}})
        .then(true)
        .catch(e => e)
           
        }


}

module.exports = SolicitacaoController