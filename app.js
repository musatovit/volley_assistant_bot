const { Telegraf, Markup, session} = require('telegraf');
const {handleText} = require('./src/handleText')
const {actions} = require("./src/actions");
const {handleTextReferee} = require("./src/referee/handleTextReferee");
const ngrok = require('ngrok');
const {handleHello} = require("./src/volleyball_team/handleHello");
require('dotenv').config()

const bot = new Telegraf(process.env.TOKEN);

bot.use(session())

bot.use(async (ctx, next) => {
    const start = Date.now()
    await next() // передать управление следующему middleware
    const duration = Date.now() - start
    console.log(`Обработка запроса заняла ${duration} мс`)
})

bot.action(actions)

bot.command('poll', handleTextReferee)
bot.command('hello', handleHello)

bot.on('text', handleText);

bot.launch({
    webhook: {
        domain: 'https://92.51.39.116',
        port: 3000
    }
});

