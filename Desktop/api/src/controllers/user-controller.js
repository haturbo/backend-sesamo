
class UsersController{
    constructor (modelUser, sequelize){
        this.User = modelUser;
        this.object = sequelize;
    }

     getTag(params){
       return this.User.findOne({attributes: ['tag'], where:{id: params}})
       .then(rs => rs)
       .catch(e => e)
  
    }

    getId(params){
        return this.User.findOne({attributes: ['id'], where:{nome: params}})
        .then(rs => rs)
        .catch(e => e)
   
     }
    
     getAll(){
        return this.User.findAll()
        .then(rs => rs)
        .catch(e => e)
         
    }


    async getByEmail(email){
        try{
            const rs = await this.User.findOne({where: {email: email}});
            return rs
          }catch(e){
              return e
          }
    }

    getByNome(params){
        return this.User.findOne({attributtes:['nome'], where:{id : params}})
        .then(rs => rs)
        .catch(e => e)     
    }

    post(data){
        return this.User.create(data)
        .then(rs => rs)
        .catch(e => e) 
    }


    async put(data, params){
        return this.User
        .update(data, {where:{id: params}})
        .then(rs => rs)
        .catch(e => e) 
    }

    async delete(params){
        return this.User
        .destroy({where:{id: params}})
        .then(true)
        .catch(e => e)
           
        }
        
         async signin(data){
             const response = {
                 login:{
                     id: null,
                     isValid: false,
                     message: "login inválido"
                 }
             }

             if (data.email && data.senha){
                 const email = data.email
                 const senha = data.senha

                try{
                const result = await this.User.findOne({where: {email: email}})
                 const usuario = await result

                 if(usuario){
                    
                    const isSenha = await this.User.verificaSenha(usuario.senha, senha)

                    console.log('Verificação da senha -> '+ isSenha)

                    if (isSenha){
                        response.login.id = usuario.id;
                        response.login.tag = usuario.tag
                        response.login.isValid = isSenha;
                        response.login.message = "logado com sucesso"

                        return response
                    }//end if
                 }
                } catch(e){
                    console.error(e)
                }       
             
            
            }//end if
          
             return response
        }
    
            
        
    }

    

module.exports = UsersController