const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Se ha establecido la conexión');
    escucharMensaje();
});


const escucharMensaje = () => {
    client.on('message', message => {
        console.log(message.from);
        if('573013358475@c.us' === message.from){
            console.log(`Número correcto, mensaje: ${message.body}`);
            respuestas(message);
            return;
        }else{
            console.log(`Número Incorrecto, mensaje: ${message.body}`);
            return;
        }
    })
}

const respuestas = (message) => {
    client.sendMessage(message.from, 'Bienvenido a MovilTech S.A.S para solicitar alguno de nuestros servicios elige la opción que necesitas'+
    '\n'+'\n1. Soporte Técnico \n2. Ventas \n3. PQRS');
    switch (message.body){
        case  '1':
            client.sendMessage(message.from, 'Para soporte tecnico disponemos de las siguientes opciones '+
            '\n1.Soporte de Moviles \n2. Soporte de PC \n3. Soporte de otros dispositivos');
            break;
        case '2':
            client.sendMessage(message.from, 'Para ventas disponemos de las siguientes opciones '+
            '\n1.Ventas de Móviles \n2. Ventas de Pc \n3. Ventas de Audífonos \n4 Ventas de otros dispositivos');
            break;
        case '3':
            client.sendMessage(message.from, 'Para PQRS disponemos de las siguientes opciones'+
            '\n1. Peticiones \n2. Quejas \n3. Reclamos \n4. Estado de la Peticiòn/Queja o Reclamo');
            break;
        //default:
         //   client.sendMessage(message.from, 'La opcion digitada no existe, por favor digite el numero de una de las opciones');

    }
    //if(message.body === '!ping') {
       // message.reply('pong');
     //   console.log('Respondiste Pong');
   // }
}




client.initialize();