const Discord = require('discord.js');
const fetch = require("node-fetch");
const config = require("../config.json");
module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.cache.some(rle => rle.id === config.Roles["Staff"])) return message.reply('אין ברשותך את הגישה לפקודה זו.');
    let member = message.mentions.users.first()
        if (!member) return message.channel.send('You need to mention a user.');
        async function getPlayer() {
            try {
                var data = await fetch(`http://185.185.134.252:30120/players.json`);
                var info = await fetch(`http://185.185.134.252:30120/info.json`);
                var players = await data.json();
                var infoData = await info.json();
                return [true, players, infoData]
            } catch {
                return [false, undefined, undefined];
            }
        }
        getServer = (json) => {
            json.sort(function (a, b) {
                return parseFloat(a.id) - parseFloat(b.id);
            });
            let check = "false";
            var id = "";
            var name = "";
            var discord = "";


            for (let i = 0; i < json.length; i++) {
                if (getDiscord(json[i].identifiers) === `${member.id}`) {
                    check = "true";
                    id += json[i].id + "\n";
                    name += json[i].name + "\n";
                    discord += getDiscord(json[i].identifiers);
                    break;
                }
            }
            if (id == "") {
                id = "";
                name = "";
                discord = "";
            }


            return {
                id: id,
                name: name,
                discord: discord,
                check: check
            };
        }
        //RETURN DISCORD ID
        getDiscord = (identifiers) => {
            var discord = "Not Connected"
            for (let i = 0; i < identifiers.length; i++) {
                var identi = identifiers[i].toString();
                if (identi.indexOf("discord") != -1) {
                    discord = `${identi.substring(8, identi.length)}`;
                }
            }
            return discord;
        }
        var data = await getPlayer();
        var embed = new Discord.MessageEmbed();
        embed.setColor('#FF0000')
        embed.setFooter("Gamers-Israel | EMS Bot")

        if (data[0]) {
            var dataplayers = await getServer(data[1]);
            if (dataplayers.check === 'true') {
                embed.setTitle(`__Player is online !__`)
                embed.addFields({
                    name: "ID",
                    value: dataplayers.id,
                    inline: true
                }, {
                    name: "NAME",
                    value: dataplayers.name,
                    inline: true
                }, {
                    name: "DISCORD",
                    value: `<@${dataplayers.discord}>`,
                    inline: true
                })
            } else {
                embed.setTitle(`__Player Is Ofliine !__`)
            }
        } else {
            embed.setTitle('__Server is currently offline.__')
        }

        return message.channel.send(embed);
}
module.exports.help = {
    name: 'io'
}
