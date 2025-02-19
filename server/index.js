import express from 'express'; //importar framework
import logger from 'morgan';
import { Server } from 'socket.io';
import {createServer} from 'node:http';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';

dotenv.config();
const port = process.env.PORT ?? 3000; 

const app = express();
const server=createServer(app);
const io=new Server(server,{
    connectionStateRecovery:{}
});

const db=createClient({
    url:"libsql://leading-fantomex-kathhx.turso.io",
    authToken:process.env.DB_TOKEN
})
await db.execute(`
    CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT
    
    )    
`);

io.on('connection',async(socket)=>{
    console.log('un usuario se ha conectado');

    socket.on('disconnect',() =>{
        console.log('Un usuario se ha desconectado');
    });

    socket.on('chat message', async(msg)=>{
        let result;
        try {
            result=await db.execute({
                sql:'INSERT INTO messages (content) VALUES (:msg)',
                args:{msg}
            });
        } catch (e) {
            console.error(e)
            return
        }
        io.emit('chat message',msg,result.lastInsertRowid.toString()); //emitir el último mensaje que se ha guardado
    });
    console.log('auth');
    console.log(socket.handshake.auth);

    if(!socket.recovered){ //si no se ha recuperado los mensajes sin conexion
        try {
            const rsult=await db.execute({
                sql:'SELECT id, content FROM messages WHERE id>?',
                args:[0]
            });
        } catch (error) {
            console.log(error);
        }
    }
});

app.use(logger('dev')); //que la aplicación utilice el logger en modo desarrollo (dev)

app.get('/',(req,res)=>{
    res.sendFile(process.cwd() + '/cliente/index.html'); //mandar de respuesta un archivo donde se inicializa el proceso
})

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})

//logger = petición, URL, codigo de respuesta, el tiempo que tardo

