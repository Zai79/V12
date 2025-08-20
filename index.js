const { Client } = require("discord.js-selfbot-v13");
const { joinVoiceChannel } = require("@discordjs/voice");
const express = require("express");

const client = new Client({
  checkUpdate: false, // يمنع التحذير المزعج في اللوغ
});
const app = express();

// ويب سيرفر عشان Render ما يوقف البوت
app.get("/", (req, res) => res.send("✅ Bot is running!"));
app.listen(process.env.PORT || 3000, () =>
  console.log("🌐 Web server running")
);

client.on("ready", async () => {
  console.log(`🤖 Logged in as ${client.user.username}`);

  // IDs لازم تغيرها
  const GUILD_ID = process.env.GUILD_ID; // حط الايدي في بيئة Render
  const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID;

  const guild = client.guilds.cache.get(GUILD_ID);
  const channel = guild.channels.cache.get(VOICE_CHANNEL_ID);

  if (!channel || channel.type !== 2) {
    // 2 = نوع روم صوتي
    return console.log("❌ الروم الصوتي غير صحيح");
  }

  try {
    joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfMute: false,
      selfDeaf: false,
    });
    console.log("✅ دخل الروم الصوتي 24/7");
  } catch (err) {
    console.error("❌ خطأ أثناء محاولة دخول الروم:", err);
  }
});

// التوكن من إعدادات البيئة (Environment Variables)
client.login(process.env.TOKEN);
