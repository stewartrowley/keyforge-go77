import { defineStore } from "pinia";
import ApiServices from "@/services/ApiServices";

export const useDeckStore = defineStore('DeckStore', {
   state () {
      return {
         allDecks: null,
         deckGroups: null,
         groups: null,
         filesContent: [],
         parsedData: null
      }
   },
   actions: {
      parseFile (files, event) {
         let matchups = [];
         for (let i = 0; i < files.length; i++) {
            if (files[i]) {
              const reader = new FileReader();
              var fileContent;
              reader.onload = (e) => {
                fileContent = e.target.result;
                const splitContent = fileContent.split('\n');
                  let jsonObj = {
                     _id: null
                  }
               const id = [];
               let teams = [];
               let players = [];
                splitContent.forEach((line) => {
                  if (line.includes('brings')) {
                     var bring = 'brings';
                     const index = line.indexOf(bring);
                     const trimBring = line.substring(index + bring.length).trim();
                     let wordToRemove = "to The Crucible";
                     players.push({player: line.split(" ")[0]});
                     teams.push(trimBring.replace(new RegExp(`\\b${wordToRemove}\\b`, 'gi'), ''));
                     var team = trimBring.replace(new RegExp(`\\b${wordToRemove}\\b`, 'gi'), '');
                     const findId = this.allDecks.find((item) => {
                        if (item.name == team.trim()) {
                           return item;
                        }
                     })
                     id.push(findId);
                  }

                  players.forEach((player, index) => {
                     const findId = this.allDecks.find((item) => item.name == teams[index]);
                     if (line.includes('is first player')) {
                        if (line.includes(player.player)) {
                           jsonObj.away_id = id[index]._id;
                           jsonObj.away_team = teams[index];
                           jsonObj.away_location = 'away';
                           players[index].loc = 'awayTeam';
                        } else {
                           jsonObj.home_id = id[index]._id;
                           jsonObj.home_team = teams[index];
                           jsonObj.home_location = 'home';
                           players[index].loc = 'homeTeam';
                        }
                     } else if (line.includes('chooses to go first')) {
                        if (line.includes(player.player)) {
                           jsonObj.away_id = id[index]._id;
                           jsonObj.away_team = teams[index];
                           jsonObj.away_location = 'away';
                           players[index].loc = 'awayTeam';
                        } else {
                           jsonObj.home_id = id[index]._id;
                           jsonObj.home_team = teams[index];
                           jsonObj.home_location = 'home';
                           players[index].loc = 'homeTeam';
                        }
                     } else if (line.includes('chooses to go second')) {
                        if (line.includes(player.player)) {
                           jsonObj.home_id = id[index]._id;
                           jsonObj.home_team = teams[index];
                           jsonObj.home_location = 'home';
                           players[index].loc = 'homeTeam';
                        } else {
                           jsonObj.away_id = id[index]._id;
                           jsonObj.away_team = teams[index];
                           jsonObj.away_location = 'away';
                           players[index].loc = 'awayTeam';
                        }
                     }
                  })
                })
                splitContent.forEach((line) => {
                  players.forEach((player) => {
                     if (line.includes(player.player + ' ' + 'has won the game')) {
                        jsonObj.home_result = 'win';
                     } else {
                        jsonObj.away_result = 'loss'
                     }
                  })
                })
                jsonObj.event_name = event;
                matchups.push(
                  {
                     deck_id: id[0]._id,
                     ...jsonObj
                  }
                )
                matchups.push(
                  {
                     deck_id: id[1]._id,
                     ...jsonObj
                  }
                )
              };
              reader.readAsText(files[i]);
            }
         }
         console.log(matchups);
         this.parsedData = matchups;
         // this.parsedData = events;
         // console.log(events);
      },
      async postMatches () {
         console.log(this.parsedData);
         await ApiServices.PostEvent(this.parsedData)
         .then((response) => {
            console.log(response);
         })
      },
      async getMatches (deckId) {
         await ApiServices.GetMatchesById(deckId)
         .then((response) => {
            console.log(response.data);
         })
      }
   }
})