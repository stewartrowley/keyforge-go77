import axios from 'axios';
const keyforgeClient = axios.create(
   {
      baseURL: 'http://localhost:7050'
   }
)
const keyforgeApiClient = axios.create(
   {
      baseURL: 'https://www.keyforgegame.com/api/decks'
   }
)
export default {
   async GetClientDecks (deckId) {
      return await keyforgeApiClient.get('/' + deckId +'/?links=cards')
   },
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
   },
   async GetMatchesById (deckId) {
      return await keyforgeClient.get('/event/' +  deckId)
   },
   async GetEventMatches (event) {
      return await keyforgeClient.get('/event/' + event)
   },
   async PostDeck (deck) {
      return await keyforgeClient.post('/deck', deck)
   },
   async PostCard (card) {
      return await keyforgeClient.post('/card', card)
   },
   async PostHouse (house) {
      return await keyforgeClient.post('/house', house)
   },
   async PostSet (set){
      return await keyforgeClient.post('/set', set)
   },
   async PostEvent (event) {
      return await keyforgeClient.post('./event', event)
   } 
}