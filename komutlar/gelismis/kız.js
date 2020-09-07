const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args, ops) => {
    message.delete()
    if (!message.member.roles.find("name", "ᕒ ᴀᴜᴛʜᴏʀɪᴢᴇᴅ ᓬ")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`ᕒ ᴀᴜᴛʜᴏʀɪᴢᴇᴅ ᓬ*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    }

    const isim = args[1]
    const yas = args.slice(2).join('')
  
    
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!member) return message.channel.send(`**${message.author.username}, Üzgünüz, demek istediğiniz kullanıcıyı bulamıyorum**!`);
  
    if(!isim) return message.reply("Bir İsim Yazmalısın.")
  if(!yas) return message.reply("Bir Yaş Yazmalısın.")
  
  if(yas<9) return message.reply("En az 9 yaşını doldurmuş olması gerekli.")
  if(yas>50) return message.reply("En Fazla 50 Yaşında Olmalı. Emekli Olmuş Dayı Galiba xD")
  

    let toverify = message.guild.member(message.mentions.users.first());
    let verifyrole = message.guild.roles.find(`name`, "ʙᴀʏᴀɴ");
    let verifyrolee = message.guild.roles.find(`name`, "ᴍɪsᴀғɪʀ");
    if(toverify.roles.find(`name`, "ᴇʀᴋᴇᴋ")) return message.channel.send('Teyit Başarısız, Kullanıcı Zaten Kayıtlı.')
    if(toverify.roles.find(`name`, "ʙᴀʏᴀɴ")) return message.channel.send('Teyit Başarısız, Kullanıcı Zaten Kayıtlı.')
    if (!verifyrole) return message.reply("Rol Bulunamadı Lütfen 'Lianslı' Adıyla Rol Oluşturunuz.");
    if (!verifyrolee) return message.reply("Rol Bulunamadı Lütfen 'Lianslı' Adıyla Rol Oluşturunuz.");
    if (!toverify) return message.reply("Bir kullanıcıdan bahsetmelisin.");
    await (toverify.addRole(verifyrole.id),toverify.removeRole(verifyrolee.id),toverify.setNickname(""+isim+" | "+yas+"").catch(err => ("İsmin ayarlanırken bir hata oluştu.!")));
    let vUser = message.guild.member(message.mentions.users.first());

    let teyit = await db.add(`teyit.${message.guild.id}.${message.author.id}`, 1);
    let teyitkiz = await db.add(`teyitk.${message.guild.id}.${message.author.id}`, 1);

    let teyitsayisi = await db.fetch(`teyit.${message.guild.id}.${message.author.id}`);
    let verifembed = new Discord.RichEmbed()
        .setTitle("Teyit Çıktısı")
        .setColor('#a5f23a')
        .addField("Teyit Eden Kişi", `${message.author.tag}`, true)
        .addField("Kanal", message.channel, true)
        .addField("Teyit Olan Kişi", `${vUser}`, true)
        .addField("Teyit Cinsiyeti", "Kız", true)
        .addField("Teyit Sayısı", `${teyitsayisi}`, true)
        .addField("THE CYPHER EMPIRE", "Gururla Sunar...!", true)
        .setTimestamp();
    let veriflog = message.guild.channels.find(`name`, "🔺ᴋᴀʏıᴛʟᴀʀ");
    if (!veriflog) return message.channel.send("Doğrulama Kullanıcı Log Kanalı bulunamadı. Lütfen '🔺ᴋᴀʏıᴛʟᴀʀ' Adlı Kanal Oluşturunuz.`");
    veriflog.send(verifembed);
    
    let onay = message.guild.channels.find(`name`, "💬ɢᴇɴᴇʟ-sᴏʜʙᴇᴛ");
    onay.send(`${vUser} Aramıza Katıldı.!`);
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kız', 'Kız', 'KIZ', 'ʙᴀʏᴀɴ', 'bayan', 'BAYAN', 'Bayan'],
};

exports.help = {
  name: 'teyit-kız',
  description: 'Kullanıcı İçin Lianslı Rolünü Verir.',
  usage: 'bayan'
};
