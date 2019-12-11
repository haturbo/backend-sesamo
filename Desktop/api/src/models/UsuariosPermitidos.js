
module.exports = (sequelize, DataType) => {
    const UsuariosPermitidos = sequelize.define('usuariospermitidos', {
        id:{
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        freezeTableName: true,
        schema: 'public', 
        tableName: 'usuariospermitidos',
        timestamps: false,    
    })
    
    return UsuariosPermitidos
}
