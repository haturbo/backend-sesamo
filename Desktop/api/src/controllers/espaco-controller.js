const {Op} = require('sequelize')

class EspacosController{
    constructor (modelEspaco, sequelize){
        this.Espaco = modelEspaco;
        this.Object = sequelize
    }

    async getAll(){
        try{
          const rs = await this.Espaco.findAll({attributes:['id','nome', 'is_ocupado']});
          return rs
        }catch(e){
            return e
        }
      }

      async getByNome(data){
        return this.Espaco.findOne({attributes:['nome'] ,where: {id: data}})
        .then(rs => rs)
        .catch(e => e)
           
    }

    espaco(data){
        return this.Espaco.findOne({where:{
            nome:{
                [Op.iLike]: '%'+data+'%'
            }
        }})
        .then(rs => rs)
        .catch(e => e)
    }
    
    getLabs(id){
        return this.Object.query('SELECT "espacos"."id", "espacos"."nome" from "espacos", "usuariospermitidos" where "usuariospermitidos"."usuarioId" = '+ id.id +' and "espacos"."id" = "usuariospermitidos"."espacoId"',
        { type: this.Object.QueryTypes.SELECT} )
        .then(rs => rs)
        .catch(e => e)
    }


    getTudo(){
        return this.Object.query('SELECT "espacos"."id" as eid, "espacos"."nome" as espacos, "usuarios"."id" as uid, "usuarios"."nome" as usuarios from "espacos", "usuarios" where "usuarios"."tag" != 3',
        { type: this.Object.QueryTypes.SELECT} )
        .then(rs => rs)
        .catch(e => e)
    }

    async getById(params){
        try{
            const rs = await this.Espaco.findOne({where:{id: params}});
            return rs
          }catch(e){
              return e
          }
    }

    async post(data){
        try{
            const rs =  await this.Espaco.create({
                nome: data.nome,
                enum_espacos_campus: data.enum_espacos_campus,
                is_ocupado: false
            });
            return rs
        }catch(e){
            return e
        }       
    }


    async put(data, params){
        try{
            const  rs = await this.Espaco.update(data, {where:{id: params}})
            return rs
        }catch(e){
            return e
        }       
    }

    async delete(params){
       try{
        const rs = await this.Espaco.destroy({where:{id: params}})
        return rs
       } catch(e){
           return e
       }
    }

    updateStatus(data){
        return this.Espaco.update({is_ocupado: true},{where:{id: data}})
        .then(rs => rs)
        .catch(e => e)
    }

    deixaDisponivel(data){
        return this.Espaco.update({is_ocupado: false},{where:{id: data}})
        .then(rs => rs)
        .catch(e => e)
    }

}

module.exports = EspacosController