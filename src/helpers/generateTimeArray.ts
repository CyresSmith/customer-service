const generateTimeArray = () => {
  const times = [];

  for (let hours = 0; hours <= 24; hours++) {
    if (hours === 24) {
      times.push('24:00');
    } else {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        times.push(`${formattedHours}:${formattedMinutes}`);
      }
    }
  }

  return times;
};

export default generateTimeArray;
