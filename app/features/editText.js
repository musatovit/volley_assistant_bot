const getTime = require("./getTime");

function editText(query, list, players) {
    let name
    if (query.from['last_name']) {
        name = query.from['last_name']
    } else {
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
    return `---${list.date}---\n${list.teams.map(el => {
        return `${Object.keys(el)}:\n${Object.values(el).join('\n').split(',').join('\n')}\n`
    }).join('\n')}`
}

module.exports = editText
