export const translateLabels = (name: string): string | undefined => {
  switch (name) {
    case 'firstName':
      return "ім'я";
    case 'lastName':
      return 'прізвище';
    case 'phone':
      return 'номер телефону';
    case 'email':
      return 'email';
    case 'password':
      return 'пароль';
    case 'confirm':
      return 'підтвердіть пароль';
    case 'code':
      return 'код підтвердження';
    case 'name':
      return 'Назва';
    case 'city':
      return 'Місто';
    case 'address':
      return 'Адреса';
    case 'index':
      return 'Індекс';
    case 'newPassword':
      return 'Новий пароль';
    case 'birthday':
      return 'Дата народження';
    case 'gender':
      return 'Стать';
    case 'discount':
      return 'Знижка';
    case 'card':
      return 'Картка';
    case 'source':
      return 'Джерело';
    case 'comment':
      return 'Коментар';
    case 'jobTitle':
      return 'Посада';
    case 'provider':
      return 'Надає послуги';
    case 'isAdmin':
      return 'Права адміністрування';
    case 'info':
      return 'Додаткова інформація';
    case 'break':
      return 'Перерва';
    case 'desc':
      return 'Опис';
    case 'category':
      return 'Категорія';
    case 'employees':
      return 'Співробітники';
    case 'capacity':
      return 'Місткість';
    case 'capacityLimit':
      return 'Обмежена місткість';
    case 'places':
      return 'Кількість місць для одного клієнта';
    case 'placesLimit':
      return 'Обмеження місць';
    case 'breakDuration':
      return 'Тривалість перерви';
    case 'duration':
      return 'Тривалість';

    default:
      break;
  }
};
