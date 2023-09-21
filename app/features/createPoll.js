function createPoll(teams, list) {
    const poll = {
        name: teams[0],
        options: teams[1],
        votes: {},
    }

    list = {
        date: teams[0],
        teams: []
    }

    list.teams = teams[1].map(el => ({[el]: []}))

    list.teams.push({['Без меня']: []})

    const buttons = teams[1].map((option) => ({
        text: option,
        callback_data: option,
    }));
    const buttonNo = [{
        text: 'Без меня',
        callback_data: 'Без меня'
    }]

    return [poll, buttons, buttonNo, list]
}

module.exports = createPoll
