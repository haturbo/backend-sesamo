module.exports = (sequelize, DataType) =>{
    const Espaco = sequelize.define('espacos', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true   
            }
        },
        is_ocupado:{
            type: DataType.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
    {
        freezeTableName: true,
        schema: 'public', 
        tableName: 'espacos',
        timestamps: false,
    })

    return Espaco
}


