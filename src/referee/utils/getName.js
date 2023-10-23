function getName(query, players) {
    return players.some(el => el.id === query.from.id)
        ? players.find(el => el.id === query.from.id).name
        : query.from['last_name']
            ? query.from['last_name']
            : query.from['first_name']
}

module.exports = {getName}
