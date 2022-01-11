import React, { useEffect, useState } from 'react';
// import { data } from '../../../data';
import fetchData from './api/getEvents'
import moment from 'moment';
import _ from 'lodash';
import Form from './components/form'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';


// pick a date util library
import MomentUtils from '@date-io/moment';

function fmtDate(date) {
  return moment(date).format("dddd Do MMM, h:mm A");
}
const sortedData = (data) => {
 return _.orderBy(data, ['exposure_time_from'], ['desc']);
} 

const newPost = (date) => {
  return moment(date).isAfter(moment().subtract(3, 'days'));
}

const App = () => {
  const [sites, setSite] = useState([])
  
  useEffect( () => {
    async function getData() {
            const data = await fetchData();
            console.log('dsds',data);
            setSite(data)
    }
  getData();

   }, [])

 console.log(sites)
  return <>
  <MuiPickersUtilsProvider utils={MomentUtils}>
  <div className='container'>
  <h1>Exposure Sites</h1>
  <Form/>
  
  
  {
    
    (sortedData(sites)||[]).map((site, i) => {
      
      const {type, address_line1, suburb, exposure_time_from, exposure_time_to, posted_time} = site;
      console.log(site);
      return (
    
        <div className="event-container" key={i}>
          <h4>{newPost(posted_time) === true && <span style={{color: "red"}}>POSTED: {moment(posted_time).fromNow()}</span>}</h4>
          <h4 >Place: {type}</h4>
          <p >Address: {address_line1}</p>
          <p >Suburb: {suburb}</p>
          <p>from {fmtDate(exposure_time_from)} to {fmtDate(exposure_time_to)}</p>
        </div>



      )
    })
  }
  </div>
  </MuiPickersUtilsProvider>
  </>;
};

export default App;

