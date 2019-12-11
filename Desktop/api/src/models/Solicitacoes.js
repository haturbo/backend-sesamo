
module.exports = (sequelize, DataType) => {
    const Solicitacao = sequelize.define('solicitacoes', {
        id:{
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        is_concluida:{
            type: DataType.BOOLEAN,
            allowNull: false,
            default: false,
            validate:{
                notEmpty: true
            }
        },
    }, {
        freezeTableName: true,
        schema: 'public', 
        tableName: 'solicitacoes'       
    })
    
    return Solicitacao
}
