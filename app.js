const fs = (require('fs'));
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const SESSION_FILE_PATH = './session.json';
let client; 
let sessionData;
const sesionIniciada = () => {
}


const sinSesion = () => {
    console.log('Aun no se ha iniciado sesión');
    client = new Client();
    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        qrcode.generate(qr, { small: true });
    });

    client.on('authenticated', (session) => {
        //Guardamos datos de la sesion
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (error) => {
            if (error) {
                console.log(error);
            }
        });    
    });
    client.initialize();

}

//Esto se encarga de revisar si existe ese archivo para ejecutar una funcion u otra 
(fs.existsSync(SESSION_FILE_PATH)) ? sesionIniciada() : sinSesion();