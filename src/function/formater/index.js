
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

const isValidEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phoneNumber);
};

export {
    getFormattedPriceVND,
    getFormattedPriceUSD,
    convertDateToDateTime,
    isValidEmail,
    isValidPhoneNumber
};