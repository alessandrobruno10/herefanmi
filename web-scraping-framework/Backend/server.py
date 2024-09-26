from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from urllib.parse import urlparse
import threading
import json
import requests
import csv
from bs4 import BeautifulSoup
from queue import Queue
from components.config import UPLOAD_FOLDER
from components.router import execute_main_script
from clean import clean_csv

#starting the flask server and define its requirements
app = Flask(__name__)
CORS(app)



# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['HeReFaNMiDB']
collection = db['HeReFaNMi_collection']



# Define the directory to save uploaded files
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# dspaly all the online sources

@app.route('/get_data', methods=['GET'])
def get_data():
    data = list(collection.find({}, {'_id': 0}))
    return jsonify({'data': data})

# Ajouter une source
@app.route('/post_data', methods=['POST'])
def post_data():
    try:
        data_to_insert = request.get_json()
        collection.insert_one(data_to_insert)
        return jsonify({'message': 'Data successfully inserted!'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/upload_file', methods=['POST'])
def upload_file():
    try:
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.makedirs(app.config['UPLOAD_FOLDER'])

        uploaded_file = request.files['file']
        clean_filename = secure_filename(uploaded_file.filename)

        folder_name = os.path.splitext(clean_filename)[0]
        print(folder_name)
        folder_path = os.path.join(app.config['UPLOAD_FOLDER'], folder_name)

        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        new_filename = os.path.join(folder_path, 'main.py')
        uploaded_file.save(new_filename)

        # Update MongoDB collection
        url = f"www.{clean_filename.replace('.py', '')}.com"
        print(url)
        collection.update_one({'url': url}, {'$set': {'hasCodeSource': True}})

        return jsonify({'message': 'File successfully uploaded and saved!', 'filename': clean_filename})
    except Exception as e:
        return jsonify({'error': str(e)})

# POST endpoint for scraping and saving
@app.route('/api/scrape_and_save', methods=['POST'])
def scrape_and_save():
    try:
        data = request.get_json()
        url = data.get('url')

        # Construct the path to the script file
        folder_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../uploads"))

        url_folder = url.replace('www.', '').replace('.com', '')
        script_path = os.path.join('uploads', url_folder, 'main.py')
        print(script_path)
        script_path2='./components/r'+script_path
        print(script_path2)

        # Check if the script file exists
        if not os.path.exists(script_path):
            raise FileNotFoundError(f"Script {script_path} not found.")

        # Create a queue for communication
        message_queue = Queue()

        # Start main.py in a separate thread
        main_thread = threading.Thread(target=execute_main_scripts, args=(script_path, message_queue))
        main_thread.start()

        # Wait for the main_thread to finish before returning a response
        main_thread.join()

        print('finished')
        clean_csv('./uploads/'+url_folder+'/output_data.csv', './uploads/'+url_folder+'/output_cleaned.csv')

        return jsonify({'message': 'Scraping and saving completed successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})


def execute_main_scripts(script_path, message_queue):
    try:
        # Execute the script
        exec(open(script_path).read())
    except Exception as e:
        print(f"An error occurred while running the script: {e}")
    finally:
        # Send a message to the queue indicating completion
        message_queue.put("COMPLETED")
if __name__ == '__main__':
    from waitress import serve
    serve(app, host='0.0.0.0', port=5000)

