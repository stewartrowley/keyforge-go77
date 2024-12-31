import axios from 'axios';
const keyforgeClient = axios.create(
   {
      baseURL: 'http://localhost:8080'
   }
)
export default {
   async GetCards () {
      return await keyforgeClient.get('/card');
   },
   async GetDecks () {
      return await keyforgeClient.get('/deck');
   },
   async GetHouses () {
      return await keyforgeClient.get('/house')
   },
   async GetSets () {
      return await keyforgeClient.get('/set')
   }
}