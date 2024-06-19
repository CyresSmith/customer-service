export const numberToCurrency = (
    value: number,
    locale: string = 'uk-UA',
    currency: string = 'Uah'
) =>
    new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(value);
