

export const formatCurrency = (amount: number, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, { 
            style: 'currency', 
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0, })
        .format(amount);
};

export const formatDate = (date: string | Date, locale = 'en-US') => {
    return new Intl.DateTimeFormat(locale, { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' })
        .format(new Date(date));
};

export const getYearFromDate = (date: string | Date) => {
    return String(new Date(date).getFullYear());
};