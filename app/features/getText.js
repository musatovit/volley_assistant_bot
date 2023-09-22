function getText(schedule) {
    return `${schedule.date}\n${Object.keys(schedule).filter(el=>!(el==='date'||el==='msgId')).map((el) => {
        return `${el}\n${schedule[el].join('\n')}`
    }).join('\n')}`
}

module.exports = getText
