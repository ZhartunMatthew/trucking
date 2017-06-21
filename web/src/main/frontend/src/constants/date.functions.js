export function getDateString(date) {
  if (date === undefined) {
    date = new Date();
  } else {
    date = new Date(date);
    let day = 24 * 60 * 60  * 1000;
    date = new Date(date.getTime() + day);
  }
  let formattedDate = ('0' + date.getDate()).slice(-2);
  let formattedMonth = ('0' + (date.getMonth() + 1)).slice(-2);
  let formattedYear = date.getFullYear().toString();
  return formattedYear + '-' + formattedMonth + '-' + formattedDate;
}

export function reformatDate(date) {
  if (date === null || date === undefined || date.length < 2) {
    return '';
  }
  let tempDate = getDateString(date);

  if (new Date(tempDate).getTime() >= new Date().getTime()) {
    return getDateString(undefined);
  } else {
    return tempDate;
  }
}
