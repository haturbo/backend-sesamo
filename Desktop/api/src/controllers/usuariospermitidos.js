class UsuariosPermitidosController{
    
    
    constructor (modelUP){
        this.Up = modelUP
    }


    getDupla(data){
        return this.Up.findOne({attributes: ['espacoId', 'usuarioId'], where:{id: data}})
         .then(rs => rs)
         .catch(e => e)
     }

     post (data){
         return this.Up.create({
             espacoId: data.espacoId,
             usuarioId: data.usuarioId
         })
         .then(rs => rs)
         .catch(e => e)
     }

     postMonitor (params, data){
        return this.Up.create({
            espacoId: params,
            usuarioId: data
        })
        .then(rs => rs)
        .catch(e => e)
    }

    delete(data){
        return this.Up
        .destroy({where:{id: data}})
        .then(rs => true)
        .catch(e => e)
    }

    getPermissaoId(data){
        return this.Up.findOne({attributes: ['id'], where:{usuarioId: data.usuarioId, espacoId: data.espacoId}})
        .then(rs => rs)
        .catch(e => e)
    }


}

module.exports = UsuariosPermitidosController