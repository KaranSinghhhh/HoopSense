import mysql.connector
import requests
import json
import csv




per_mode = "Per Game"
season_id = "2023-24"
team_info_url = f"https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&Height=&ISTRound=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&{per_mode}=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season={season_id}&SeasonSegment=&SeasonType=Regular%20Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision="

# Define necessary headers
headers = {
   'Connection': 'keep-alive',
   'Accept': 'application/json, text/plain, */*',
   'x-nba-stats-token': 'true',
   'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS like Mac OS X) AppleWebKit (KHTML, like Gecko) Version Mobile Safari',
   'x-nba-stats-origin': 'stats',
   'Sec-Fetch-Site': 'same-origin',
   'Sec-Fetch-Mode': 'cors',
   'Referer': 'https://stats.nba.com/',
   'Accept-Encoding': 'gzip, deflate, br',
   'Accept-Language': 'en-US,en;q=0.9',
}



#Fetching Data from nba API
try:
   response = requests.get(url=team_info_url, headers=headers)
   data = response.json()
   with open('nba_team_2023_24.json', 'w') as file:
       json.dump(data, file, indent=4)
except requests.RequestException as e:
   print("Request failed:", e)
   exit(1)  # Exit if the request fails
  

try:
   teams_data = data['resultSets'][0]['rowSet']
   players_count = len(teams_data)
   print(players_count)
  
   all_players_data = []  # Initialize an empty list to store all teams' data
   for team_data in teams_data:
       all_players_data.append(team_data)  # Append each team's data to the list
except KeyError as e:
   print("Error parsing data:", e)
   exit(1)

