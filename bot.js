const Discord = require('discord.js');
const voiceDiscord = require('@discordjs/voice');
const ytdl = require('ytdl-core');


class playSound{

    constructor(message, sound, channel){
        this.msg = message;
        this.snd = sound;
        this.cnl = channel;
    }

    playHelp(connection,player, address){
        const stream = ytdl(address, {filter:'audioonly'});
        const resource = voiceDiscord.createAudioResource(stream);
        player.play(resource);
        connection.subscribe(player);

        
        // player.on(voiceDiscord.AudioPlayerStatus.Idle, () =>{
        //     connection.destroy();
        // })
    }

    playsnd(connection){
        const player = voiceDiscord.createAudioPlayer();
        
        switch(this.snd){
            
            case 'ui': this.playHelp(connection, player, 'https://www.youtube.com/watch?v=r-FokpGzJ3c');
            break;
            case 'cavalo': this.playHelp(connection, player, 'https://www.youtube.com/watch?v=tDcmF7vPVH4');
            break;
            case 'chega':this.playHelp(connection, player, 'https://www.youtube.com/watch?v=ICbIT7kTxKc');
            break;
            case 'danca':this.playHelp(connection, player, 'https://www.youtube.com/watch?v=5sZbWj7MHhc');
            break;
            case 'irra':this.playHelp(connection, player, 'https://www.youtube.com/watch?v=7iaQ_1s7x0o');
            break;
            case 'nao':this.playHelp(connection, player, 'https://www.youtube.com/watch?v=W7QITohk1pw');
            break;
            case 'pare':this.playHelp(connection, player, 'https://www.youtube.com/watch?v=b7281Y5IfE8');
            break;
            case 'papelao':this.playHelp(connection, player, 'https://www.youtube.com/watch?v=_NGgBtixnGg');
            break;
            case 'atumalaca':this.playHelp(connection, player, 'https://www.youtube.com/watch?v=DIbrKcyLt0E');
            break;
            case 'sensacional':this.playHelp(connection, player, 'https://www.youtube.com/watch?v=VF3-24kO1p4');
            break;
            case 'tome':this.playHelp(connection, player, 'https://www.youtube.com/watch?v=4oRButKK7NA');
            break;
            case 'xi':this.playHelp(connection, player, 'https://www.youtube.com/watch?v=pl3jncbg9Lg');
            break;
            case 'elegosta':this.playHelp(connection, player, 'https://www.youtube.com/watch?v=WFci2lINVE8');
            break;
            case 'ratinho':this.playHelp(connection, player, 'https://www.youtube.com/watch?v=tjYMmnladmQ');
            break;
            case 'mimada':this.playHelp(connection, player, 'https://www.youtube.com/watch?v=Gp9rnOfHkAs');
            break;
            case 'calma': this.playHelp(connection, player, 'https://www.youtube.com/watch?v=vHtWNLThgmM');
            break;
            default: this.msg.channel.reply("Que papelão hein...recurso não encontrado...")
        }       
    }
    
    createConnection(){
        const connection = voiceDiscord.joinVoiceChannel({
            channelId: this.cnl.id,
            guildId : this.msg.guild.id,
            adapterCreator: this.msg.guild.voiceAdapterCreator,
        })
    
        return connection;
        
    }
}


const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", 'GUILD_VOICE_STATES'] });

const prefix = "!";

client.once('ready', ()=>{ console.log("Farosounds is online.")});

client.on('messageCreate', async message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ + /);
    const input = args.shift().toLowerCase();
    const input_array = input.split(' ');
    var command = input_array[0];
    var sound = input_array[1];
    
    if(command === 'faro')  message.channel.send("Comandos disponíveis:\nui\ncavalo\nchega\ndanca\nirra\nnao\npare\npapelao\natumalaca\nsensacional\ntome\nxi\nelegosta\nratinho\nmimada\ncalma");
    else if(command === 'p'){

        if(input_array.length == 1) message.channel.send("Eita mamãe! Não há som para ser tocado nessa mensagem.");
        else {

            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) return message.reply('PARE!!!! Você precisa estar em um canal de voz para acionar o Farosounds.');
            else{
                const newSound = new playSound(message, sound, voiceChannel);
                const connec = newSound.createConnection();
                newSound.playsnd(connec);
            } 
        }   
    }
    else message.channel.send("UUUUUUI. Comando INVÁLIDO.");
})


client.login(mytoken);//last line
