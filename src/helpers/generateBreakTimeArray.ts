const generateBreakTimeArray = () => {
  const times = [];

  for (let minutes = 5; minutes <= 60; minutes += 5) {
    times.push(`${minutes} хв.`);
  }

  return times;
};

export default generateBreakTimeArray;
