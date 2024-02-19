from flask import Flask, request
from joblib import load
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

stunting_model = load("models/stunting_model_1.joblib")
wasting_model = load("models/wasting_model_2.joblib")
underweight_overweight_model = load("models/underweight_overweight_model_1.joblib")


@app.route("/", methods=["GET"])
def home():
    return "Hello world"


@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return "No file part", 400
    file = request.files["file"]
    df = pd.read_csv(file)
    return {
        "message": "File received successfully",
        "data": float(np.float32(df.iloc[:, 1])[1]),
    }, 200


"""
Wasting:{
   Normal : 0,
   Overweight: 1
}

Stunting:{
   Severely Stunted: 2,
   Normal: 1,
   Moderately Stunted: 0
}

Underweight_Overweight:{
   Normal: 1,
   Overweight: 2,
   Moderately Underweight: 0
}

"""


@app.route("/predict-v1", methods=["POST"])
def predict_v1():
    ### Wasting prediction
    if "file" not in request.files:
        return "No file part", 400
    f1 = request.files["file"]
    df1 = pd.read_csv(f1)
    data1 = np.float32(df1.iloc[:, 1])
    prediction1 = wasting_model.predict([data1])
    output_1 = int(round(prediction1[0], 2))

    ### Stunting model
    # f2 = request.files["file"]
    # df2 = pd.read_csv(f2)
    # data2 = np.float32(df2.iloc[:, 1])
    prediction2 = stunting_model.predict([data1])
    output_2 = int(round(prediction2[0], 2))

    # ### Underweight/Overweight model
    # f3 = request.files.get("file")
    # df3 = pd.read_csv(f3)
    # data3 = np.float32(df3)
    prediction3 = underweight_overweight_model.predict([data1])
    output_3 = int(round(prediction3[0], 2))

    return {
        "message": "Prediction successfull",
        "data": {
            "wasting": output_1,
            "Stunting": output_2,
            "Underweight_Overweight": output_3,
        },
    }


@app.route("/predict-v2")
def predict_v2():
    return ""


if __name__ == "__main__":
    app.run(debug=True)
