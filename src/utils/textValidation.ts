export const rules = {
  required: (value: string) => !!value || 'Поле обязательно',
  lengthPass: (password: string) => {
    return password.length >= 6 || 'Увеличьте длину пароля'
  },
  lengthNickname: (nick: string) => {
    return nick.length >= 6 || 'Увеличьте длину никнейма'
  },
  lengthTag: (tag: string) => {
    return tag.length >= 6 || 'Минимальная длина 6 символов'
  },
  onlyDigitOrLetterPass: (password: string) => {
    return /[A-z,a-z]/.test(password) && /\d/.test(password) || 'Добавьте буквы и цифры'
  }
}