const {handleTextVolleyballTeam} = require("./volleyball_team/handleTextVolleyballTeam");


function handleText(ctx) {

    const chatId = ctx.update.message.chat.id
    console.log('handleTxt', chatId)
    switch (chatId) {
        case Number(process.env.GROUP_ID):
            handleTextVolleyballTeam(ctx)
            break
    }
}

module.exports = {handleText}
