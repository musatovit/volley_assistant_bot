const editText = require("./utils/editText");
require("../global")

async function actionVolleyballTeam(action, ctx) {
    try {
        const date = ctx.update.callback_query.message.text.match(/\d{2}[.]\d{2}[ ][а-я]*/g)[0];
        await ctx.answerCbQuery(`Вы нажали кнопку ${action}`);
        const text = await editText(ctx.update.callback_query, list[date], players)
        await ctx.editMessageText(text, list[`btn${date}`])
    } catch (e)  {
        console.log(e)
    }

}

module.exports = {actionVolleyballTeam}
