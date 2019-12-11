const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

var database = null;
var modelsByName = []; // Guarda os models para fazer as associações

const loadModels = (sequelize) => {
    const dir = path.join(__dirname, '../src/models');
    const models = [];

    fs.readdirSync(dir).forEach(file => { // Percorre todos os models que serão criados
        const modelPath = path.join(dir, file);
        const model = sequelize.import(modelPath);
        models[model.name] = model; // A cada iteração essa variável vai ter o nome de um model

        // Pega os models
        modelsByName.push(models[model.name]); // Agora eu coloco no array os nomes
        
    });

    return models;
};

module.exports = (app) => {
    if(!database){
        const config = app.config;

        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );

        database = {
            sequelize,
            Sequelize,
            models: {}
        };
        
        database.models = loadModels(sequelize);

        console.log(modelsByName[0]); // emprestimos
        console.log(modelsByName[1]); // espacos
        console.log(modelsByName[2]); // solicitacoes
        console.log(modelsByName[3]); // usuarios
        console.log(modelsByName[4]); // usuariospermitidos

        // AGORA VEM AS ASSOCIAÇÕES
        modelsByName[1].belongsToMany(modelsByName[3], {through: 'usuariospermitidos'})
        modelsByName[3].belongsToMany(modelsByName[1], {through: 'usuariospermitidos'})

        modelsByName[4].hasMany(modelsByName[2])
        modelsByName[2].belongsTo(modelsByName[4])
        
        // RE02: solicitacoes --> emprestimos 1:1 | 
        modelsByName[2].hasOne(modelsByName[0])
        
        sequelize.sync().done(() => database);
    }

    return database;
};