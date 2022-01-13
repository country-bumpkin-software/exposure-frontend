import React, { useEffect, useState } from 'react';
import fetchData from './api/getEvents'
import moment from 'moment';
import _ from 'lodash';
import Form from './components/form'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import {fmtDate, sortedData, newPost} from './utils'

// pick a date util library
import MomentUtils from '@date-io/moment';

const App = () => {
  const [sites, setSite] = useState([])
  const [suburbs, setSuburb] = useState([])

  const [search, setSearch] = useState("");
  const [searchPostcode, setSearchPostcode] = useState("");

  useEffect( () => {
    async function getData() {
        const data = await fetchData();
        setSite(data)
        setSuburb(data)
    }
  getData();

   }, [sites])

  useEffect(() => {
      const filteredSites = sites.filter((site) => search === "" || site.suburb === search)
      setSuburb(filteredSites)
  }, [search, sites])

  useEffect(() => {
    const filteredSites = sites.filter((site) => searchPostcode === "" || site.postcode === searchPostcode)
    setSuburb(filteredSites)
}, [searchPostcode, sites])
 
  return <>
  <MuiPickersUtilsProvider utils={MomentUtils}>
  <div className='container'>
  <h1>Exposure Sites</h1>
  <p>This site takes no liability for the places listed here and was created for educational purposes only.</p>
  <p>The intention of this website is for people who return covid positive from rapid or pcr tests to 
    log their whereabouts when they were active in the community whilst possibly infectious.</p>
  <Form setSite={setSite} sites={sites}/>

<div className='filter-inputs'>
  <form className="form">
    <div className='form-control'>
    <label htmlFor="filter">Suburb</label>
    <input type='text' id='suburbs' name='suburbs'   onChange={(e) => setSearch(e.target.value)} className="form-control" placeholder="enter suburb to filter"></input>
    </div>
  </form>
  <form className="form">
    <div className='form-control'>
    <label htmlFor="filterPostcode">Postcode</label>
    <input type='text' id='postcode' name='postcode'   onChange={(e) => setSearchPostcode(e.target.value)} className="form-control" placeholder="enter postcode to filter"></input>
    </div>
  </form>
</div>

    {
      (sortedData(suburbs)||[]).map((site, i) => {

        const {type, address_line1, suburb, postcode, exposure_time_from, exposure_time_to, posted_time} = site;
        return (
          <div className="event-container" key={i}>
            <h4>{newPost(posted_time) === true && <span style={{color: "red"}}>POSTED: {moment(posted_time).fromNow()}</span>}</h4>
            <h4 >Place: {type}</h4>
            <p >Address: {address_line1}</p>
            <p >Suburb: {suburb}</p>
            <p >Postcode: {postcode}</p>
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

