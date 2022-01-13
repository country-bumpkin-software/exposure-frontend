import moment from 'moment';
import _ from 'lodash'

export function fmtDate(date) {
    return moment(date).format("dddd Do MMM, h:mm A");
  }
 export  const sortedData = (data) => {
   return _.orderBy(data, ['exposure_time_from'], ['desc']);
  } 
  
 export  const newPost = (date) => {
    return moment(date).isAfter(moment().subtract(3, 'days'));
  }