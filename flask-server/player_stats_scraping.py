import mysql.connector
import requests
import json




import csv
seasons = []








for i in range(21):
  start_year = 2003 + i
  end_year = 4 + i




  if end_year < 10:
      end_year_str = '0' + str(end_year)
  else:
      end_year_str = str(end_year)




  new_season = str(start_year) + '-' + end_year_str
  seasons.append(new_season)








for season in seasons:
    # Database connection
  try:
      db = mysql.connector.connect(
      host="localhost",
      user="root",
      password="",
      database="HoopSense"
      )
      mycursor = db.cursor()
  except mysql.connector.Error as err:
      print("Database connection failed:", err)
      exit(1)  # Exit the script if DB connection fails


  try:
      per_mode = 'Totals'
      player_info_url = f"https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&ISTRound=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode={per_mode}&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season={season}&SeasonSegment=&SeasonType=Regular%20Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=" 
      print(player_info_url)
  except Exception as e:
      print(f"An error occurred: {e}")
    
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
  try:
      response = requests.get(url=player_info_url, headers=headers)
      data = response.json()
      with open(f"nba_data_{season}.json", 'w') as file:
          json.dump(data, file, indent=4)
  except requests.RequestException as e:
      print("Request failed:", e)
      exit(1)  # Exit if the request fails
    
  try:
      players_data = data['resultSets'][0]['rowSet']
    
    
    
      for player_data in players_data:
          record = (season,) + tuple(player_data)
          mycursor.execute(insert_statement, record)
        
          db.commit()  # Commit the transaction to save changes
          print(f"Inserted {len(players_data)} records for season {season} successfully.")




  except Exception as e:
      # Handle exceptions
      db.rollback()
      print(f"Error processing season {season}: {e}")








 
    
  seasons_for_db = season.replace('-', "_")
    
  create_table_query = f'''
      CREATE TABLE IF NOT EXISTS nba_seasons (
      SEASON VARCHAR(255),
      PLAYER_ID INT,
      PLAYER_NAME VARCHAR(255),
      NICKNAME VARCHAR(255),
      TEAM_ID INT,
      TEAM_ABBREVIATION VARCHAR(10),
      AGE INT,
      GP INT,
      W INT,
      L INT,
      W_PCT FLOAT,
      MIN FLOAT,
      FGM INT,
      FGA INT,
      FG_PCT FLOAT,
      FG3M INT,
      FG3A INT,
      FG3_PCT FLOAT,
      FTM INT,
      FTA INT,
      FT_PCT FLOAT,
      OREB INT,
      DREB INT,
      REB INT,
      AST INT,
      TOV INT,
      STL INT,
      BLK INT,
      BLKA INT,
      PF INT,
      PFD INT,
      PTS INT,
      PLUS_MINUS INT,
      NBA_FANTASY_PTS FLOAT,
      DD2 INT,
      TD3 INT,
      WNBA_FANTASY_PTS FLOAT,
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
      NBA_FANTASY_PTS_RANK INT,
      DD2_RANK INT,
      TD3_RANK INT,
      WNBA_FANTASY_PTS_RANK INT,
      PRIMARY KEY(SEASON, PLAYER_ID)
  )
  '''
  insert_statement = """
   INSERT INTO nba_seasons(SEASON, PLAYER_ID, PLAYER_NAME, NICKNAME, TEAM_ID, TEAM_ABBREVIATION, AGE, GP, W, L, W_PCT, MIN, FGM, FGA, FG_PCT, FG3M, FG3A, FG3_PCT, FTM, FTA, FT_PCT, OREB, DREB, REB, AST, TOV, STL, BLK, BLKA, PF, PFD, PTS, PLUS_MINUS, NBA_FANTASY_PTS, DD2, TD3, WNBA_FANTASY_PTS, GP_RANK, W_RANK, L_RANK, W_PCT_RANK, MIN_RANK, FGM_RANK, FGA_RANK, FG_PCT_RANK, FG3M_RANK, FG3A_RANK, FG3_PCT_RANK, FTM_RANK, FTA_RANK, FT_PCT_RANK, OREB_RANK, DREB_RANK, REB_RANK, AST_RANK, TOV_RANK, STL_RANK, BLK_RANK, BLKA_RANK, PF_RANK, PFD_RANK, PTS_RANK, PLUS_MINUS_RANK, NBA_FANTASY_PTS_RANK, DD2_RANK, TD3_RANK, WNBA_FANTASY_PTS_RANK)
   VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
   ON DUPLICATE KEY UPDATE PLAYER_NAME=VALUES(PLAYER_NAME), NICKNAME=VALUES(NICKNAME), TEAM_ID=VALUES(TEAM_ID), TEAM_ABBREVIATION=VALUES(TEAM_ABBREVIATION), AGE=VALUES(AGE), GP=VALUES(GP), W=VALUES(W), L=VALUES(L), W_PCT=VALUES(W_PCT), MIN=VALUES(MIN), FGM=VALUES(FGM), FGA=VALUES(FGA), FG_PCT=VALUES(FG_PCT), FG3M=VALUES(FG3M), FG3A=VALUES(FG3A), FG3_PCT=VALUES(FG3_PCT), FTM=VALUES(FTM), FTA=VALUES(FTA), FT_PCT=VALUES(FT_PCT), OREB=VALUES(OREB), DREB=VALUES(DREB), REB=VALUES(REB), AST=VALUES(AST), TOV=VALUES(TOV), STL=VALUES(STL), BLK=VALUES(BLK), BLKA=VALUES(BLKA), PF=VALUES(PF), PFD=VALUES(PFD), PTS=VALUES(PTS), PLUS_MINUS=VALUES(PLUS_MINUS), NBA_FANTASY_PTS=VALUES(NBA_FANTASY_PTS), DD2=VALUES(DD2), TD3=VALUES(TD3), WNBA_FANTASY_PTS=VALUES(WNBA_FANTASY_PTS), GP_RANK=VALUES(GP_RANK), W_RANK=VALUES(W_RANK), L_RANK=VALUES(L_RANK), W_PCT_RANK=VALUES(W_PCT_RANK), MIN_RANK=VALUES(MIN_RANK), FGM_RANK=VALUES(FGM_RANK), FGA_RANK=VALUES(FGA_RANK), FG_PCT_RANK=VALUES(FG_PCT_RANK), FG3M_RANK=VALUES(FG3M_RANK), FG3A_RANK=VALUES(FG3A_RANK), FG3_PCT_RANK=VALUES(FG3_PCT_RANK), FTM_RANK=VALUES(FTM_RANK), FTA_RANK=VALUES(FTA_RANK), FT_PCT_RANK=VALUES(FT_PCT_RANK), OREB_RANK=VALUES(OREB_RANK), DREB_RANK=VALUES(DREB_RANK), REB_RANK=VALUES(REB_RANK), AST_RANK=VALUES(AST_RANK), TOV_RANK=VALUES(TOV_RANK), STL_RANK=VALUES(STL_RANK), BLK_RANK=VALUES(BLK_RANK), BLKA_RANK=VALUES(BLKA_RANK), PF_RANK=VALUES(PF_RANK), PFD_RANK=VALUES(PFD_RANK), PTS_RANK=VALUES(PTS_RANK), PLUS_MINUS_RANK=VALUES(PLUS_MINUS_RANK), NBA_FANTASY_PTS_RANK=VALUES(NBA_FANTASY_PTS_RANK), DD2_RANK=VALUES(DD2_RANK), TD3_RANK=VALUES(TD3_RANK), WNBA_FANTASY_PTS_RANK=VALUES(WNBA_FANTASY_PTS_RANK);
   """


 
  try:
      mycursor.execute(create_table_query)
      print("Table created successfully or already exists.")
  except mysql.connector.Error as err:
      print("Error creating table:", err)
      exit(1)  # Exit if table creation fails
    




  finally:
      mycursor.close()
      db.close()



