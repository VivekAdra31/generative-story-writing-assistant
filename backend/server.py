from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

model = None
app = Flask(__name__)
CORS(app)

@app.route('/api/complete_text', methods=['POST'])
@cross_origin()
def complete_text():
    
    return jsonify({'message': 'Endpoint 1 called'})

@app.route('/api/get_image', methods=['POST'])
@cross_origin()
def get_image():
    
    return jsonify({'message': 'Endpoint 2 called'})

if __name__ == '__main__':
    app.run(debug=True)
