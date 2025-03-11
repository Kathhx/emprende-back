require("dotenv").config();
const http=require('http');

// const importarDeAnother =require('./another');
// console.log(importarDeAnother);

function controladorPeticiones(){
    console.log("Recibimos una nueva peticion");
}

//Configurar el servidor
const server=http.createServer(controladorPeticiones);

const PORT=process.env.PORT;
server.listen(PORT,function(){
    console.log("Aplicación corriendo en puerto: "+PORT);
});




/*
Variables: Espacio en memoria para su postrior uso
let (El contenido puede cambiar), const (EL contenido no puede cambiar)

require extraer codigo desde otro archivo, se debe de exportar en uno e importar en otro
Para backend se debe importar con require
Para frontend se debe importar con import 
*/