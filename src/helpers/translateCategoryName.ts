const translateCategoryName = (name: string) => {
  switch (name) {
    case 'Services':
      return 'Послуги';

    case 'Beauty':
      return 'Краса';

    case 'Healthy':
      return "Здоров'я";

    case 'Sport':
      return 'Спорт';

    case 'Rent':
      return 'Оренда';

    case 'Animals':
      return 'Тваринки';

    case 'Auto':
      return 'Авто';

    case 'Entertainment':
      return 'Розваги';

    case 'Teaching':
      return 'Навчання';

    case 'Lawyers':
      return 'Юристи';

    case 'Style':
      return 'Стиль';

    case 'Restaurants':
      return 'Ресторани';

    case 'Others':
      return 'Інше';

    default:
      break;
  }
};

export default translateCategoryName;
