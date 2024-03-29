from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

CORS(app)

def get_database_connection():
    """Function to connect to the database"""
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="password",
            database="HoopSense"
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL Database: {e}")
        return None
    
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
            SELECT PLAYER_NAME, AGE, TEAM_ABBREVIATION, GP, W, L, W_PCT, MIN, FGM, FGA, FG_PCT, FG3M, FG3A, FG3_PCT, FTM, FTA, FT_PCT, OREB, DREB, REB, AST, TOV, STL, BLK, BLKA, PF, PFD, PTS, PLUS_MINUS,       MIN_RANK, FGM_RANK, FGA_RANK, FG_PCT_RANK, FG3M_RANK, FG3A_RANK, FG3_PCT_RANK, FTM_RANK, FTA_RANK, FT_PCT_RANK, OREB_RANK, DREB_RANK, REB_RANK, AST_RANK, TOV_RANK, STL_RANK, BLK_RANK, BLKA_RANK, PF_RANK, PFD_RANK, PTS_RANK, PLUS_MINUS_RANK FROM PLAYERS_2023_24
            
      
            
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

@app.route('/TeamStats/traditional', methods=['GET'])
@cross_origin()

def search_team():
    """Endpoint to search for a team by name"""
    team_name_query = request.args.get('name', default='', type=str)
    connection = get_database_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            query = """
            SELECT TEAM_NAME, GP, W, L, FGM, FGA, FG_PCT, FG3M, FG3A, FG3_PCT, FTM, FTA, FT_PCT, REB, OREB, DREB, AST, TOV, STL, BLK, BLKA, PF, PFD, PTS, PLUS_MINUS, FGM_RANK, FGA_RANK, FG_PCT_RANK, FG3M_RANK, FG3A_RANK, FG3_PCT_RANK, FTM_RANK, FTA_RANK, FT_PCT_RANK, OREB_RANK, DREB_RANK, REB_RANK, AST_RANK, TOV_RANK, STL_RANK, BLK_RANK, BLKA_RANK, PF_RANK, PFD_RANK, PTS_RANK, PLUS_MINUS_RANK FROM TEAMS_2023_24
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
     
@app.route('/TeamStats/defensive', methods=['GET'])
@cross_origin()

def search_defensive_team():
    """Endpoint to search for a team by name"""
    team_name_query = request.args.get('name', default='', type=str)
    connection = get_database_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            query = """
            SELECT TEAM_NAME, GP, W, L, DEF_RATING, DREB, DREB_PCT, STL, BLK, OPP_PTS_OFF_TOV, OPP_PTS_2ND_CHANCE, OPP_PTS_FB, OPP_PTS_PAINT, DEF_RATING_RANK, DREB_RANK, DREB_PCT_RANK, STL_RANK, BLK_RANK, OPP_PTS_OFF_TOV_RANK, OPP_PTS_2ND_CHANCE_RANK, OPP_PTS_FB_RANK, OPP_PTS_PAINT_RANK  FROM TEAMS_DEFENSE_2023_24
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
            SELECT TEAM_NAME, GP, W, L, E_OFF_RATING, OFF_RATING, E_DEF_RATING, DEF_RATING, E_NET_RATING, NET_RATING, AST_PCT, AST_TO, AST_RATIO, OREB_PCT, DREB_PCT, REB_PCT, TM_TOV_PCT, EFG_PCT, TS_PCT, E_PACE, PACE, PACE_PER40, POSS, PIE,OFF_RATING_RANK, DEF_RATING_RANK, NET_RATING_RANK, AST_PCT_RANK, AST_TO_RANK, AST_RATIO_RANK, OREB_PCT_RANK, DREB_PCT_RANK, REB_PCT_RANK, TM_TOV_PCT_RANK, EFG_PCT_RANK, TS_PCT_RANK, PACE_RANK, PIE_RANK FROM TEAMS_ADVANCED_2023_24
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
    app.run(debug=True, port=5001)