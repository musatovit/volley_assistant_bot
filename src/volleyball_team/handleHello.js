async function handleHello(ctx) {
    const chatId = ctx.update.message.chat.id
        try {
            ctx.deleteMessage()
        ctx.reply(`Привет ${ctx.update.message.from.first_name}`)
           await ctx.answerCbQuery(`Привет ${ctx.update.message.from.first_name}`)
        } catch (e) {
            console.log(e)
        }
    
}

module.exports = {handleHello}