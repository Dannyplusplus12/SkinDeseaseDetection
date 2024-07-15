from flask import Flask, render_template, request, jsonify

from inference_sdk import InferenceHTTPClient
# CLIENT = InferenceHTTPClient(
#     api_url="https://detect.roboflow.com",
#     api_key="kTK0gAawSv3eqEDeXfAs"
# )

web = Flask(__name__)

@web.route("/")
def app():
    return render_template('app.html')

# @web.route("/api", methods=['GET', 'POST'])
# def api():
#     if request.method == 'GET':
#         return jsonify(1)
#     if request.method == 'POST':
#         result = CLIENT.infer(request.form['img'], model_id="yolov8-skin-disease-detection/1")
#         return result

if __name__ == '__main__':
   web.run(host='0.0.0.0', debug=True)