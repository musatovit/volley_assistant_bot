const TelegramBot = require('node-telegram-bot-api');
const checkMessage = require("./features/checkMessage");
const getTime = require("./features/getTime");
const createPoll = require("./features/createPoll");



const token = '6308166992:AAE_d-2vaDGTI7CYFiCgqum4gVdo3TBMMnM';

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
]

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(chatId)
    switch (chatId) {
        case -1001613162697:
            console.log(1)
            break
        case 284292211:
            const teams = checkMessage(msg.text)
            if (teams !== null) {
                const [poll, buttons, buttonNo, listTeam] = createPoll(teams, list)
                list = listTeam
                bot.sendMessage(chatId, `---${poll.name}--- \n\n`, {
                    reply_markup: {
                        inline_keyboard: [buttons, buttonNo],
                    },
                });
                bot.sendMessage(chatId, `
                   ---${list.date}---\n${list.teams.map(el=>Object.keys(el)[0]).join('\n')}
                `)
            }
            break
    }
})

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    if (chatId === 284292211) {
        // console.log(query.from)
        let name
        if (query.from['last_name']) {
            console.log(query.from)
            name = query.from['last_name']
        } else {
            console.log(query.from)
            players.some(el => el.id === query.from.id)
                ? name = players.find(el => el.id === query.from.id).name
                : name = query.from['first_name']
        }
        list.teams = list.teams.map(el => {
            if (Object.keys(el)[0] === query.data) {
                if (el[query.data].some(str => str.includes(name))) {
                    el[query.data] = el[query.data].filter(str => str.includes(name) !== true)
                } else {
                    el[query.data].push(`${name} (${getTime()})`)
                }
            }
            return el
        })
        const newText = `---${list.date}---\n${list.teams.map(el => {
            return `${Object.keys(el)}:\n${Object.values(el).join('\n').split(',').join('\n')}\n`
        }).join('\n')}`

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
