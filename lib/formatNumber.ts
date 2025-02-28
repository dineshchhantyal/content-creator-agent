const formatNumber = (num: string): string => {
  const number = parseInt(num.replace(/[^\d]/g, ""), 10);

  if (isNaN(number)) return "0";

  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return number.toString();
};

export default formatNumber;
