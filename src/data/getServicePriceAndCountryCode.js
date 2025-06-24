

export const getFormattedPrice = (prices, countryCode) => {
  // Find the price object for the given country code, fallback to 'NG'
  const price =
    prices.find((p) => p.countryCode === countryCode) ||
    prices.find((p) => p.countryCode === "NG");

  // Return formatted price as "CURRENCY VALUE" (e.g., "NGN 15000" or "USD 150")
  return `${price.currency} ${price.value}`;

  // Optional: Use Intl.NumberFormat for polished formatting (e.g., "₦15,000.00")
  /*
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
  }).format(price.value);
  */
};
