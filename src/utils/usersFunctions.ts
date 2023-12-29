export const formateData = (data: string): string => {
  const stringToArray = data.split(" ");

  for (let i = 0; i < stringToArray.length; i++) {
    stringToArray[i] =
      stringToArray[i][0].toUpperCase() +
      stringToArray[i].slice(1).toLowerCase();
  }

  return stringToArray.join(" ");
};
