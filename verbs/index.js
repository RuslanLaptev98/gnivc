const definitions = require('./definitions')
const functions = require('./functions')

const verbModifier = (verb, pronoun) => {
    // Проверка на строку
    if (!functions.checkString(verb)) return 'Глагол должен быть строкой'
    if (!functions.checkString(pronoun))
        return 'Местоимение должно быть строкой'

    // Приведение к нижнему регистру
    verb = verb.toLowerCase()
    pronoun = pronoun.toLowerCase()

    // Проверка на инфинитив
    if (!functions.checkInfinitive(verb)) return 'Передайте инфинитив глагола'

    // Проверка спряжения
    const conjugation = functions.setConjugation(
        verb,
        definitions.firstConjugationExceptions,
        definitions.secondConjugationExceptions
    )

    // Отрезаем конечный суффикс глагола
    verb = verb.split(/[ие]?ть/)[0]

    // Соединяем строку
    const result = functions.joinString(pronoun, verb, conjugation)

    return result
}

console.log(verbModifier('бегать', 'ты'))
