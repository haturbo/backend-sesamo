const express = require ('express');
const app =  express()
const bodyParser = require('body-parser')
const cors = require ('cors')

const config = require ('./config/config')
const datasource = require('./config/datasource')

const authorization =  require ('./auth')

//caregamento de rotas
const routeIndex = require('./src/routes/index-routes')
const routeEspaco = require('./src/routes/espaco-route')
const routeUser = require('./src/routes/user-route')
const routeSolicitacao = require('./src/routes/solicitacao-route')
const routeEmprestimo = require('./src/routes/emprestimo-route')
const routeAuth = require ('./src/routes/auth')



app.config = config
app.datasource = datasource(app)

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
 
const auth = authorization(app)
app.use(auth.initialize())
app.auth = auth 


app.use ('/', routeIndex)
routeAuth(app)

routeEspaco(app)
routeUser(app)
routeEmprestimo(app)
routeSolicitacao(app)


module.exports = app