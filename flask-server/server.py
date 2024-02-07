from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# Apply CORS to the Flask app with default settings, allowing all domains

CORS(app)

#CORS(app, resources={r"/create_user": {"origins": "http://localhost:3000"}})

# Database connection function
def connect_to_database():
    try:
        connection = mysql.connector.connect(
            host='localhost',  # Your database host, usually localhost
            database='HoopSenseUsers',  # Your database name
            user='root',  # Your database username
            password=''  # Your database password
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print("Error while connecting to MySQL", e)

# Route to create a new user in the database
@app.route('/create_user', methods=['POST'])
@cross_origin()  # This decorator enables CORS on this specific route, with default options.

def create_user():
    data = request.json  # Extract data from the request
    connection = connect_to_database()
    if connection:
        try:
            cursor = connection.cursor()
            query = """INSERT INTO users (first_name, last_name, email, password) VALUES (%s, %s, %s, %s)"""
            cursor.execute(query, (data['firstName'], data['lastName'], data['email'], data['password']))
            connection.commit()  # Commit the changes to the database
            return jsonify({'message': 'User created successfully'}), 201
        except Error as e:
            return jsonify({'error': str(e)}), 500
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()  # Close the database connection
    else:
        return jsonify({'error': 'Failed to connect to database'}), 500

@app.route('/login', methods=['POST'])
def login_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    connection = connect_to_database()
    if connection:
        try:
            cursor = connection.cursor()
            cursor.execute("SELECT password FROM users WHERE email = %s", (email,))
            user = cursor.fetchone()
            if user and user[0] == password:  # Direct comparison of plaintext passwords
                return jsonify({'message': 'Login successful'}), 200
            else:
                return jsonify({'error': 'Invalid email or password'}), 401
        except Error as e:
            return jsonify({'error': str(e)}), 500
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
    else:
        return jsonify({'error': 'Failed to connect to database'}), 500




if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Run the Flask app in debug mode

