const TelegramBot = require('node-telegram-bot-api');
const checkMessage = require("./features/checkMessage");
const createPoll = require("./features/createPoll");
const editText = require("./features/editText");
const getText = require("./features/getText");
const getName = require("./features/getName");
require('dotenv').config()



const token = process.env.TOKEN

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
const scheduleMen = {
    date: '',
    Понедельник: [],
    Вторник: [],
    Среда: [],
    Четверг: [],
    Пятница: [],
    Суббота: [],
    Воскресенье: [],
    msgId: null
}
const scheduleWmn = {
    date: '',
    Понедельник: [],
    Вторник: [],
    Среда: [],
    Четверг: [],
    Пятница: [],
    Суббота: [],
    Воскресенье: [],
    msgId: null
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(chatId)
    switch (chatId) {
        case Number(process.env.CHAT_ID):
            break
        case Number(process.env.GROUP_ID):
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
                setInterval(()=> {
                    idMsgPoll = null
                    bot.deleteMessage(chatId, msg.message_id+1)
                        .then(() => {
                            console.log('Сообщение удалено успешно.');
                        })
                        .catch((error) => {
                            console.error('Ошибка при удалении сообщения:', error.response.body);
                        });
                },1000*60*15)
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
    if (chatId === Number(process.env.GROUP_ID)) {
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
    if (chatId === Number(process.env.GROUP_MEN_ID)) {
        const name = getName(query, players)
        scheduleMen[query.data].some(el=> el === name)
            ? scheduleMen[query.data] = scheduleMen[query.data].filter(el=>el!==name)
            : scheduleMen[query.data].push(name)
        bot.editMessageText(getText(scheduleMen), {
            chat_id: chatId,
            message_id: scheduleMen.msgId+2,
        })
            .then(() => {
                console.log('Сообщение успешно отредактировано.');
            })
            .catch((error) => {
                console.error('Ошибка при редактировании сообщения:', error.response.body);
            });
    }
    if (chatId === Number(process.env.GROUP_WMN_ID)) {
        const name = getName(query, players)
        scheduleWmn[query.data].some(el=> el === name)
            ? scheduleWmn[query.data] = scheduleMen[query.data].filter(el=>el!==name)
            : scheduleWmn[query.data].push(name)
        bot.editMessageText(getText(scheduleWmn), {
            chat_id: chatId,
            message_id: scheduleWmn.msgId+2,
        })
            .then(() => {
                console.log('Сообщение успешно отредактировано.');
            })
            .catch((error) => {
                console.error('Ошибка при редактировании сообщения:', error.response.body);
            });
    }
})

bot.onText(/\/poll (.+)/, (msg, match)=>{
    const chatId = msg.chat.id
    const firstLineBtn = [
        {
            text: `         Пн         .`,
            callback_data: 'Понедельник'
        }, {
            text: `         Вт         .`,
            callback_data: 'Вторник'
        },
    ]
    const secondLineBtn = [
        {
            text: 'Ср',
            callback_data: 'Среда'
        }, {
            text: 'Чт',
            callback_data: 'Четверг'
        }, {
            text: 'Пт',
            callback_data: 'Пятница'
        },
    ]
    const thirdLineBtn = [
        {
            text: 'Сб',
            callback_data: 'Суббота'
        }, {
            text: 'Вс',
            callback_data: 'Воскресенье'
        },
    ]
    if (chatId === Number(process.env.GROUP_MEN_ID)) {
        scheduleMen.date = match[1]
        scheduleMen.msgId = msg.message_id
        bot.sendMessage(chatId, match[1], {
            reply_markup: {
                inline_keyboard: [firstLineBtn, secondLineBtn, thirdLineBtn],
            },
        }).then(() => {
            bot.sendMessage(chatId, getText(scheduleMen))
        })
    }
    if (chatId === Number(process.env.GROUP_WMN_ID)) {
        scheduleWmn.date = match[1]
        scheduleWmn.msgId = msg.message_id
        setInterval(()=> {
            bot.deleteMessage(chatId, msg.message_id+1)
                .then(() => {
                    console.log('Сообщение удалено успешно.');
                })
                .catch((error) => {
                    console.error('Ошибка при удалении сообщения:', error.response.body);
                });
        },1000*60*60*24)
        bot.sendMessage(chatId, match[1], {
            reply_markup: {
                inline_keyboard: [firstLineBtn, secondLineBtn, thirdLineBtn],
            },
        }).then(() => {
            bot.sendMessage(chatId, getText(scheduleWmn))
        })
    }
})

console.log('Бот запущен');
