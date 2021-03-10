import axios from 'axios';


export default class {
    constructor( ){        
        this.baseURL = 'http://localhost:8080/api/v1/'
    }

    async list( endpoint ){
        const res = await axios.get( this.baseURL + endpoint )        
        return res.data;
    }
    async post( endpoint, data ){
        const res = await axios.post( this.baseURL + endpoint, data )
        return res.data;
    }

    async put( endpoint, data ){
        const res = await axios.put( `${ this.baseURL }${ endpoint }`, data )
        console.log(res)
        return res.data;
    }
}