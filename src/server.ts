import express, { Request, Response } from 'express';
import path from 'path';
import cors, { CorsOptions } from 'cors';
import connectDB from './connectionBd';
import router from './router';
const fs = require('fs'); 
const https = require('https');
import * as dotenv from 'dotenv';
import session from 'express-session';
dotenv.config();

const app = express();
const ServerStart=()=>{
    const port = process.env.PORT || 8000;
    console.log("Puerto base",port,process.env.PORT)
    const whiteList=['http://localhost:3000','https://localhost:3000','http://localhost:3001','https://tarotai-5crc.onrender.com',undefined];
    //const privateKey = fs.readFileSync(path.join(__dirname, '../public/certificates/private-key.pem'), 'utf8');
    //const certificate = fs.readFileSync(path.join(__dirname, '../public/certificates/public-cert.pem'), 'utf8');
    
    connectDB();
    const corsOptions:CorsOptions = {
      origin: function (origin:any, callback:any) {
        console.log("Origen:",origin,whiteList.indexOf(origin),whiteList.indexOf("https://tarotai-5crc.onrender.com"))
        if (origin?whiteList.indexOf(origin)!== -1:true) {
          // Permite la solicitud si el origen está en la lista blanca o si no se especifica un origen (ej. solicitud local)
          callback(null, true);
        } else {
          // Bloquea la solicitud si el origen no está en la lista blanca
          callback(new Error('No permitido por CORS'));
        }
      },
    };
    
    // Middleware para el análisis de JSON en solicitudes POST
    app.use(express.json());
    app.use(session({secret: 'tu_clave_secreta_aquí',resave: false,saveUninitialized: false}))
        
    // Ruta de la API JSON (POST) || cors solo para esta ruta del API
    app.use('/api',cors(corsOptions), router);

    
    
    // Ruta para servir archivos estáticos desde la carpeta 'public'
    app.use(express.static(path.join(__dirname, '../public')));
    app.use('/inicio',(req:Request,res:Response)=>{
      res.sendFile(path.join(__dirname,'../public/index.html'))
    })
    
    //const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app);
    //httpsServer.listen(port, () => {
    app.listen(port, () => {
        console.log(`Servidor HTTPS en ejecución en el puerto ${port}`);
    });
    
}

export {ServerStart,app}


