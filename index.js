const app = require('express')();
const TelegramBot = require('node-telegram-bot-api');
const { v4: uuidv4 } = require('uuid');
const mail = require('./enviarCorreo');


app.listen(3000);
app.get('/', (req , res) => {
	res.send('asd');
});
app.get('/email', mail.sendEmail);

const bot = new TelegramBot('1561754185:AAGbbsUOGbIIwKuiJEKLxXGotL9IEbpP1lE',{polling: true});




var options = {
	reply_markup: JSON.stringify({
	inline_keyboard: [
						[{ text: "Análisis SEO Gratis", callback_data: JSON.stringify({
							'comando': 'menu',
                       		'respuesta': 1
						}) }],
						[{ text: "Análisis de tu feed de instagram GRATIS", callback_data: JSON.stringify({
							'comando': 'menu',
                       		'respuesta': 2
						}) }],
						[{ text: "Solicitar Presupuesto", callback_data: JSON.stringify({
							'comando': 'menu',
                       		'respuesta': 3
						}) }],
						[{ text: "Realizar Consulta", callback_data: JSON.stringify({
							'comando': 'menu',
                       		'respuesta': 4
						}) }],
						[{ text: "Asesoría AudioVisual", callback_data: JSON.stringify({
							'comando': 'menu',
                       		'respuesta': 5
						}) }]
						
						]
					}),
	parse_mode : "Markdown"
};

//var a = `https://www.turpialcreativo.com/ - Hola ${msg.from.first_name}, Dijiste: ${msg.text}`;getMyCommands

bot.on('message',(msg)=>{
	if(msg.text == '/menu'){
		bot.sendMessage(msg.from.id, `*Menú de opciones*`, options);
	}
});

bot.onText(/\/user (.+)/, (msg, match) => {
    let messageId = msg.message_id;
    let user = match[1];
    bot.sendMessage(msg.chat.id, `Su usuario: *${user}* ha sido enviado. Lo más pronto posible te contactaremos.` , {parse_mode : "Markdown"});
    mail.sendMail();
});

bot.onText(/\/presupuesto (.+)/, (msg, match) => {
    let messageId = msg.message_id;
    let maths = match[1];
    let correo = maths.split(' ')[0];
    let servicio = maths.split(' ')[1];
    bot.sendMessage(msg.chat.id, `A su correo: *${correo}* le estarán llegando las instrucciones sobre *${servicio}*.` , {parse_mode : "Markdown"});
});

bot.onText(/\/consulta (.+)/, (msg, match) => {
    let messageId = msg.message_id;
    let user = msg.chat.username;
    let consulta = match[1];
    bot.sendMessage(msg.chat.id, `Su consulta: '*${consulta}*' ha sido enviada. Lo más pronto posible te contactaremos a tu usuario *@${user}*.` , {parse_mode : "Markdown"});
});

bot.onText(/\/asesoria (.+)/, (msg, match) => {
    let messageId = msg.message_id;
    let correo = match[1];
    bot.sendMessage(msg.chat.id, `A su correo: *${correo}* le estarán llegando las instrucciones.` , {parse_mode : "Markdown"});
});

bot.on("callback_query", function onCallbackQuery(callbackQuery) {
	const action = JSON.parse(callbackQuery.data);
	console.log("a: " + action.respuesta);
	const msg = callbackQuery.message;
	const opts = {
				chat_id: msg.chat.id,
				message_id: msg.message_id,
				parse_mode : "Markdown"
			};
	let text;

	if(action.comando == 'menu'){
		
		switch(action.respuesta){
			case 1: 
			text = "Querid@ *" +msg.chat.first_name+"*, Visita el siguiente enlace: http://bit.ly/TurpialAnalisisSEO, e introduce este código: *"+uuidv4()+"*";
				break;
			case 2: 
			text = "Querid@ *" +msg.chat.first_name+"*, Introduce tu usuario de instagram, ejemplo: */user @tuUsuario* y la estaremos analizando. ¡Nos vemos en instagram!";
				break;
			case 3: 
			text = "Querid@ *" +msg.chat.first_name+"*, Introduce tu *correo electrónico* y *Servicio*, ejemplo: */presupuesto tu@correo.com Servicio*";
				break;
			case 4: 
			text = "Querid@ *" +msg.chat.first_name+"*, Describa su consulta a continuación, ejemplo: */consulta Necesito ayuda con respecto a mi sitio web.*";
				break;
				case 5: 
			text = "Querid@ *" +msg.chat.first_name+"*, Introduce tu *correo electrónico*, ejemplo: */asesoria tu@correo.com.*";
				break;
		}

	}

	bot.sendMessage(msg.chat.id, text, {parse_mode : "Markdown"});
	
	//bot.editMessageText(text, opts);
});

function despedida(){
 	this.bot.sendMessage(msg.chat.id, `Vista nuestra pagina web: *https://www.turpialcreativo.com/*`, {parse_mode : "Markdown"});
 }