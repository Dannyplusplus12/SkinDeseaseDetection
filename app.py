from flask import Flask, render_template, request, jsonify

from inference_sdk import InferenceHTTPClient
# CLIENT = InferenceHTTPClient(
#     api_url="https://detect.roboflow.com",
#     api_key="kTK0gAawSv3eqEDeXfAs"
# )

app = Flask(__name__)

@app.route("/")
def dash():
    return render_template('app.html')

# @app.route("/api", methods=['GET', 'POST'])
# def api():
#     if request.method == 'GET':
#         return jsonify(1)
#     if request.method == 'POST':
#         result = CLIENT.infer(request.form['img'], model_id="yolov8-skin-disease-detection/1")
#         return result

@app.route('/favicon.ico') 
def favicon(): 
    return jsonify(1)

# if __name__ == '__main__':
#    web.run(host='0.0.0.0', debug=True)