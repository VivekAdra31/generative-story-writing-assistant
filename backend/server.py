from flask import Flask, jsonify, request, send_file
import numpy as np
from flask_cors import CORS, cross_origin
import json
import openai
import os


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
    data = json.loads(request.data)
    dalle_prompt_text = data['imagePrompt']
    API_KEY = os.environ['OPENAI_API_KEY']
    dalle_data = openai.Image.create(api_key=API_KEY, prompt = dalle_prompt_text, n=4, size='256x256')
    return jsonify({f'image{i+1}':item['url'] for i, item in enumerate(dalle_data['data'])})

    # urls = {
    # 'image1': 'https://img.toolstud.io/240x240/3b5998/fff&text=+255x255+',
    # 'image2': 'https://img.toolstud.io/240x240/3b5998/fff&text=+255x255+',
    # 'image3': 'https://img.toolstud.io/240x240/3b5998/fff&text=+255x255+',
    # 'image4': 'https://img.toolstud.io/240x240/3b5998/fff&text=+255x255+'
    # }
    # return jsonify(urls)

@app.route('/api/reset_chatgpt', methods=['POST'])
@cross_origin()
def complete_text():
    return jsonify({'text': 'Chatgpt reset'})

if __name__ == '__main__':
    app.run(debug=True)
