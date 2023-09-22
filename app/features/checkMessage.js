function checkMessage(input) {
    const dateRegex = /\d{2}[.]\d{2}[ ][а-я]*/g
    const timeCountryRegex = /\d{1,2}[-.:]\d{2}\s[м]\s.*((Bulgaria)|(Argentina))/g;
    const teamsRegex = /(Bulgaria)|(Argentina)/g

    const dates = input.match(dateRegex);

    if (!dates) {
        return null
    }

    try {
            const matches = input.match(timeCountryRegex).map((el) => {
                return el.split(' ').reduce((acc, el) => {
                    if (el.match(teamsRegex)) {
                        acc = acc + ' ' + el.match(teamsRegex)
                    }
                    return acc
                })

            })
        return [dates[0], matches]
    } catch (_) {
        console.log('выходной')
    }
    return null
}


module.exports = checkMessage
