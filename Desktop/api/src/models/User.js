const bcrypt = require ('bcrypt')

module.exports = (sequelize, DataType) => {
    const Usuario = sequelize.define('usuarios', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            required: true,
            validate:{
                notEmpty: true
            }
        },
        tag:{
            type: DataType.INTEGER,
            //values: ['SERVIDOR', 'MONITOR', 'VIGILANTE'],
            required: true,
            validate:{
                notEmpty: true  
            }
        },
        email:{
            type: DataType.STRING,
            unique: true,
            validate:{
                notEmpty: true,
                isEmail: true
            }
        },
        datanascimento:{
            type: DataType.DATEONLY,
            validate:{
                notEmpty: true
            }
        },
        senha:{
            type: DataType.TEXT,
            validate:{
                notEmpty: true
            }
        }
    }, {
        hooks: {       
           async beforeCreate (usuario) {
                try{
                    const salt = bcrypt.genSaltSync()
                    usuario.set ('senha', bcrypt.hashSync(usuario.senha, salt))
                }catch(e){
                    console.error(e)
                }    
            }
        },
        freezeTableName: true,
        schema: 'public', 
        tableName: 'usuarios',
        timestamps: false,
        
    })
    
    Usuario.verificaSenha = async(encodedSenha, senha) => {
        try{
            if (await bcrypt.compareSync(senha, encodedSenha)){
                return true
            }
        }catch(e){
            console.error(e)
        }

        return false
    }

    return Usuario
}
