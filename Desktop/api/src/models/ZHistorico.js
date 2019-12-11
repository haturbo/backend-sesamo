
module.exports = (sequelize, DataType) => {
    const zhistoricos = sequelize.define('zhistoricos', {
        id:{
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        espaco:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        usuario:{
            type: DataType.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        inicio:{
            type: DataType.DATE,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        fim:{
            type: DataType.DATE,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }
    }, {
        freezeTableName: true,
        schema: 'public', 
        tableName: 'zhistoricos',
        timestamps: false,    
    })
    
    return zhistoricos
}
