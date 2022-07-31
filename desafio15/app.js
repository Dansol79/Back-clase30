const express = require('express');
const path = require('path');
const moment = require('moment');
const {Server : HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const cors = require('cors');
const { config} = require('./config/db');
const serverRoutes = require('./routes/routerGeneral');
const chatController = require('./components/chat/ChatController');
const normalizar = require('normalizr');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { mongodb } = require('./config/db');
const { yargObj }  = require('./utils/yarg');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;


// Inicializar
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


// Vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//  Session
app.use(session({
    store: MongoStore.create({
        mongoUrl: mongodb.URL,
        mongoOptions: mongodb.options
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000 * 60
    },
    rolling: true
})

);


// Routes
serverRoutes(app);

// *** SOCKET ****

io.on('connection', async (socket) => {
  console.log('a user connected');

  socket.emit('messages', normalizar(await chatController.listAll()));


  socket.on('message', async (message) => {
    
    const {author, text} = message;
    const newMessage ={
        author, 
        text,
        fecha: moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
    }
    await chatController.save({
        author: newMessage.author,
        text: newMessage.text,
        fecha: newMessage.fecha
    });
    io.sockets.emit('message', newMessage);

  });
});

const PORT = process.argv[2] || yargObj.port;
const mode = process.argv[3]?.toUpperCase() || yargObj.mode.toUpperCase();

console.log(process.argv[2]);

if(mode === 'FORK') {
    const server = httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT} || Worker ${process.pid} statrted!`);
    });

    server.on('error', (e) => {
        console.log('Error del servidor')
    });
    process.on('exit', (code) => {
        console.log('Exit code -> ', code);
    });
}
if(mode === 'CLUSTER'){
    if(cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);
         
        
        // Workes
        console.log('cpus..', numCPUs);
        for(let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`);
            cluster.fork();
        });

    }else{
        const server = httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT} || Worker ${process.pid} statrted!`);
        });

        server.on('error', (e) => {
            console.log('Error del servidor')
        });
        process.on('exit', (code) => {
            console.log('Exit code -> ', code);
        });
    }
}





