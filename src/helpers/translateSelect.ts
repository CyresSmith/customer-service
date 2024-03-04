export const translateSelect = (value: string): string => {
  switch (value) {
    case 'male':
      return "чоловіча";
    case 'female':
      return 'жіноча';
    case 'other':
      return 'інше';

    default:
      return value;
  }
};
