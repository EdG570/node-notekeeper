const convertMonth = (month) => {
  const MONTHS = [
    'Jan', 'Feb', 'March', 'April', 'May', 'June',
    'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return MONTHS[month];
};

const formatTime = (today) => {
 return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
};


const getFormattedDate = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = convertMonth(today.getMonth());
  let yyyy = today.getFullYear();
  let time = formatTime(today);

  return `${mm} ${dd}, ${yyyy} @ ${time}`;
}

module.exports = {
  getFormattedDate
};