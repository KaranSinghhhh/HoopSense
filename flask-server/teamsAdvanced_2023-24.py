import mysql.connector
import requests
import json
import sys
import csv
per_mode = "Per Game"
season_id = "2023-24"
team_info_url = f"https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&Height=&ISTRound=&LastNGames=0&LeagueID=00&Location=&MeasureType=Advanced&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&{per_mode}=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season={season_id}&SeasonSegment=&SeasonType=Regular%20Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision="

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
   with open('nba_advanced_team_2023_24.json', 'w') as file:
       json.dump(data, file, indent=4)
except requests.RequestException as e:
   print("Request failed:", e)
   exit(1)  # Exit if the request fails
  
try:
   teams_data = data['resultSets'][0]['rowSet']
   teams_count = len(teams_data)
   columns_list = data['resultSets'][0]['headers']

   filename = 'nba_advanced_team_2023_24.csv'

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
SELECT COUNT(*) FROM PLAYERS_2023_24 WHERE AGE > 0;
"""
try:
    mycursor.execute(check_query)
    result = mycursor.fetchone()
    if result[0] > 0:
        print("Error: Data for the 2023-24 Advanced season already exists. Running this script again will result in duplicate entries.")
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
                "E_OFF_RATING",
                "OFF_RATING",
                "E_DEF_RATING",
                "DEF_RATING",
                "E_NET_RATING",
                "NET_RATING",
                "AST_PCT",
                "AST_TO",
                "AST_RATIO",
                "OREB_PCT",
                "DREB_PCT",
                "REB_PCT",
                "TM_TOV_PCT",
                "EFG_PCT",
                "TS_PCT",
                "E_PACE",
                "PACE",
                "PACE_PER40",
                "POSS",
                "PIE",
                "GP_RANK",
                "W_RANK",
                "L_RANK",
                "W_PCT_RANK",
                "MIN_RANK",
                "OFF_RATING_RANK",
                "DEF_RATING_RANK",
                "NET_RATING_RANK",
                "AST_PCT_RANK",
                "AST_TO_RANK",
                "AST_RATIO_RANK",
                "OREB_PCT_RANK",
                "DREB_PCT_RANK",
                "REB_PCT_RANK",
                "TM_TOV_PCT_RANK",
                "EFG_PCT_RANK",
                "TS_PCT_RANK",
                "PACE_RANK",
                "PIE_RANK"
]

create_table_query = """
CREATE TABLE IF NOT EXISTS TEAMS_ADVANCED_2023_24 (
    TEAM_ID INT,
    TEAM_NAME VARCHAR(100),
    GP INT,
    W INT,
    L INT,
    W_PCT FLOAT,
    MIN FLOAT,
    E_OFF_RATING FLOAT,
    OFF_RATING FLOAT,
    E_DEF_RATING FLOAT,
    DEF_RATING FLOAT,
    E_NET_RATING FLOAT,
    NET_RATING FLOAT,
    AST_PCT FLOAT,
    AST_TO FLOAT,
    AST_RATIO FLOAT,
    OREB_PCT FLOAT,
    DREB_PCT FLOAT,
    REB_PCT FLOAT,
    TM_TOV_PCT FLOAT,
    EFG_PCT FLOAT,
    TS_PCT FLOAT,
    E_PACE FLOAT,
    PACE FLOAT,
    PACE_PER40 FLOAT,
    POSS FLOAT,
    PIE FLOAT,
    GP_RANK INT,
    W_RANK INT,
    L_RANK INT,
    W_PCT_RANK INT,
    MIN_RANK INT,
    OFF_RATING_RANK INT,
    DEF_RATING_RANK INT,
    NET_RATING_RANK INT,
    AST_PCT_RANK INT,
    AST_TO_RANK INT,
    AST_RATIO_RANK INT,
    OREB_PCT_RANK INT,
    DREB_PCT_RANK INT,
    REB_PCT_RANK INT,
    TM_TOV_PCT_RANK INT,
    EFG_PCT_RANK INT,
    TS_PCT_RANK INT,
    PACE_RANK INT,
    PIE_RANK INT
);

"""

insert_statement = """
    INSERT INTO TEAMS_ADVANCED_2023_24 (
    TEAM_ID,
    TEAM_NAME,
    GP,
    W,
    L,
    W_PCT,
    MIN,
    E_OFF_RATING,
    OFF_RATING,
    E_DEF_RATING,
    DEF_RATING,
    E_NET_RATING,
    NET_RATING,
    AST_PCT,
    AST_TO,
    AST_RATIO,
    OREB_PCT,
    DREB_PCT,
    REB_PCT,
    TM_TOV_PCT,
    EFG_PCT,
    TS_PCT,
    E_PACE,
    PACE,
    PACE_PER40,
    POSS,
    PIE,
    GP_RANK,
    W_RANK,
    L_RANK,
    W_PCT_RANK,
    MIN_RANK,
    OFF_RATING_RANK,
    DEF_RATING_RANK,
    NET_RATING_RANK,
    AST_PCT_RANK,
    AST_TO_RANK,
    AST_RATIO_RANK,
    OREB_PCT_RANK,
    DREB_PCT_RANK,
    REB_PCT_RANK,
    TM_TOV_PCT_RANK,
    EFG_PCT_RANK,
    TS_PCT_RANK,
    PACE_RANK,
    PIE_RANK
) VALUES (
    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
    %s, %s, %s, %s, %s, %s);

    ON DUPLICATE KEY UPDATE 
    TEAM_NAME = VALUES(TEAM_NAME),
    GP = VALUES(GP),
    W = VALUES(W),
    L = VALUES(L),
    W_PCT = VALUES(W_PCT),
    MIN = VALUES(MIN),
    E_OFF_RATING = VALUES(E_OFF_RATING),
    OFF_RATING = VALUES(OFF_RATING),
    E_DEF_RATING = VALUES(E_DEF_RATING),
    DEF_RATING = VALUES(DEF_RATING),
    E_NET_RATING = VALUES(E_NET_RATING),
    NET_RATING = VALUES(NET_RATING),
    AST_PCT = VALUES(AST_PCT),
    AST_TO = VALUES(AST_TO),
    AST_RATIO = VALUES(AST_RATIO),
    OREB_PCT = VALUES(OREB_PCT),
    DREB_PCT = VALUES(DREB_PCT),
    REB_PCT = VALUES(REB_PCT),
    TM_TOV_PCT = VALUES(TM_TOV_PCT),
    EFG_PCT = VALUES(EFG_PCT),
    TS_PCT = VALUES(TS_PCT),
    E_PACE = VALUES(E_PACE),
    PACE = VALUES(PACE),
    PACE_PER40 = VALUES(PACE_PER40),
    POSS = VALUES(POSS),
    PIE = VALUES(PIE),
    GP_RANK = VALUES(GP_RANK),
    W_RANK = VALUES(W_RANK),
    L_RANK = VALUES(L_RANK),
    W_PCT_RANK = VALUES(W_PCT_RANK),
    MIN_RANK = VALUES(MIN_RANK),
    OFF_RATING_RANK = VALUES(OFF_RATING_RANK),
    DEF_RATING_RANK = VALUES(DEF_RATING_RANK),
    NET_RATING_RANK = VALUES(NET_RATING_RANK),
    AST_PCT_RANK = VALUES(AST_PCT_RANK),
    AST_TO_RANK = VALUES(AST_TO_RANK),
    AST_RATIO_RANK = VALUES(AST_RATIO_RANK),
    OREB_PCT_RANK = VALUES(OREB_PCT_RANK),
    DREB_PCT_RANK = VALUES(DREB_PCT_RANK),
    REB_PCT_RANK = VALUES(REB_PCT_RANK),
    TM_TOV_PCT_RANK = VALUES(TM_TOV_PCT_RANK),
    EFG_PCT_RANK = VALUES(EFG_PCT_RANK),
    TS_PCT_RANK = VALUES(TS_PCT_RANK),
    PACE_RANK = VALUES(PACE_RANK),
    PIE_RANK = VALUES(PIE_RANK);
   

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


