# A Python server that takes submissions, runs them through a pretrained model, and sends
# them to the front end through a websocket.
from flask import Flask, render_template, request, abort
from flask_cors import CORS, cross_origin

# import json
# import sys

# model = None
# app = Flask(__name__)
# CORS(app)

# # # Send the frontend the list of backend models to choose from
# # @app.route('/modeltypes', methods=['GET', 'POST'])
# # @cross_origin()
# # def getModelTypes():
# #   return json.dumps({'modeltypes': ["sample","layout transformer","gpt"]})

# @app.route('/imagesuggestions', methods=['POST'])
# @cross_origin()
# def getSuggestions(): # Takes objects in format [name, box]
#   j = request.get_json()

#   # labels, boxes = model.auto(labels, boxes,screenTypes)
#   print(json.dumps({"boxes": boxes, "labels": labels}))
#   return json.dumps({"boxes": boxes, "labels": labels})

# @app.route('/textsuggestions', methods=['POST'])
# @cross_origin()
# def getSuggestions(): # Takes objects in format [name, box]
#     j = request.get_json()
#     # print(j)
#     if 'screenTypes' in j:
#         screenTypes = f"A well-designed {j['screenTypes']} screen"
#     else:
#         screenTypes = "A well-designed UI screen"
    
#     if 'modelTypes' in j:
#         modelToBeUsed = j['modelTypes']
#     else:
#         modelToBeUsed = "gpt"
    
#     labels, boxes= j['labels'], j['boxes'] 
#     try:
#         if modelToBeUsed == "sample":
#             labels, boxes = model_sample.auto(labels, boxes,screenTypes)
#         elif modelToBeUsed == "layout transformer":
#             labels, boxes = model_lt.auto(labels, boxes,screenTypes)
#         else:
#             labels, boxes = model_gpt.auto(labels, boxes,screenTypes)
#     except:
#         abort(500, description="Internal Server Error")
   
#     print(json.dumps({"boxes": boxes, "labels": labels}))
#     return json.dumps({"boxes": boxes, "labels": labels})
# # python server.py
# if __name__ == '__main__':
#   try:
#     # module = __import__('models.')  
#     # print(module)
#     model_sample = sample()
#     model_lt = lt()
#     model_gpt = gpt()
#     # model = getattr(module, sys.argv[1]).AutoCompleteModel()
#     app.run(host="0.0.0.0",debug=True, port=2020)
#     # app.run(host="0.0.0.0",debug=True)
#   except Exception as e:
#     print(e)
#     print("Usage is:\t'python server.py <model_script_name>'")
#     print("Example:\t'python server.py autocomplete_sample'")
