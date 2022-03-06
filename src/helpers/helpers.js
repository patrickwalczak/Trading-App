export const loadingTimeLimitHandler = (milliseconds = 3000) => {
  if (!isFinite(milliseconds)) milliseconds = 3000;

  return new Promise((_, reject) =>
    setTimeout(() => {
      reject("Problem with internet connection");
    }, milliseconds)
  );
};
