const convertMonth = (month) => {
  const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
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

const printNote = (note) => {
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

module.exports = {
  getFormattedDate,
  printNote,
  convertMonth,
  formatTime
};