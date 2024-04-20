import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import mysql.connector
from mysql.connector import Error
import requests
from dotenv import load_dotenv
from werkzeug.datastructures import URL

load_dotenv()  # load environment variables from .env file

app = Flask(__name__)

CORS(app)

def get_database_connection():
    """Function to connect to the database"""
    try:
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME")
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL Database: {e}")
        return None
    
@app.route('/PlayerNames', methods=['GET'])
@cross_origin()
def get_player_names():
    """Endpoint to get a list of player names"""
    connection = get_database_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            query = """
            SELECT DISTINCT PLAYER_NAME FROM NBA_PLAYERS_2023_24
            """
            cursor.execute(query)
            results = cursor.fetchall()
            return jsonify(results)
        except Error as e:
            print(f"SQL Error: {e}")  # Log the exact error to the console
            return {"error": str(e)}, 500
        finally:
            cursor.close()
            connection.close()
    else:
        return {"error": "Database connection failed"}, 500




@app.route('/PlayerStats', methods=['GET'])
@cross_origin()

def search_player():
    """Endpoint to search for a player by name"""
    team_name_query = request.args.get('name', default='', type=str)
    connection = get_database_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            query = """
            SELECT PLAYER_NAME, AGE, TEAM_ABBREVIATION, GP, W, L, W_PCT, MIN, FGM, FGA, FG_PCT, FG3M, FG3A, FG3_PCT, FTM, FTA, FT_PCT, OREB, DREB, REB, AST, TOV, STL, BLK, BLKA, PF, PFD, PTS, PLUS_MINUS,       MIN_RANK, FGM_RANK, FGA_RANK, FG_PCT_RANK, FG3M_RANK, FG3A_RANK, FG3_PCT_RANK, FTM_RANK, FTA_RANK, FT_PCT_RANK, OREB_RANK, DREB_RANK, REB_RANK, AST_RANK, TOV_RANK, STL_RANK, BLK_RANK, BLKA_RANK, PF_RANK, PFD_RANK, PTS_RANK, PLUS_MINUS_RANK FROM NBA_PLAYERS_2023_24
            WHERE PLAYER_NAME LIKE %s
            """
            cursor.execute(query, (f"%{team_name_query}%",))
            results = cursor.fetchall()
            return jsonify(results)
        except Error as e:
            return {"error": str(e)}, 500
        finally:
            cursor.close()
            connection.close()
    else:
        return {"error": "Database connection failed"}, 500  

def fetch_traditional_stats():
    url = f"https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&Height=&ISTRound=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&{per_mode}=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season={season_id}&SeasonSegment=&SeasonType=Regular%20Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision="

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
    return response.json()['resultSets'][0]['rowSet']

@app.route('/updateTraditionalStats', methods=['GET'])
@cross_origin()
def update_traditional_stats():
    team_stats = fetch_traditional_stats()
    if not team_stats:
        return {"error": "Failed to fetch data"}, 500

    connection = get_database_connection()
    if not connection:
        return {"error": "Database connection failed"}, 500

    try:
        cursor = connection.cursor()
        insert_query = """
        REPLACE INTO TEAMS_TRADITIONAL_STATS_2023_24 (TEAM_ID, TEAM_NAME, GP, W, L, FGM, FGA, FG_PCT, FG3M, FG3A, FG3_PCT, FTM, FTA, FT_PCT, REB, OREB, DREB, AST, TOV, STL, BLK, BLKA, PF, PFD, PTS, PLUS_MINUS)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,)
        """
        for team in team_stats:
            cursor.execute(insert_query, team)
        connection.commit()
        return jsonify({"meseage": "Data updated successfully"}), 200
    except mysql.connector.Error as err:
        connection.rollback()
        return jsonify({"error": str(err)}), 500
    finally:
        if connection:
            cursor.close()
            connection.close()


@app.route('/TeamStats/traditional', methods=['GET'])
@cross_origin()

def search_traditional_team():
    """Endpoint to search for a team by name"""
    team_name_query = request.args.get('name', default='', type=str)
    connection = get_database_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            query = """
            SELECT TEAM_NAME, GP, W, L, FGM, FGA, FG_PCT, FG3M, FG3A, FG3_PCT, FTM, FTA, FT_PCT, REB, OREB, DREB, AST, TOV, STL, BLK, BLKA, PF, PFD, PTS, PLUS_MINUS, FGM_RANK, FGA_RANK, FG_PCT_RANK, FG3M_RANK, FG3A_RANK, FG3_PCT_RANK, FTM_RANK, FTA_RANK, FT_PCT_RANK, OREB_RANK, DREB_RANK, REB_RANK, AST_RANK, TOV_RANK, STL_RANK, BLK_RANK, BLKA_RANK, PF_RANK, PFD_RANK, PTS_RANK, PLUS_MINUS_RANK FROM TEAMS_TRADITIONAL_2023_24
            WHERE TEAM_NAME LIKE %s
            """
            cursor.execute(query, (f"%{team_name_query}%",))
            results = cursor.fetchall()
            return jsonify(results)
        except Error as e:
            return {"error": str(e)}, 500
        finally:
            cursor.close()
            connection.close()
    else:
        return {"error": "Database connection failed"}, 500
     
def fetch_defensive_stats():
    url = "https://stats.nba.com/stats/leaguedashteamstats?MeasureType=Defense&PerMode=PerGame&Season=2023-24&SeasonType=Regular%20Season"
    headers = {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'x-nba-stats-token': 'true'
    }
    response = requests.get(url, headers=headers)
    return response.json()['resultSets'][0]['rowSet']


@app.route('/updateDefensiveStats', methods=['GET'])
@cross_origin()
def update_defensive_stats():
    team_stats = fetch_defensive_stats()
    if not team_stats:
        return {"error": "Failed to fetch data"}, 500

    connection = get_database_connection()
    if not connection:
        return {"error": "Database connection failed"}, 500

    try:
        cursor = connection.cursor()
        insert_query = """
        REPLACE INTO TEAMS_DEFENSE_2023_24 (TEAM_ID, TEAM_NAME, GP, W, L, DEF_RATING, DREB, DREB_PCT, STL, BLK, OPP_PTS_OFF_TOV, OPP_PTS_2ND_CHANCE, OPP_PTS_FB, OPP_PTS_PAINT)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        for team in team_stats:
            cursor.execute(insert_query, team)
        connection.commit()
        return jsonify({"message": "Data updated successfully"}), 200
    except mysql.connector.Error as err:
        connection.rollback()
        return jsonify({"error": str(err)}), 500
    finally:
        if connection:
            cursor.close()
            connection.close()



@app.route('/TeamStats/defensive', methods=['GET'])
@cross_origin()
def search_defensive_team():
    team_name_query = request.args.get('name', default='', type=str)
    connection = get_database_connection()
    if connection is None:
        return {"error": "Database connection failed"}, 500

    try:
        cursor = connection.cursor(dictionary=True)
        query = """
        SELECT TEAM_NAME, GP, W, L, DEF_RATING, DREB, DREB_PCT, STL, BLK, OPP_PTS_OFF_TOV, OPP_PTS_2ND_CHANCE, OPP_PTS_FB, OPP_PTS_PAINT, DEF_RATING_RANK, DREB_RANK, DREB_PCT_RANK, STL_RANK, BLK_RANK, OPP_PTS_OFF_TOV_RANK, OPP_PTS_2ND_CHANCE_RANK, OPP_PTS_FB_RANK, OPP_PTS_PAINT_RANK
        FROM TEAMS_DEFENSE_2023_24
        WHERE TEAM_NAME LIKE %s
        """
        cursor.execute(query, (f"%{team_name_query}%",))
        results = cursor.fetchall()
        return jsonify(results)
    except Error as e:
        return {"error": str(e)}, 500
    finally:
        if connection:
            cursor.close()
            connection.close()

def fetch_advanced_stats():
   url = f"https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&Height=&ISTRound=&LastNGames=0&LeagueID=00&Location=&MeasureType=Advanced&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&{per_mode}=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season={season_id}&SeasonSegment=&SeasonType=Regular%20Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision="

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
   return response.json()['resultSets'][0]['rowSet']

@app.route('/updateAdvancedStats', methods=['GET'])
@cross_origin()
def update_advanced_stats():
    team_stats = fetch_advanced_stats()
    if not team_stats:
        return {"error": "Failed to fetch data"}, 500

    connection = get_database_connection()
    if not connection:
        return {"error": "Database connection failed"}, 500
    
    try:
        cursor = connection.cursor()
        insert_query = """
        REPLACE INTO TEAMS_ADVANCED_2023_24 (TEAM_ID, TEAM_NAME, GP, W, L, E_OFF_RATING, OFF_RATING, E_DEF_RATING, DEF_RATING, E_NET_RATING, NET_RATING, AST_PCT, AST_TO, AST_RATIO, OREB_PCT, DREB_PCT, REB_PCT, TM_TOV_PCT, EFG_PCT, TS_PCT, E_PACE, PACE, PACE_PER40, POSS)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        for team in team_stats:
            cursor.execute(insert_query, team)
        connection.commit()
        return jsonify({"meseage": "Data updated successfully"}), 200
    except mysql.connector.Error as err:
        connection.rollback()
        return jsonify({"error": str(err)}), 500
    finally:
        if connection:
            cursor.close()
            connection.close()


@app.route('/TeamStats/advanced', methods=['GET'])
@cross_origin()
def search_advanced_team():
    """Endpoint to search for a team by name"""
    team_name_query = request.args.get('name', default='', type=str)
    connection = get_database_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            query = """
            SELECT TEAM_NAME, GP, W, L, E_OFF_RATING, OFF_RATING, E_DEF_RATING, DEF_RATING, E_NET_RATING, NET_RATING, AST_PCT, AST_TO, AST_RATIO, OREB_PCT, DREB_PCT, REB_PCT, TM_TOV_PCT, EFG_PCT, TS_PCT, E_PACE, PACE, PACE_PER40, POSS, PIE,OFF_RATING_RANK, DEF_RATING_RANK, NET_RATING_RANK, AST_PCT_RANK, AST_TO_RANK, AST_RATIO_RANK, OREB_PCT_RANK, DREB_PCT_RANK, REB_PCT_RANK, TM_TOV_PCT_RANK, EFG_PCT_RANK, TS_PCT_RANK, PACE_RANK, PIE_RANK
            FROM TEAMS_ADVANCED_2023_24
            WHERE TEAM_NAME LIKE %s
            """
            cursor.execute(query, (f"%{team_name_query}%",))
            results = cursor.fetchall()
            return jsonify(results)
        except Error as e:
            print(f"SQL Error: {e}")  # Log the exact error to the console
            return {"error": str(e)}, 500
        finally:
            cursor.close()
            connection.close()
    else:
        return {"error": "Database connection failed"}, 500
    
if __name__ == '__main__':
    app.run()
