
class EmprestimoController{
    constructor (modelEmprestimo, sequelize){
        this.Emprestimo = modelEmprestimo;
        this.Object = sequelize;
    }

    async getAll(){
        try{
            var rs =  await this.Emprestimo.findAll()
            return rs
        }catch(e){
            return e
        }
    }

    async post(data){
        try{
            const rs =  await this.Emprestimo.create({
                solicitacoId: data.solicitacoId,
                is_ativo: true
            });
            return rs
        }catch(e){
            return e
        }       
    }

    put( params){
        return this.Emprestimo.update({is_ativo: false}, {where:{id: params}})
        .then(rs => rs)
        .catch(e => e)      
    }

    getEmprestimos(){
    return this.Object.query('SELECT "espacos"."nome", "emprestimos"."id" from "espacos", "solicitacoes", "emprestimos" where "emprestimos"."solicitacoId" = "solicitacoes"."id" and "espacos"."id" = "solicitacoes"."espacoId" and "emprestimos"."is_ativo" = true',
        { type: this.Object.QueryTypes.SELECT} )
        .then(rs => rs)
        .catch(e => e)
    }

    getIdSolicitacao(params){
        return this.Emprestimo.findOne({attributes: ['solicitacoId'], where: {id: params}})
        .then(rs => rs)
        .catch( e => e)
    }

    getTempo(id){
        return this.Emprestimo.findOne({attributes: ['createdAt', 'updatedAt'], where:{id: id}})
    }

    geraHistorico(){
        return this.Object.query('select usuarios.nome as usuario, espacos.nome as espaco , emprestimos."createdAt", emprestimos."updatedAt" from usuarios, espacos, emprestimos, solicitacoes, usuariospermitidos where emprestimos."solicitacoId" = solicitacoes.id and solicitacoes."usuariospermitidoId" = usuariospermitidos.id and usuariospermitidos."espacoId" = espacos.id and usuariospermitidos."usuarioId" = usuarios.id and emprestimos."is_ativo" = false',
        { type: this.Object.QueryTypes.SELECT} )
        .then(rs => rs)
        .catch(e => e)
    }

}

module.exports = EmprestimoController