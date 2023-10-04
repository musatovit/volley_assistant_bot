const {checkMessage} = require("./utils/checkMessage");
const {Markup} = require("telegraf");
require('../global')
 function handleTextVolleyballTeam(ctx) {
    ctx.session = ctx.session || {};
    const teams = checkMessage(ctx.update.message.text)
    if (teams !== null && teams !== 'выходной') {
        list[teams[0]] = {date: teams[0], teams: teams[1].map(team => ({[team]: []}))}
        list[teams[0]].teams.push({['Без меня']: []})
        list[`btn${teams[0]}`] = Markup.inlineKeyboard([
            teams[1].map(team => Markup.button.callback(team, team)),
            [Markup.button.callback('Без меня', 'Без меня')]
        ]).resize()
        const text = `
                   ---${list[teams[0]].date}---\n${list[teams[0]].teams.map(el=>Object.keys(el)[0]).join(':\n')}
                `
        ctx.reply(text, list[`btn${teams[0]}`]);
        setTimeout( ()=> {
            ctx.deleteMessage(ctx.update.message.message_id+1)
        }, 1000*60*15)
    } else if (teams === 'выходной') {
        ctx.sendSticker('CAACAgIAAxkBAAIEQGUTz10xW-DiW9L0G4FqSvYxxxQ6AAK4FQACIpTgS9kgukBBCDutMAQ')
        setTimeout( ()=>{
            ctx.deleteMessage(ctx.update.message.message_id+1)
        }, 1000*60)
    }
}

module.exports = {handleTextVolleyballTeam}
