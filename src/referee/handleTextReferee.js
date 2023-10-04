const {Markup} = require("telegraf");
const {getText} = require("./utils/getText");
require('dotenv').config()
require('../global')

function handleTextReferee(ctx) {
    const chatId = ctx.update.message.chat.id
    if ((chatId === Number(process.env.GROUP_MEN_ID)) || (chatId === Number(process.env.GROUP_WMN_ID))) {
        ctx.deleteMessage()
        ctx.session = ctx.session || {}
        ctx.session.schedule= ctx.session.schedule || {
            date: ctx.update.message.text.split(' ')[1] || `Голосование:`,
            Понедельник: [],
            Вторник: [],
            Среда: [],
            Четверг: [],
            Пятница: [],
            Суббота: [],
            Воскресенье: [],
        }
        schedule[chatId] = ctx.session.schedule

        ctx.session.inlineKeyboard = Markup.inlineKeyboard([
            [Markup.button.callback('Пн', 'Понедельник'), Markup.button.callback('Вт', 'Вторник')],
            [Markup.button.callback('Ср', 'Среда'), Markup.button.callback('Чт', 'Четверг'), Markup.button.callback('Пт', 'Пятница')],
            [Markup.button.callback('Сб', 'Суббота'), Markup.button.callback('Вс', 'Воскресенье')]
        ]).resize(true)
        schedule[`btn${chatId}`] = ctx.session.inlineKeyboard
        ctx.replyWithHTML(getText(ctx.session.schedule), ctx.session.inlineKeyboard);
        setTimeout(()=>{
            ctx.deleteMessage(ctx.update.message.message_id+1)
        }, 1000*60*60*24)
    }
}

module.exports = {handleTextReferee}
