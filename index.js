const Discord = require("discord.js");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]});

require("dotenv").config();

const prefix = "?";

Client.on("ready", () => {
    console.log("bot opérationnel");
});

Client.login(process.env.BOT_TOKEN);

Client.on('messageCreate', message => {
    if (message.author.bot) return;

    //const guild = Client.guilds.cache.get("908689442829647932");

//function test(){
    //var memberCount = guild.members.cache.filter(member => !member.user.bot).size;  
    //var memberCountChannel = Client.channels.cache.get("908726441921884170");
    //memberCountChannel.setName(`MSTH à ${memberCount} membres!`);
    //console.log(`MSTH à ${memberCount} membres!`);
//};

    //if (message.content === prefix + "in"){
        //setInterval(test, 100);
    //};
    // ?ping
    if (message.content === prefix + "ping"){
        message.channel.send("Pinging...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;
            var ClientPing = Math.round(Client.pi);

            m.edit(`**:ping_pong: Pong! Le ping est de :**\n  ${ping}ms`);
        });
    }

    // ?help
    else if (message.content === prefix + "rules"){
        const embed = new Discord.MessageEmbed()
            .setColor("#e51570")
			.setTitle("▬▬▬▬・𝐑é𝐠𝐥𝐞𝐦𝐞𝐧𝐭・▬▬▬▬")
            .addFields(
                { name: ':pushpin: I/Les pseudos sur le discord :', value: "Vous êtes priés de changer de pseudo en utilisant votre nom in-game en respectant le schéma suivant : <Prénom RP> <Nom RP>  Pas de pseudo à caractère pornographique ou insultant / raciste ----->Sanctionné d'un ban", inline: false },
                { name: ':pushpin: II/Comportements sur le site :', value: "Tout informations obtenues dans le site à but malveillant comme les noms des employés par exemple sont punies d'un bannissement permanent du site. Nous rappelons aussi que c'est une entreprise et pas une organisation , il est hors de questions de parler d'illégal dans un contexte RP dans les salons RP. Vous avez droit de vous exprimer comme bon vous semble tant que vous restez polis et bienveillants.", inline: false },
                { name: ':pushpin: III/Respect des fonctions des salons :', value: "Il est OBLIGATOIRE de respecter les sujets et fonctions des salons du site , tout irrespect des fonctions ou sujets est sanctionné d'un bannissement temporaire du discord (2 à 3 jours)", inline: false },
            )
			.setDescription(":pushpin: Ce Discord obéit aux mêmes règles que le serveur GTA Sealife , vous serez sanctionné d'un bannissement temporaire ou permanent du site si vous ne les respectez pas voici quelques petites règles supplémentaires pour que chacun puisse s'exprimer et respecter les autres.")
			.setFooter("Merci de votre compréhension", "http://www.image-heberg.fr/files/16367229223084801872.png");
        message.channel.bulkDelete(1)
        message.channel.send({ embeds: [embed]});
    }
    // ?clear
    else if (message.member.permissions.has("SEND_MESSAGES")){
        if (message.content.startsWith(prefix + "clear")){
            let args = message.content.split(" ");
            
            if (args[1] == undefined){
                message.reply("Nombre de messages non ou mal défini.")
            }
            else {
                let number = parseInt(args[1]);

                if (isNaN(number)){
                    message.reply("Nombre de messages non ou mal défini.");
                }
                else {
                    message.channel.bulkDelete(number+1).then(messages => {
                        console.log("Supression de " + messages.size + " messages réussi !");
                    }).catch(err => {
                        console.log("Erreur de clear : " + err);
                    });
                }
            }
        }
    }

});





