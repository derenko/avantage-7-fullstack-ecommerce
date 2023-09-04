const cf = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const currency = (number: number) => cf.format(number);

const addLeadingZero = (num: number) => {
  return num <= 9 ? "0" + num : num;
};

const date = (timestamp) => {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.getMonth();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${addLeadingZero(day)}.${addLeadingZero(month)} ${hours}:${minutes}`;
};

export const format = {
  date,
  currency,
};
