const translateWorkSchedule = (id: number | 'from' | 'to', short?: boolean) => {
  switch (id) {
    case 1:
      return short ? 'Пн' : 'Понеділок';

    case 2:
      return short ? 'Вт' : 'Вівторок';

    case 3:
      return short ? 'Ср' : 'Середа';

    case 4:
      return short ? 'Чт' : 'Четвер';

    case 5:
      return short ? 'Пт' : "П'ятниця";

    case 6:
      return short ? 'Сб' : 'Субота';

    case 0:
      return short ? 'Нд' : 'Неділя';

    case 'from':
      return 'з';

    case 'to':
      return 'до';

    default:
      break;
  }
};

export default translateWorkSchedule;
