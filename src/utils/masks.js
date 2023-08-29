import Masker from 'vanilla-masker'

export const maskCnpj = (value) =>
  value ? Masker.toPattern(value, '99.999.999/9999-99') : ''