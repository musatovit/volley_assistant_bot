const {actionVolleyballTeam} = require("./volleyball_team/actionVolleyballTeam");
const {actionReferee} = require("./referee/actionReferee");
require('dotenv').config()

async function actions(action, ctx) {
    const chatId = ctx.update.callback_query.message.chat.id
    switch (chatId) {
        case Number(process.env.GROUP_ID):
            await actionVolleyballTeam(action, ctx)
            break
        case Number(process.env.GROUP_MEN_ID):
            actionReferee(action, ctx)
            break
        case Number(process.env.GROUP_WMN_ID):
            actionReferee(action, ctx)
            break
    }
}

module.exports = {actions}
