
class ZHistoricoController{
    constructor (modelZHistorico, sequelize){
        this.Historico = modelZHistorico;
        this.Object = sequelize
    }

    
    getAll(){
        return this.Historico.findAll()
        .then(rs => rs)
        .catch(e => e)
    }
    
    post (espaco, usuario, tempo){
        return this.Historico.create({
          espaco: espaco,
          usuario: usuario,
          inicio: tempo.createdAt,
          fim: tempo.updatedAt
        })
        .then(rs => rs)
        .catch(e => e)
    }

}

module.exports = ZHistoricoController