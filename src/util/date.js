export const brDate = (date) => {
  return(date.substring(8,10) + '/' + date.substring(5,7) + '/' + date.substring(0,4)
  + ' ' + date.substring(11,13) + ':' + date.substring(14,16) + ':' + date.substring(17,19));
}