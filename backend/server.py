from flask import Flask, jsonify, request, send_file
import numpy as np
import requests
from flask_cors import CORS, cross_origin


model = None
app = Flask(__name__)
CORS(app)

@app.route('/api/complete_text', methods=['POST'])
@cross_origin()
def complete_text():
    return jsonify({'text': 'Endpoint 1 called'})

@app.route('/api/get_image', methods=['POST'])
@cross_origin()
def get_image():
    urls = {
    'image1': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgA0kNyXUrmouVwSh7VZFWOhDnNnpr5dM0qg&usqp=CAU',
    'image2': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgA0kNyXUrmouVwSh7VZFWOhDnNnpr5dM0qg&usqp=CAU',
    'image3': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN6ZVu6IzOwyuyf724ZgLHibfZIfVW6FwhYw&usqp=CAU',\
    'image4': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN6ZVu6IzOwyuyf724ZgLHibfZIfVW6FwhYw&usqp=CAU'
    }
    return jsonify(urls)

@app.route('/api/reset_chatgpt', methods=['POST'])
@cross_origin()
def complete_text():
    return jsonify({'text': 'Chatgpt reset'})

if __name__ == '__main__':
    app.run(debug=True)
