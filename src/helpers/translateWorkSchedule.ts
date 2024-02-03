const translateWorkSchedule = (id: number | 'from' | 'to') => {
  switch (id) {
    case 1:
      return 'Понеділок';

    case 2:
      return 'Вівторок';

    case 3:
      return 'Середа';

    case 4:
      return 'Четвер';

    case 5:
      return "П'ятниця";

    case 6:
      return 'Субота';

    case 7:
      return 'Неділя';

    case 'from':
      return 'з';

    case 'to':
      return 'до';

    default:
      break;
  }
};

export default translateWorkSchedule;
