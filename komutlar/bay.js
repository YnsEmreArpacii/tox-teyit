const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args, ops) => {
    message.delete()
    if (!message.member.roles.find("name", "Ꮦ I  ᴛᴇʏɪᴛ")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`Ꮦ I  ᴛᴇʏɪᴛ*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    }  
    let toverify = message.guild.member(message.mentions.users.first());
    let verifyrole = message.guild.roles.find(`name`, "♂ Man");
    let verifyrolee = message.guild.roles.find(`name`, "☭ I Unregister");
    if(toverify.roles.find(`name`, "♂ Man")) return message.channel.send('Teyit Başarısız, Kullanıcı Zaten Kayıtlı.')
    if(toverify.roles.find(`name`, "♀ Woman")) return message.channel.send('Teyit Başarısız, Kullanıcı Zaten Kayıtlı.')
    if (!verifyrole) return message.reply("Rol Bulunamadı Lütfen 'Lianslı' Adıyla Rol Oluşturunuz.");
    if (!verifyrolee) return message.reply("Rol Bulunamadı Lütfen 'Lianslı' Adıyla Rol Oluşturunuz.");
    if (!toverify) return message.reply("Bir kullanıcıdan bahsetmelisin.");
    await (toverify.addRole(verifyrole.id),toverify.removeRole(verifyrolee.id));
    let vUser = message.guild.member(message.mentions.users.first());
    let teyitsayisi = await db.fetch(`teyit.${message.guild.id}.${message.author.id}`);
    let verifembed = new Discord.RichEmbed()
        .setTitle("Teyit Çıktısı")
        .setColor('#a5f23a')
        .addField("Teyit Eden Kişi", `${message.author.username}`, true)
        .addField("Kanal", message.channel, true)
        .addField("Teyit Olan Kişi", `${vUser}`, true)
        .addField("Teyit Cinsiyeti", "Erkek", true)
        .addField("Teyit Sayısı", `${teyitsayisi || 0}`, true)
        .addField("TOXNY", "Gururla Sunar...!", true)
        .setTimestamp();
      let veriflog = message.guild.channels.find(`name`, "🔺ᴋᴀʏıᴛʟᴀʀ");
    if (!veriflog) return message.channel.send("Doğrulama Kullanıcı Log Kanalı bulunamadı. Lütfen '🔺ᴋᴀʏıᴛʟᴀʀ' Adlı Kanal Oluşturunuz.`");
    veriflog.send(verifembed);
  
    let teyit = await db.add(`teyit.${message.guild.id}.${message.author.id}`, 1);
    let teyiterkek = await db.add(`teyite.${message.guild.id}.${message.author.id}`, 1);
  
  
  let teyitt = await db.fetch(`teyit.${message.guild.id}.${message.author.id}`);  
  
    message.channel.send(`<@${message.author.id}> Başarıyla Teyit Ettin. Teyit Edilen Kişi ${vUser}. Teyit Sayınız: ${teyitt ? teyitt : 'Hiç Teyit Etmemiş.'}`);
  
    const emoji1 = client.emojis.get('702138649151668284');
    const emoji2 = client.emojis.get('702138649151668284');
    const emoji3 = client.emojis.get('702138649151668284');
    const embed = new Discord.RichEmbed()
     .setColor("#0080FF")
    .setAuthor(client.user.username,client.user.displayAvatarURL)
    .setDescription(`${emoji1} ${vUser}, Aramıza Hoşgeldin :)
        
    ${emoji2}Seninle Beraber **${message.guild.memberCount}** kişiyiz.
    ${emoji2}Cinsiyet: **ERKEK**

    ${emoji3}Şu Kanallara Göz Atmayı Unutma <#701166152021442635> **-** <#702557703553155153>`,true)
    .setTimestamp()
    .setFooter(`KURALLARA UYMAYI UNUTMAYINIZ.!`)
    
    let onay = message.guild.channels.find(`name`, "toxny-chat");
    onay.send(embed).then(m => m.delete(60000));
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['erkek', 'Erkek', 'ERKEK', 'ᴇʀᴋᴇᴋ', 'bay', 'Bay', 'BAY'],
};

exports.help = {
  name: 'teyit-erkek',
  description: 'Kullanıcı İçin Lianslı Rolünü Verir.',
  usage: 'bay'
};
