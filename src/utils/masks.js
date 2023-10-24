import Masker from 'vanilla-masker'

export const maskCnpj = (value) =>
  value ? Masker.toPattern(value, '99.999.999/9999-99') : ''


  // const isValidCNPJ = (cnpj) => {
  //   // Remove characters that are not digits
  //   cnpj = cnpj.replace(/\D/g, "");

  //   // CNPJ must have exactly 14 digits
  //   if (cnpj.length !== 14) {
  //     return false;
  //   }

  //   // Validate CNPJ using a checksum algorithm
  //   const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  //   const sum1 = cnpj
  //     .slice(0, 12)
  //     .split("")
  //     .map(Number)
  //     .reduce((acc, digit, index) => acc + digit * weights[index], 0);

  //   const remainder1 = sum1 % 11 < 2 ? 0 : 11 - (sum1 % 11);

  //   if (remainder1 !== Number(cnpj.charAt(12))) {
  //     return false;
  //   }

  //   const sum2 = cnpj
  //     .slice(0, 13)
  //     .split("")
  //     .map(Number)
  //     .reduce((acc, digit, index) => acc + digit * weights[index], 0);

  //   const remainder2 = sum2 % 11 < 2 ? 0 : 11 - (sum2 % 11);

  //   if (remainder2 !== Number(cnpj.charAt(13))) {
  //     return false;
  //   }

  //   return true;
  // };