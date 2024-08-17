export const roundToDecimalPlaces = (number, decimalPlaces) => {
  if (!number) return 0;
  if (decimalPlaces < 0) return 0;

  const roundedResult = number.toFixed(decimalPlaces);
  if (roundedResult.indexOf('.') !== -1 && parseFloat(roundedResult) % 1 === 0) {
    return parseInt(roundedResult, 10);
  } else {
    return parseFloat(roundedResult);
  }
};
