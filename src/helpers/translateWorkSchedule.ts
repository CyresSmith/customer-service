const translateWorkSchedule = (name: string) => {
  switch (name) {
    case 'monday':
      return 'Понеділок';

    case 'tuesday':
      return 'Вівторок';

    case 'wednesday':
      return 'Середа';

    case 'thursday':
      return 'Четвер';

    case 'friday':
      return "П'ятниця";

    case 'saturday':
      return 'Субота';

    case 'sunday':
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
