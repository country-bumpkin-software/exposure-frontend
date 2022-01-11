import axios from 'axios'
import moment from 'moment';

const postData = (data) => {
    
const place = data[0].value.toLowerCase();
const address = data[1].value.toLowerCase();
const suburb = data[2].value.toLowerCase();
const postcode = data[3].value.toLowerCase();
const time_from = moment(data[4].value, "MMMM DDDo hhmm A").format('YYYY-MM-DDTHH:mm:ss');
console.log(data[4].value);
const time_to = moment(data[5].value, "MMMM DDDo hhmm A").format('YYYY-MM-DDTHH:mm:ss');
// 2022-01-01T05:40:00
const posted = moment().format('YYYY-MM-DDTHH:mm:ss');
console.log(place, suburb, postcode, time_to, time_from, posted);
axios.post('https://exposure-api.onrender.com/events', 
{
    "type": place,
    "address_line1": address,
    suburb,
	postcode,
    "exposure_time_from": time_from,
    "exposure_time_to": time_to,
    "posted_time": posted
  }
  )
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
  export default postData
