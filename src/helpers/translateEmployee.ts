const translateEmployee = (name: string) => {
  switch (name) {
    case 'owner':
      return 'Власник';

    case 'working':
      return 'Працює';

    default:
      break;
  }
};

export default translateEmployee;
