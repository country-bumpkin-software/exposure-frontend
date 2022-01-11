import React ,{useState}from 'react';

import { DateTimePicker } from '@material-ui/pickers'
import postData from '../api/postEvent'
const Form = () => {
    const [place, setPlace] = useState('');
    const [address, setAddress] = useState('');
    const [suburb, setSuburb] = useState('');
    const [postcode, setPostcode] = useState('');

    const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
    const handleDateFromChange = (date) => {
        setSelectedDateFrom(date)
      }

    const [selectedDateTo, setSelectedDateTo] = useState(new Date());
    const handleDateToChange = (date) => {
        console.log("handle time chanfge");
        setSelectedDateTo(date)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        postData(e.target);
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
            <DateTimePicker value={selectedDateFrom} onChange={handleDateFromChange}/>
            </div>
            
            <div className='form-control'>
            <label htmlFor='dateTo'>Date to:</label>
            <DateTimePicker  value={selectedDateTo} onChange={handleDateToChange}/>
            </div>
            
            <div>
            <button type='submit' className="btn" >Add site</button>
            </div>
        </form>
        </article>
    );
}

export default Form;