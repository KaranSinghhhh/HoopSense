import mysql.connector
import requests
import json
import sys
import csv
per_mode = "Per Game"
season_id = "2023-24"
team_info_url = f"https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&Height=&ISTRound=&LastNGames=0&LeagueID=00&Location=&MeasureType=Defense&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&{per_mode}=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season={season_id}&SeasonSegment=&SeasonType=Regular%20Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision="

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
   with open('nba_defensive_team_2023_24.json', 'w') as file:
       json.dump(data, file, indent=4)
except requests.RequestException as e:
   print("Request failed:", e)
   exit(1)  # Exit if the request fails
  
try:
   teams_data = data['resultSets'][0]['rowSet']
   teams_count = len(teams_data)
   columns_list = data['resultSets'][0]['headers']

   filename = 'nba_defensive_team_2023_24.csv'

   # Write to CSV
   with open(filename, 'w', newline='') as csvfile:
      csvwriter = csv.writer(csvfile)
      # Write the headers
      csvwriter.writerow(columns_list)
      # Write the data rows
      for team_data in teams_data:
         csvwriter.writerow(team_data)

   print(f"Data successfully written to {filename}")


   print(teams_count)
  
   all_teams_data = []  # Initialize an empty list to store all teams' data
   for team_data in teams_data:
       all_teams_data.append(team_data)  # Append each team's data to the list
except KeyError as e:
   print("Error parsing data:", e)
   sys.exit(1)

try:
   db = mysql.connector.connect(
   host="localhost",
   user="root",
   password="password",
   database="HoopSense"
   )
   mycursor = db.cursor()
except mysql.connector.Error as err:
   print("Database connection failed:", err)
   exit(1)  # Exit the script if DB connection fails


check_query = """
SELECT COUNT(*) FROM TEAMS_DEFENSE_2023_24 WHERE GP > 0;
"""
try:
    mycursor.execute(check_query)
    result = mycursor.fetchone()
    if result[0] > 0:
        print("Error: Data for the 2023-24 defense season already exists. Running this script again will result in duplicate entries.")
        sys.exit(1)  # Exit the script to prevent duplicate runs
except mysql.connector.Error as err:
    print("Error checking existing data:", err)
    mycursor.close()
    db.close()
    sys.exit(1)

columns_list = [
    "TEAM_ID",
    "TEAM_NAME",
    "GP",
    "W",
    "L",
    "W_PCT",
    "MIN",
    "DEF_RATING",
    "DREB",
    "DREB_PCT",
    "STL",
    "BLK",
    "OPP_PTS_OFF_TOV",
    "OPP_PTS_2ND_CHANCE",
    "OPP_PTS_FB",
    "OPP_PTS_PAINT",
    "GP_RANK",
    "W_RANK",
    "L_RANK",
    "W_PCT_RANK",
    "MIN_RANK",
    "DEF_RATING_RANK",
    "DREB_RANK",
    "DREB_PCT_RANK",
    "STL_RANK",
    "BLK_RANK",
    "OPP_PTS_OFF_TOV_RANK",
    "OPP_PTS_2ND_CHANCE_RANK",
    "OPP_PTS_FB_RANK",
    "OPP_PTS_PAINT_RANK"
]

create_table_query = """
    CREATE TABLE IF NOT EXISTS TEAMS_DEFENSE_2023_24 (
    TEAM_ID INT PRIMARY KEY,
    TEAM_NAME VARCHAR(255),
    GP INT,
    W INT,
    L INT,
    W_PCT FLOAT,
    MIN FLOAT,
    DEF_RATING FLOAT,
    DREB INT,
    DREB_PCT FLOAT,
    STL INT,
    BLK INT,
    OPP_PTS_OFF_TOV INT,
    OPP_PTS_2ND_CHANCE INT,
    OPP_PTS_FB INT,
    OPP_PTS_PAINT INT,
    GP_RANK INT,
    W_RANK INT,
    L_RANK INT,
    W_PCT_RANK INT,
    MIN_RANK INT,
    DEF_RATING_RANK INT,
    DREB_RANK INT,
    DREB_PCT_RANK INT,
    STL_RANK INT,
    BLK_RANK INT,
    OPP_PTS_OFF_TOV_RANK INT,
    OPP_PTS_2ND_CHANCE_RANK INT,
    OPP_PTS_FB_RANK INT,
    OPP_PTS_PAINT_RANK INT
);
"""

insert_statement = """
    INSERT INTO TEAMS_DEFENSE_2023_24 (
    TEAM_ID, 
    TEAM_NAME, 
    GP, 
    W, 
    L, 
    W_PCT, 
    MIN, 
    DEF_RATING, 
    DREB, 
    DREB_PCT, 
    STL, 
    BLK, 
    OPP_PTS_OFF_TOV, 
    OPP_PTS_2ND_CHANCE, 
    OPP_PTS_FB, 
    OPP_PTS_PAINT, 
    GP_RANK, 
    W_RANK, 
    L_RANK, 
    W_PCT_RANK, 
    MIN_RANK, 
    DEF_RATING_RANK, 
    DREB_RANK, 
    DREB_PCT_RANK, 
    STL_RANK, 
    BLK_RANK, 
    OPP_PTS_OFF_TOV_RANK, 
    OPP_PTS_2ND_CHANCE_RANK, 
    OPP_PTS_FB_RANK, 
    OPP_PTS_PAINT_RANK
) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
ON DUPLICATE KEY UPDATE 
    TEAM_NAME = VALUES(TEAM_NAME),
    GP = VALUES(GP),
    W = VALUES(W),
    L = VALUES(L),
    W_PCT = VALUES(W_PCT),
    MIN = VALUES(MIN),
    DEF_RATING = VALUES(DEF_RATING),
    DREB = VALUES(DREB),
    DREB_PCT = VALUES(DREB_PCT),
    STL = VALUES(STL),
    BLK = VALUES(BLK),
    OPP_PTS_OFF_TOV = VALUES(OPP_PTS_OFF_TOV),
    OPP_PTS_2ND_CHANCE = VALUES(OPP_PTS_2ND_CHANCE),
    OPP_PTS_FB = VALUES(OPP_PTS_FB),
    OPP_PTS_PAINT = VALUES(OPP_PTS_PAINT),
    GP_RANK = VALUES(GP_RANK),
    W_RANK = VALUES(W_RANK),
    L_RANK = VALUES(L_RANK),
    W_PCT_RANK = VALUES(W_PCT_RANK),
    MIN_RANK = VALUES(MIN_RANK),
    DEF_RATING_RANK = VALUES(DEF_RATING_RANK),
    DREB_RANK = VALUES(DREB_RANK),
    DREB_PCT_RANK = VALUES(DREB_PCT_RANK),
    STL_RANK = VALUES(STL_RANK),
    BLK_RANK = VALUES(BLK_RANK),
    OPP_PTS_OFF_TOV_RANK = VALUES(OPP_PTS_OFF_TOV_RANK),
    OPP_PTS_2ND_CHANCE_RANK = VALUES(OPP_PTS_2ND_CHANCE_RANK),
    OPP_PTS_FB_RANK = VALUES(OPP_PTS_FB_RANK),
    OPP_PTS_PAINT_RANK = VALUES(OPP_PTS_PAINT_RANK);
"""


try:
   mycursor.execute(create_table_query)
   print("Table created successfully or already exists.")
except mysql.connector.Error as err:
   print("Error creating table:", err)
   exit(1)  # Exit if table creation fails
  
try:
   for team_data in all_teams_data:
       mycursor.execute(insert_statement, tuple(team_data))
   db.commit()  # Commit the transaction to save changes
   print(f"Inserted {len(all_teams_data)} records successfully.")
except mysql.connector.Error as err:
   db.rollback()  # Rollback in case of any error during insertion
   print("Error inserting data:", err)
finally:
   mycursor.close()
   db.close()  # Close the database connection
