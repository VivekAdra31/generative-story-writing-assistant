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
    'image1': 'https://picsum.photos/id/1/256/256',
    'image2': 'https://picsum.photos/id/2/256/256',
    'image3': 'https://picsum.photos/id/3/256/256',
    'image4': 'https://picsum.photos/id/4/256/256'
    }
    return jsonify(urls)

@app.route('/api/reset_chatgpt', methods=['POST'])
@cross_origin()
def reset_chatgpt():
    return jsonify({'text': 'Chatgpt reset'})

if __name__ == '__main__':
    app.run(debug=True)
