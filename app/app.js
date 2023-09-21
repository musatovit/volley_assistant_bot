const TelegramBot = require('node-telegram-bot-api');
const checkMessage = require("./features/checkMessage");
const createPoll = require("./features/createPoll");
const editText = require("./features/editText");


const token = '6308166992:AAE_d-2vaDGTI7CYFiCgqum4gVdo3TBMMnM'

const bot = new TelegramBot(token, { polling: true });

let list = {}
const players = [
    {
        id: 345160098,
        name: 'Храмцов'
    },
    {
        id: 381622568,
        name: 'Логунов'
    },
    {
        id: 320693517,
        name: 'Казанин'
    },
    {
        id: 1980130201,
        name: 'Шипа'
    },
]
let idMsgPoll

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(chatId)
    switch (chatId) {
        case 284292211:
            console.log(1)
            break
        case -1001613162697:
            const teams = checkMessage(msg.text)
            if (teams !== null) {
                if (idMsgPoll) {
                    bot.deleteMessage(chatId, idMsgPoll)
                        .then(() => {
                            console.log('Сообщение удалено успешно.');
                        })
                        .catch((error) => {
                            console.error('Ошибка при удалении сообщения:', error.response.body);
                        });
                    idMsgPoll = msg.message_id + 1
                } else {
                    idMsgPoll = msg.message_id + 1
                }
                const [poll, buttons, buttonNo, listTeam] = createPoll(teams, list)
                list = listTeam
                bot.sendMessage(chatId, `---${poll.name}--- \n\n`, {
                    reply_markup: {
                        inline_keyboard: [buttons, buttonNo],
                    },
                }).then(()=>{
                    bot.sendMessage(chatId, `
                   ---${list.date}---\n${list.teams.map(el=>Object.keys(el)[0]).join('\n')}
                `)
                })
            }
            break
    }
})

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    if (chatId === -1001613162697) {
        const newText = editText(query, list, players)

        bot.editMessageText(newText, {
            chat_id: chatId,
            message_id: query.message.message_id+1,
        })
            .then(() => {
                console.log('Сообщение успешно отредактировано.');
            })
            .catch((error) => {
                console.error('Ошибка при редактировании сообщения:', error.response.body);
            });
    }
})

console.log('Бот запущен');
