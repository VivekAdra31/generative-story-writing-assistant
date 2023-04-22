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
    'image1': 'https://img.toolstud.io/240x240/3b5998/fff&text=+255x255+',
    'image2': 'https://img.toolstud.io/240x240/3b5998/fff&text=+255x255+',
    'image3': 'https://img.toolstud.io/240x240/3b5998/fff&text=+255x255+',
    'image4': 'https://img.toolstud.io/240x240/3b5998/fff&text=+255x255+'
    }
    return jsonify(urls)

if __name__ == '__main__':
    app.run(debug=True)
