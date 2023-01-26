
const getFormattedPriceVND = (price = 0, currency = "VND") => {
    var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    });
    const formattedPrice = formatter.format(price);
    return formattedPrice;
};
const getFormattedPriceUSD = (price = 0, currency = "USD") => {
    var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    });
    const formattedPrice = formatter.format(price);
    return formattedPrice;
};

const convertDateToDateTime = (date) => {
    return new Date(date).toLocaleString().split('T')[0];
};

export { getFormattedPriceVND, getFormattedPriceUSD, convertDateToDateTime };