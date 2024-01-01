import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import "./db/connection.js";
import { __dirname, mongoStoreOptions } from './utils.js';

//-------------------------📌CHAT IMPORTS

import { Server } from "socket.io";
import MessagesDaoFS from './daos/fileSystem/chat.dao.js';
import { MessageModel } from "./daos/mongoDB/models/chat.model.js";
const msgDaoFS = new MessagesDaoFS(__dirname + '/data/messages.json');

//-------------------------📌VIEWS IMPORTS
import handlebars from 'express-handlebars';
import chatRouter from "./routes/chat.router.js"
import userRouter from "./routes/users.router.js";
import viewsRouter from './routes/views.router.js'

//-------------------------📌APIS IMPORTS
import cookiesRouter from "./routes/cookies.router.js";
import productsRouter from './routes/products.router.js';


//-------------------------📌FILESTORE IMPORTS
/* 
import sessionFileStore from "session-file-store";
 */
//-------------------------📌MONGOSTORE IMPORTS

import passport from "passport";
import "./passport/github.strategy.js";
import "./passport/local.strategy.js";


const app = express();

//-------------------------📌GENERAL SETTINGS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

//-------------------------📌HANDLEBARS SETTINGS
app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');  

//-------------------------📌SESSION OPTION
//app.use(session(fileStoreOptions));
app.use(session(mongoStoreOptions));

//-------------------------📌 PASSPORT SETTINGS
app.use(passport.initialize());
app.use(passport.session());

//-------------------------📌 VIEWS
app.use("/users", userRouter);
app.use('/', viewsRouter);

//-------------------------📌APIS ROUTES
app.use("/api/cookies", cookiesRouter);
app.use('/api/products', productsRouter);
app.use('/api/chat', chatRouter);


const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`🚀 Server OK on port:: ${PORT}`);
});
const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
  console.log('✔ Cliente conectado');

    console.log('🟢 ¡New connection on chat!', '✨' + socket.id + '✨');
    socketServer.emit('messages', await msgDaoFS.getAll());

    socket.on('disconnect', ()=>console.log('🔴 ¡User disconnect from chat!', socket.id));
    socket.on('newUser', (user)=>console.log(`⏩ ${user} inició sesión`));

    socket.on('chat:message', async(msg)=>{
        await msgDaoFS.createMsg(msg);
        socketServer.emit('messages', await msgDaoFS.getAll());
    })

    socket.on('newUser', (user)=>{
        socket.broadcast.emit('newUser', user)
    })

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data)
    })
  
  socket.on('chat:message', async (message) => {
    try {
        await MessageModel.create(message);
    } catch (error) {
        console.error('Error al guardar el mensaje:', error);
    }
  });
})

export default app;
