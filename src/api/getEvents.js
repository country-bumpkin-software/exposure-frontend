import axios from 'axios';

const fetchData = async () => {
    const response = await axios.get('https://exposure-api.onrender.com/events')

    return response.data
  } 

  export default fetchData
