const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')


const app = express()

const conn = require('./db/conn')

//Models - chamando model para ser criada tabela quando iniciar o projeto 
    const Tought = require('./models/Tought')
    const User = require('./models/User')

//Configuração handlebars - template engine
    app.engine('handlebars', exphbs())
    app.set('view engine', 'handlebars')

//Receber resposta do body -> conseguir extrair quando vir requisição de formulário

    app.use(
    express.urlencoded({
        extended: true
    })
    )

//Receber dados em JSON
    app.use(express.json())

//Session middleware - onde o express vai salvar as sessões
    app.use(
        session({
            name: "session",
            secret: "nosso_secret",
            resave: false,
            saveUninitialized: false,
            store: new FileStore({
                logFn: function() {},
                path: require('path').join(require('os').tmpdir(), 'sessions'),
            }),
            cookie: {
                secure: false,
                maxAge: 360000,
                expires: new Date(Date.now() + 36000),
                httpOnly: true
            }
        }),
    )

//Flash messages - mensagens do status do sistema - quando fazemos uma operação com db recebendo feedback
    app.use(flash())

//Arquivos públicos - assets
    app.use(express.static('public'))

//Set session to res -> Salvar a sessão na reposta
    
    app.use((req, res, next) => {
        
        if(req.session.userid) {
            res.locals.session - req.session
        }

        next()
    })
conn 
    // .sync({force: true})
    .sync()
    .then(() => {
        app.listen(3000)
    })
     .catch((err) => console.log(err))

