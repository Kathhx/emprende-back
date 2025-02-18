require('dotenv').config();
const http = require("http"); //Importa el módulo HTTP de Node.js
//const exportarDesdeOtro=require('./otro.js');
//console.log({exportarDesdeOtro});
//console.log(http);

function requestController(){
    console.log("Hola mundo!!!");
}
//configurar el servidor
const server = http.createServer(requestController); //montar el servidor

const PORT=process.env.PORT;
server.listen(function(){
    console.log("Aplicacion correindo en puerto: "+PORT);
});