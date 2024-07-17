from flask import Flask, render_template, request, jsonify, redirect
import asyncio, os

from inference_sdk import InferenceHTTPClient
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="kTK0gAawSv3eqEDeXfAs"
)

app = Flask(__name__)

@app.route("/")
def dash():
    return render_template('app.html')

UPLOAD_FOLDER = '/img'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/favicon.ico')
def favicon():
    return jsonify(1)

if __name__ == '__main__':
   app.run(host='0.0.0.0', debug=True)