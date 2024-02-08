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
        case 'comments':
            return 'Коментар';
        default:
        break;
    }
};