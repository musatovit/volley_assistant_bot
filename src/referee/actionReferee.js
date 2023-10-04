const {getName} = require("./utils/getName");
require('../global')
const {getText} = require("./utils/getText");
function actionReferee(action, ctx) {
    ctx.answerCbQuery(`Вы нажали на ${action}`);
    const chatId = ctx.update.callback_query.message.chat.id
    const name = getName(ctx, players)
    schedule[chatId][action].some(el=> el === name)
        ? schedule[chatId][action] = schedule[chatId][action].filter(el=>el!==name)
        : schedule[chatId][action].push(name)
    ctx.editMessageText(getText(schedule[chatId]), schedule[`btn${chatId}`])
}

module.exports = {actionReferee}
