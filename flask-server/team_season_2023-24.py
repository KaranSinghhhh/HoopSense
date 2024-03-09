import mysql.connector
import requests
import json
import sys
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
   teams_count = len(teams_data)
   columns_list = data['resultSets'][0]['headers']

   filename = 'nba_team_2023_24.csv'

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

# Check if the table already contains data for the 2023-24 season
check_query = """
SELECT COUNT(*) FROM TEAMS_2023_24 WHERE GP > 0;
"""
try:
    mycursor.execute(check_query)
    result = mycursor.fetchone()
    if result[0] > 0:
        print("Error: Data for the 2023-24 season already exists. Running this script again will result in duplicate entries.")
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
                "FGM",
                "FGA",
                "FG_PCT",
                "FG3M",
                "FG3A",
                "FG3_PCT",
                "FTM",
                "FTA",
                "FT_PCT",
                "OREB",
                "DREB",
                "REB",
                "AST",
                "TOV",
                "STL",
                "BLK",
                "BLKA",
                "PF",
                "PFD",
                "PTS",
                "PLUS_MINUS",
                "GP_RANK",
                "W_RANK",
                "L_RANK",
                "W_PCT_RANK",
                "MIN_RANK",
                "FGM_RANK",
                "FGA_RANK",
                "FG_PCT_RANK",
                "FG3M_RANK",
                "FG3A_RANK",
                "FG3_PCT_RANK",
                "FTM_RANK",
                "FTA_RANK",
                "FT_PCT_RANK",
                "OREB_RANK",
                "DREB_RANK",
                "REB_RANK",
                "AST_RANK",
                "TOV_RANK",
                "STL_RANK",
                "BLK_RANK",
                "BLKA_RANK",
                "PF_RANK",
                "PFD_RANK",
                "PTS_RANK",
                "PLUS_MINUS_RANK"
                ]

create_table_query = """
CREATE TABLE IF NOT EXISTS TEAMS_2023_24 (
    TEAM_ID INT,
    TEAM_NAME VARCHAR(255),
    GP INT, 
    W INT,
    L INT, 
    W_PCT FLOAT,
    MIN FLOAT,
    FGM FLOAT,
    FGA FLOAT, 
    FG_PCT FLOAT,
    FG3M FLOAT,
    FG3A FLOAT, 
    FG3_PCT FLOAT, 
    FTM FLOAT, 
    FTA FLOAT,
    FT_PCT FLOAT,
    OREB FLOAT,
    DREB FLOAT,
    REB FLOAT,
    AST FLOAT,
    TOV FLOAT,
    STL FLOAT,
    BLK FLOAT,
    BLKA FLOAT,
    PF FLOAT,
    PFD FLOAT,
    PTS FLOAT,
    PLUS_MINUS FLOAT,
    GP_RANK INT,
    W_RANK INT,
    L_RANK INT,
    W_PCT_RANK INT,
    MIN_RANK INT,
    FGM_RANK INT,
    FGA_RANK INT,
    FG_PCT_RANK INT,
    FG3M_RANK INT,
    FG3A_RANK INT,
    FG3_PCT_RANK INT,
    FTM_RANK INT,
    FTA_RANK INT,
    FT_PCT_RANK INT,
    OREB_RANK INT,
    DREB_RANK INT,
    REB_RANK INT,
    AST_RANK INT,
    TOV_RANK INT,
    STL_RANK INT,
    BLK_RANK INT,
    BLKA_RANK INT,
    PF_RANK INT,
    PFD_RANK INT,
    PTS_RANK INT,
    PLUS_MINUS_RANK INT,
    PRIMARY KEY(TEAM_ID)
);
"""

insert_statement = """
INSERT INTO TEAMS_2023_24 (
    TEAM_ID,
    TEAM_NAME,
    GP, 
    W,
    L, 
    W_PCT,
    MIN,
    FGM,
    FGA, 
    FG_PCT,
    FG3M,
    FG3A, 
    FG3_PCT, 
    FTM, 
    FTA,
    FT_PCT,
    OREB,
    DREB,
    REB,
    AST,
    TOV,
    STL,
    BLK,
    BLKA,
    PF,
    PFD,
    PTS,
    PLUS_MINUS,
    GP_RANK,
    W_RANK,
    L_RANK,
    W_PCT_RANK,
    MIN_RANK,
    FGM_RANK,
    FGA_RANK,
    FG_PCT_RANK,
    FG3M_RANK,
    FG3A_RANK,
    FG3_PCT_RANK,
    FTM_RANK,
    FTA_RANK,
    FT_PCT_RANK,
    OREB_RANK,
    DREB_RANK,
    REB_RANK,
    AST_RANK,
    TOV_RANK,
    STL_RANK,
    BLK_RANK,
    BLKA_RANK,
    PF_RANK,
    PFD_RANK,
    PTS_RANK,
    PLUS_MINUS_RANK
) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
ON DUPLICATE KEY UPDATE 
    TEAM_NAME=VALUES(TEAM_NAME),
    GP=VALUES(GP), 
    W=VALUES(W),
    L=VALUES(L), 
    W_PCT=VALUES(W_PCT),
    MIN=VALUES(MIN),
    FGM=VALUES(FGM),
    FGA=VALUES(FGA), 
    FG_PCT=VALUES(FG_PCT),
    FG3M=VALUES(FG3M),
    FG3A=VALUES(FG3A), 
    FG3_PCT=VALUES(FG3_PCT), 
    FTM=VALUES(FTM), 
    FTA=VALUES(FTA),
    FT_PCT=VALUES(FT_PCT),
    OREB=VALUES(OREB),
    DREB=VALUES(DREB),
    REB=VALUES(REB),
    AST=VALUES(AST),
    TOV=VALUES(TOV),
    STL=VALUES(STL),
    BLK=VALUES(BLK),
    BLKA=VALUES(BLKA),
    PF=VALUES(PF),
    PFD=VALUES(PFD),
    PTS=VALUES(PTS),
    PLUS_MINUS=VALUES(PLUS_MINUS),
    GP_RANK=VALUES(GP_RANK),
    W_RANK=VALUES(W_RANK),
    L_RANK=VALUES(L_RANK),
    W_PCT_RANK=VALUES(W_PCT_RANK),
    MIN_RANK=VALUES(MIN_RANK),
    FGM_RANK=VALUES(FGM_RANK),
    FGA_RANK=VALUES(FGA_RANK),
    FG_PCT_RANK=VALUES(FG_PCT_RANK),
    FG3M_RANK=VALUES(FG3M_RANK),
    FG3A_RANK=VALUES(FG3A_RANK),
    FG3_PCT_RANK=VALUES(FG3_PCT_RANK),
    FTM_RANK=VALUES(FTM_RANK),
    FTA_RANK=VALUES(FTA_RANK),
    FT_PCT_RANK=VALUES(FT_PCT_RANK),
    OREB_RANK=VALUES(OREB_RANK),
    DREB_RANK=VALUES(DREB_RANK),
    REB_RANK=VALUES(REB_RANK),
    AST_RANK=VALUES(AST_RANK),
    TOV_RANK=VALUES(TOV_RANK),
    STL_RANK=VALUES(STL_RANK),
    BLK_RANK=VALUES(BLK_RANK),
    BLKA_RANK=VALUES(BLKA_RANK),
    PF_RANK=VALUES(PF_RANK),
    PFD_RANK=VALUES(PFD_RANK),
    PTS_RANK=VALUES(PTS_RANK),
    PLUS_MINUS_RANK=VALUES(PLUS_MINUS_RANK);
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



