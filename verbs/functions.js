// Функция проверки на строку
const checkString = (word) => {
    return typeof word === 'string'
}

// Функция проверки на инфинитив
const checkInfinitive = (verb) => {
    return verb.includes('ть')
}

// Функция для спряжения глагола
const setConjugation = (
    verb,
    firstConjugationExceptions,
    secondConjugationExceptions
) => {
    if (firstConjugationExceptions.includes(verb)) return 2
    if (secondConjugationExceptions.includes(verb)) return 1
    return verb.includes('ить') ? 2 : 1
}

// Функция соединения конечной строки
const joinString = (pronoun, verb, conjugation) => {
    // предпоследняя буква для большинства вариантов лица и числа
    const penultLetter = conjugation === 1 ? 'е' : 'и'

    // кейс для третьего лица множественного числа
    const thirdPersonPlural = conjugation === 1 ? 'ю' : 'а'

    switch (pronoun) {
        case 'я':
            return `${pronoun} ${verb}ю`
        case 'ты':
            return `${pronoun} ${verb}${penultLetter}шь`
        case 'он':
        case 'она':
            return `${pronoun} ${verb}${penultLetter}т`
        case 'мы':
            return `${pronoun} ${verb}${penultLetter}м`
        case 'вы':
            return `${pronoun} ${verb}${penultLetter}те`
        case 'они':
            return `${pronoun} ${verb}${thirdPersonPlural}т`
        default:
            return 'Передайте корректное местоимение'
    }
}

module.exports = {
    checkString,
    checkInfinitive,
    setConjugation,
    joinString,
}
