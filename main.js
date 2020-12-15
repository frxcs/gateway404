const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '|';

const ms = require("ms");

client.once('ready', () =>{
    console.log('gateway.404 is online!');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send('pong!');
    }
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'help'){
        message.channel.send('Hey there! Right now I am barebones and in development. The requirements to use this Bot are quite simple (Auto-Assigned role name as Member, everyone role has NO permissions, and Muted role has no permissions. The first letter of Member and Muted MUST BE CAPITALIZED). Please consider adding me to your servers using: https://discord.com/oauth2/authorize?client_id=763502571109089282&scope=bot&permissions=2146958847');
    }
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'twitch'){
        message.channel.send('My twitch channel is https://twitch.tv/frxcs');
    }
});

client.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");
 
    if(message.member.hasPermission('KICK_MEMBERS')){
    
    switch (args[0]) {
        case 'mute':
            var person  = message.guild.member(message.mentions.users.first() || members.cache.get(args[1]));
            if(!person) return  message.reply("I CANT FIND THE USER " + person)
 
            let mainrole = message.guild.roles.cache.find(role => role.name === "Member");
            let role = message.guild.roles.cache.find(role => role.name === "Muted");
           
 
            if(!role) return message.reply("Couldn't find the mute role.")
 
 
            let time = args[2];
            if(!time){
                return message.reply("You didnt specify a time!");
            }
 
            person.roles.remove(mainrole.id)
            person.roles.add(role.id);
 
 
            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
 
            setTimeout(function(){
                
                person.roles.add(mainrole.id)
                person.roles.remove(role.id);
                console.log(role.id)
                message.channel.send(`@${person.user.tag} has been unmuted.`)
            }, ms(time));
 
 
    
        break;
    }
}
    
 
 
});

const botsettings = require('./botsettings.json');

client.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;


    //args system that is very required!!!!
    let messageArray = message.content.split(" ")
    let args = messageArray.slice(1);

    let cmd = messageArray[0];

    if(cmd === "|ban") {
        let toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need permissions!") 
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Bot need permissions!") 

        const reason = args[1] || "There was no reason!";

        toBan.ban({
            reason: reason
        })
        message.channel.send(`${toBan} has been banned from the server!\nReason: ${reason}`)
    }

    if(cmd === "|unban") {
        let toBan = await client.users.fetch(args[0])

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need permissions!") 
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Bot need permissions!") 

        const reason = args[1] || "There was no reason!";

        message.guild.members.unban(toBan, reason)

        message.channel.send(`${toBan} has been unbanned from the server!`)
    }

})

module.exports = async (client) =>{
    const guild = client.guilds.cache.get('716316807912226837');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('786822441103392798');
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
        console.log('Updating Member Count');
    }, 5000);
}

client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
  });

client.login('NzYzNTAyNTcxMTA5MDg5Mjgy.X34pLg.lmSvXDCslUaJp098xABluDajmHA');