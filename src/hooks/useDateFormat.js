const useDateFormat = () => {
  const dateFormatter = (date) => {
    const offset = new Date().getTimezoneOffset();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours() - offset / 10;
    let minutes = date.getMinutes();
    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return [dateFormatter];
};

export default useDateFormat;
