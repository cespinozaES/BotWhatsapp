const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

let contador = 0;
let temporizador;

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Se ha establecido la conexión');
    console.log(`Contador antes de escuchar mensaje ${contador}`);
    clearTimeout(temporizador);
    escucharMensaje();
    
});
const escucharMensaje = () => {
    client.on('message', message => {
        console.log(message.from);
        if ('573013358475@c.us' === message.from) {
            console.log(`Número correcto, mensaje: ${message.body}`);   
            clearTimeout(temporizador);   
                temporizador = setTimeout(() => {
                client.sendMessage(message.from, 'Se ha detectado 5 minutos de inactividad, el chat a finalizado');
                 contador = 0; 
             }, 300000);
            respuestas(message);
            return;
        } else {
            console.log(`Número Incorrecto, mensaje: ${message.body}`);
            return;
        }
    })
}


const respuestas = (message) => {
    console.log('Entro a funcion de respuestas');
    if (contador === 0){
        mensajeBienvenida(message);
    }
    if (contador === 1){
        serviciosSwitch(message);
        return;
    }
    if (contador === 2){
        soporteSwitch(message);
        return;
    }

    if(contador === 3){
        client.sendMessage(message.from, 'Por favor escriba la marca del dispositivo');
        contador = 4;
        return;
    }

    if (contador === 4){
        client.sendMessage(message.from, 'Por favor escriba el modelo del dispositivo');
        contador = 7;
        return;  
    }

    if (contador === 5){
        ventasSwitch(message);
        return;
    }
    if (contador === 6){
        pqrsSwitch(message);
        return;
    }
    if (contador === 7){
        client.sendMessage(message.from, 'Gracias por la información en un momento lo atendera un acesor'); 
        contador= 999;
        return;
    }

    
}

    const mensajeBienvenida = (message) => {
            client.sendMessage(message.from, 'Bienvenido a MovilTech S.A.S para solicitar alguno de nuestros servicios elige la opción que necesitas' +
            '\n' + '\n1. Soporte Técnico \n2. Ventas \n3. PQRS');
            contador = 1;
    }

    const serviciosSwitch = (message) =>{
        switch (message.body) {
            case '1':
                client.sendMessage(message.from, 'Para soporte tecnico disponemos de las siguientes opciones \n' +
                    '\n1. Soporte de Moviles \n2. Soporte de PC \n3. Soporte de otros dispositivos \n4. Finalizar chat');
                contador = 2;
                    break;
            case '2':
                client.sendMessage(message.from, 'Para ventas disponemos de las siguientes opciones \n' +
                    '\n1.Ventas de Móviles \n2. Ventas de Pc \n3. Ventas de Audífonos \n4 Ventas de otros dispositivos \n5. Finalizar chat');
                contador = 5;
                    break;
            case '3':
                client.sendMessage(message.from, 'Para PQRS disponemos de las siguientes opciones \n' +
                    '\n1. Peticiones \n2. Quejas \n3. Reclamos \n4. Estado de la Petición/Queja o Reclamo \n5. Finalizar chat');
                    contador = 6;
                    break;
    
        }
    }


    const soporteSwitch = (message) =>{
        switch (message.body) {
            case '1':
            case '2':
            case '3':
                client.sendMessage(message.from, 'Que informacion necesita para este soporte \n' +
                    '\n1. Instalación \n2. Fallas del dispositivo \n3. Preguntas sobre funcionamiento');
                    contador = 3;
                break;
            case '4':
                client.sendMessage(message.from, 'El chat ha finalizado.');
                contador = 0;
                    break;
    
        }
    }

    const ventasSwitch = (message) =>{
        switch (message.body) {
            case '1':
            case '2':
            case '3':
            case '4':
                client.sendMessage(message.from, 'Por favor digite la marca de su dispositivo'); 
        contador = 7;
                break;
            case '5':
                client.sendMessage(message.from, 'El chat ha finalizado.');
                contador = 0;
                    break;
    
        }

    }


    const pqrsSwitch = (message) =>{
        switch (message.body) {
            case '1':
            case '2':
            case '3':
            case '4':
                client.sendMessage(message.from, 'Por favor escriba la información sobre su PQRS'); 
        contador = 7;
                break;
            case '5':
                client.sendMessage(message.from, 'El chat ha finalizado.');
                contador = 0;
                    break;
    
        }
    }




client.initialize();