export const translateSelect = (value: string): string => {
  switch (value) {
    case 'male':
      return 'чоловіча';
    case 'Male':
      return 'чоловіча';
    case 'female':
      return 'жіноча';
    case 'Female':
      return 'жіноча';
    case 'other':
      return 'інше';
    case 'Other':
      return 'інше';

    default:
      return value;
  }
};
