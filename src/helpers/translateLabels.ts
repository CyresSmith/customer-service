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
        case 'comments':
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
        case 'price':
            return 'Вартість';
        case 'type':
            return 'Тип';
        case 'status':
            return 'Статус';
        case 'servicesCount':
            return 'Кількість послуг';
        case 'register':
            return 'Реєстрація';
        case 'balance':
            return 'Баланс';
        case 'responsible':
            return 'Відповідальний';
        case 'isActive':
            return 'Активність';
        case 'updatedAt':
            return 'Останнє оновлення';
        case 'createdAt':
            return 'Сторено';
        case 'income':
            return 'Доходи';
        case 'expense':
            return 'Витрати';
        case 'change':
            return 'Зміна залишку';
        case 'moving':
            return 'Переміщення';
        case 'isEvent':
            return 'Додати запис';
        case 'amount':
            return 'Сума, грн';
        case 'time':
            return 'Час';

        default:
            break;
    }
};
