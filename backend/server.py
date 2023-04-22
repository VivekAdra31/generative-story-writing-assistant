from flask import Flask, jsonify, request, send_file
import numpy as np
from flask_cors import CORS, cross_origin
import json
import openai
import os
from chadgpt import return_response


model = None
app = Flask(__name__)
CORS(app)

@app.route('/api/complete_text', methods=['POST'])
@cross_origin()
def complete_text():
    text = json.loads(request.data)['text']

    return jsonify({'text': return_response(text)})

@app.route('/api/get_image', methods=['POST'])
@cross_origin()
def get_image():
    print(request.data)
    data = json.loads(request.data)
    dalle_prompt_text = data['imagePrompt']
    API_KEY = os.environ['OPENAI_API_KEY']
    dalle_data = openai.Image.create(api_key=API_KEY, prompt = dalle_prompt_text, n=4, size='256x256')
    return jsonify({f'image{i+1}':item['url'] for i, item in enumerate(dalle_data['data'])})

@app.route('/api/reset_chatgpt', methods=['POST'])
@cross_origin()
def reset_chatgpt():
    return jsonify({'text': 'Chatgpt reset'})

if __name__ == '__main__':
    app.run(debug=True)
