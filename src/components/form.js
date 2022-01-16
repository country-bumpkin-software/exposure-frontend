import React ,{useState}from 'react';

import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import postData from '../api/postEvent'
import MomentUtils from '@date-io/moment';
import TextField from '@mui/material/TextField';
import moment from 'moment'

const Form = ({setSite, sites}) => {
    const [place, setPlace] = useState('');
    const [address, setAddress] = useState('');
    const [suburb, setSuburb] = useState('');
    const [postcode, setPostcode] = useState('');

    const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
    const [selectedDateTo, setSelectedDateTo] = useState(new Date());
    
    // const handleDateFromChange = () => {
    //     console.log("handle date from change ", date);
    //     setSelectedDateFrom(()=> {
    //         {
    //             setSelectedDateFrom(...selectedDateFrom, date)}})
    //   }

    // const handleDateToChange = (date) => {
    //     console.log("handle date to change ", date);
    //     setSelectedDateTo(date)
    // }
    const handleSubmit = (e) => {
        e.preventDefault()
        postData(e.target);
        console.log("e", e);
        const from = moment(e.target[4].value, "MMMM Do hh:mm a")
        const to = moment(e.target[5].value, "MMMM Do hh:mm a")
        console.log("from, to: ",from, to);
        const newSite =  {type:place, address_line1: address, suburb, postcode, exposure_time_from: from, exposure_time_to:to}
        setSite(()=> {
            return [...sites, newSite]
        })
    }

    return (
        <article>
        <form onSubmit={handleSubmit} className="form">
            <div className='form-control'>
            <label htmlFor='place'>Place:</label>
            <input type='text' id='place' 
                name='place' 
                value={place} 
                onChange={(e) =>setPlace(e.target.value)}
                />
            </div>
            <div className='form-control'>
            <label htmlFor='addressLine1'>Address</label>
            
            <input value={address} onChange={(e) =>setAddress(e.target.value)} type='text' id='addressLine1' name='addressLine1'></input>
            </div>
            
            <div className='form-control'>
            <label htmlFor='suburb'>Suburb:</label>
            <input onChange={(e) =>setSuburb(e.target.value)}
            value={suburb}
            type='text' id='suberb' name='suberb'></input>
            </div>
            
            <div className='form-control'>
            <label htmlFor='postcode'>Postcode:</label>
            <input value={postcode} onChange={(e) =>setPostcode(e.target.value)}
            type='text' id='postcode' name='postcode'></input>
            </div>
            
            <div className='form-control'>
            <label htmlFor='dateFrom'>Date from:</label>
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker  renderInput={(props) => <TextField {...props} />} value={selectedDateFrom} onChange={(newValue) => {
          setSelectedDateFrom(newValue);
        }}/>
            </MuiPickersUtilsProvider>
            </div>
            
            <div className='form-control'>
            <label htmlFor='dateTo'>Date to:</label>
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker  renderInput={(props) => <TextField {...props} />} value={selectedDateTo} onChange={(newValue) => {
          setSelectedDateTo(newValue);
        }}/>
            </MuiPickersUtilsProvider>
            </div>
            
            <div>
            <button type='submit' className="btn" >Add site</button>
            </div>
        </form>
        </article>
    );
}

export default Form;