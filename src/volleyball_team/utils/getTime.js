function getTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0'); // Переводим часы в строку и добавляем ведущий ноль при необходимости
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Переводим минуты в строку и добавляем ведущий ноль при необходимости
    return hours + ':' + minutes;
}

module.exports = getTime
