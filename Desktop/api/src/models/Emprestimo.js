module.exports = (sequelize, DataType) =>{
    const Emprestimos = sequelize.define('emprestimos', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        is_ativo:{
            type: DataType.BOOLEAN,
            allowNull: false,
            default: true,
            validate: {
                notEmpty: true
            }
        }
    },
    {
        freezeTableName: true,
        schema: 'public', 
        tableName: 'emprestimos',
    })

    return Emprestimos
}

