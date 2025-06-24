

const currencySymbols = {
  USD: "$",
  NGN: "₦",
  GBP: "£",
  CAD: "C$",
  EUR: "€",
  JPY: "¥",
  AUD: "A$",
  INR: "₹",
  // Add more as needed
};

export function getCurrencySymbol(currencyCode) {
  return currencySymbols[currencyCode] || currencyCode;
}
