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

@app.route('/TeamStats', methods=['GET'])
@cross_origin()

def search_team():
    """Endpoint to search for a team by name"""
    team_name_query = request.args.get('name', default='', type=str)
    connection = get_database_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            query = """
            SELECT TEAM_NAME, GP, W, L, FGM, FGA, FG_PCT, FG3M, FG3A, FG3_PCT, FTM, FTA, FT_PCT  FROM TEAMS_2023_24
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

if __name__ == '__main__':
    app.run(debug=True, port=5001)
