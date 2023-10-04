function handleHello(ctx) {
    const chatId = ctx.update.message.chat.id
    if (chatId === Number(process.env.GROUP_ID)) {
        try {
            ctx.deleteMessage()
            ctx.reply(`Привет ${ctx.update.message.from.first_name}`)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = {handleHello}
