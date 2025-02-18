const http = require("http"); //Importa el módulo HTTP de Node.js
//const exportarDesdeOtro=require('./otro.js');
//console.log({exportarDesdeOtro});
//console.log(http);

function requestController(){
    console.log("Hola mundo!!!");
}
//configurar el servidor
const server = http.createServer(requestController); //montar el servidor

server.listen(4000);