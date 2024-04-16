import mysql.connector
import requests
import json
import csv

def fetch_defensive_stats():
    per_mode = "PerGame"
    season_id = "2023-24"
    url = f"https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&Height=&ISTRound=&LastNGames=0&LeagueID=00&Location=&MeasureType=Defense&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode={per_mode}&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season={season_id}&SeasonSegment=&SeasonType=Regular%20Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision="

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

    response = requests.get(url, headers=headers)
    data = response.json()

    with open('nba_defensive_team_2023_24.json', 'w') as file:
        json.dump(data, file, indent=4)
    
    return data

def save_to_csv(data):
    teams_data = data['resultSets'][0]['rowSet']
    columns_list = data['resultSets'][0]['headers']
    filename = 'nba_defensive_team_2023_24.csv'

    with open(filename, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(columns_list)
        for team_data in teams_data:
            csvwriter.writerow(team_data)
    
    print(f"Data successfully written to {filename}")

def insert_into_db():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="password",
            database="HoopSense"
        )
        cursor = connection.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS TEAMS_DEFENSE_2023_24 (TEAM_ID INT PRIMARY KEY, TEAM_NAME VARCHAR(255), GP INT, W INT, L INT, W_PCT FLOAT, MIN FLOAT, DEF_RATING FLOAT, DREB INT, DREB_PCT FLOAT, STL INT, BLK INT, OPP_PTS_OFF_TOV INT, OPP_PTS_2ND_CHANCE INT, OPP_PTS_FB INT, OPP_PTS_PAINT INT, GP_RANK INT, W_RANK INT, L_RANK INT, W_PCT_RANK INT, MIN_RANK INT, DEF_RATING_RANK INT, DREB_RANK INT, DREB_PCT_RANK INT, STL_RANK INT, BLK_RANK INT, OPP_PTS_OFF_TOV_RANK INT, OPP_PTS_2ND_CHANCE_RANK INT, OPP_PTS_FB_RANK INT, OPP_PTS_PAINT_RANK INT)")

        with open('nba_defensive_team_2023_24.csv', 'r') as file:
            csv_data = csv.reader(file)
            next(csv_data)  # Skip the header row
            for row in csv_data:
                cursor.execute("""
                REPLACE INTO TEAMS_DEFENSE_2023_24
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, row)
        connection.commit()
        print("Data inserted/updated successfully.")
    except mysql.connector.Error as err:
        print("Error: ", err)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def main():
    data = fetch_defensive_stats()
    save_to_csv(data)
    insert_into_db()

if __name__ == "__main__":
    main()
