import axios from 'axios';

const fetchData = async () => {
    const response = await axios.get('http://localhost:3030/events')

    return response.data
  } 

  export default fetchData