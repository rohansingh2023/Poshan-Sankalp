from flask import Flask, request, jsonify
from joblib import load
import pandas as pd
import numpy as np
from flask_cors import CORS
import pandas as pd
import json
import torch
from utils.model_config import ANNModel
from utils.mongo import mongo_url
from pymongo import MongoClient
import pickle

app = Flask(__name__)
CORS(app)

# db_name = TFMini-s

client = MongoClient(mongo_url)
db = client.db_name
myCollection = db.tfmini

df1 = pd.read_csv("data/Stunting.csv")
df2 = pd.read_csv("data/Wasting.csv")
df3 = pd.read_csv("data/Underweight_Overweight.csv")

with open('models/stunting_dt.pkl', 'rb') as f:
    stunting_model = pickle.load(f)

with open('models/wasting_dt.pkl', 'rb') as f:
    wasting_model = pickle.load(f)

with open('models/under_over_dt.pkl', 'rb') as f:
    under_over_model = pickle.load(f)

model1 = ANNModel(77, 3)
model1.load_state_dict(
    torch.load("models/stunting_model_v1.pth", map_location=torch.device("cpu"))
)

model2 = ANNModel(77, 2)
model2.load_state_dict(
    torch.load("models/wasting_model_v2.pth", map_location=torch.device("cpu"))
)

model3 = ANNModel(77, 3)
model3.load_state_dict(
    torch.load("models/Underweight_Overweight_v1.pth", map_location=torch.device("cpu"))
)


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
    # if "file" not in request.files:
    #     return "No file part", 400
    # f1 = request.files["file"]
    # df1 = pd.read_csv(f1)
    # data1 = np.float32(df1.iloc[:, 1])
    data = request.json
    data1 = [
        float(data.get('opt1')),
        float(data.get('opt12')),
        float(data.get('opt3')),
        float(data.get('opt4')),
        float(data.get('opt5')),
        float(data.get('opt6')),
        float(data.get('opt7')),
        float(data.get('opt8')),
        float(data.get('opt9')),
        float(data.get('opt10')),
        float(data.get('opt11')),
        float(data.get('opt12')),
        float(data.get('opt13')),
        float(data.get('opt14')),
        float(data.get('opt15')),
        float(data.get('opt16')),
        float(data.get('opt17')),
        float(data.get('opt18')),
        float(data.get('opt19')),
        float(data.get('opt20')), ]


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
    prediction3 = under_over_model.predict([data1])
    output_3 = int(round(prediction3[0], 2))

    return {
        "message": "Prediction successfull",
        "data": {
            "wasting": output_1,
            "Stunting": output_2,
            "Underweight_Overweight": output_3,
        },
    }


@app.route("/predict-v2", methods=["POST"])
def predict_v2():
    model1.eval()
    model2.eval()
    model3.eval()
    if "file" not in request.files:
        return "No file part", 400
    f1 = request.files["file"]
    df1 = pd.read_csv(f1)
    data1 = torch.tensor(df1.iloc[:, 1].values, dtype=torch.float32).unsqueeze(0)

    prediction1 = model1(data1)

    prediction2 = model2(data1)

    prediction3 = model3(data1)

    return {
        "message": "Prediction Successfull",
        "data": {
            "wasting": int(prediction2.cpu().data.numpy().argmax()),
            "Stunting": int(prediction1.cpu().data.numpy().argmax()),
            "Underweight_Overweight": int(prediction3.cpu().data.numpy().argmax()),
        },
    }


@app.route("/send-data", methods=["GET"])
def send_data():
    arr = df1["Childs's height in centimeters"]
    arr_lst = arr.tolist()
    json_data = jsonify(arr_lst)
    return json_data

@app.route("/get-height", methods=["GET"])
def get_height():
    cursor = myCollection.find()
    for record in cursor:
        res = record["param_name"]
    return jsonify(res)

@app.route("/predict-v3", methods=["POST"])
def predict_v3():
    data = request.json
    model3.eval()

    # option1 = float(data.get('opt1'))
    # option2 = float(data.get('option2'))
    # option3 = float(data.get('option3'))
    dev = {
    "Wealth index factor score combined": float(data.get('opt1')),
    "Mother's BMI": float(data.get('opt2')),
    "Mother's Under age 18 at time of birth_Age 18 or Older": float(data.get('opt3')),
    "Mother's Under age 18 at time of birth_Under age 18": float(data.get('opt4')),
    "Mother's Under age 18 at time of birth_nan":float(data.get('opt5')),
    "Sex of child_Female":float(data.get('opt6')),
    "Sex of child_Male":float(data.get('opt7')),
    "Sex of child_nan":float(data.get('opt8')),
    "Size of child at birth_Average":float(data.get('opt9')),
    "Size of child at birth_Larger than Average":float(data.get('opt10')),
    "Size of child at birth_Smaller than Average":float(data.get('opt11')),
    "Size of child at birth_Larger_Very Large":float(data.get('opt12')),
    "Size of child at birth_Larger_Very Small":float(data.get('opt13')),
    "Size of child at birth_Larger_nan":float(data.get('opt14')),
    "Birth weight in kilograms":float(data.get('opt15')),
    "Childs's age in months": float(data.get('opt16')),
    "Childs's weight in kilograms": float(data.get('opt17')),
    "Childs's height in centimeters": float(data.get('opt18')),
    "Type of place of residence_Rural":float(data.get('opt19')),
    "Type of place of residence_Urban":float(data.get('opt20'))
}
    vals = [float(val) for val in dev.values()]
    single_row_tensor = torch.tensor(vals, dtype=torch.float32).unsqueeze(0).unsqueeze(1)
    prediction3 = model3(single_row_tensor)
    # print('Received data:', option1, option2, option3)
    # Process the data here
    return {
        "message": "Prediction Successfull",
        "data": {
            # "wasting": int(prediction2.cpu().data.numpy().argmax()),
            # "Stunting": int(prediction1.cpu().data.numpy().argmax()),
            "Underweight_Overweight": int(prediction3.cpu().data.numpy().argmax()),
        },
    }

@app.route('/get-mongo', methods=['GET'])
def getData():
    client = MongoClient("mongodb+srv://nimisha:navrang@cluster1.9itkyjf.mongodb.net/")
    db = client["TFMini-s"]
    collection = db["tfmini"]

    # documentToAdd = {"device": "TFMini", "distance": distance, "strength": strength, "temperature": temperature}
    data = list(collection.find({}))  # Retrieve all documents in the collection
    for item in data:
        item['_id'] = str(item['_id'])

    return jsonify(data)

# def send_to_mongodb(distance, strength, temperature):
#     try:
#         client = MongoClient("mongodb+srv://nimisha:navrang@cluster1.9itkyjf.mongodb.net/")
#         db = client["TFMini-s"]
#         collection = db["tfmini"]

#         documentToAdd = {"device": "TFMini", "distance": distance, "strength": strength, "temperature": temperature}
#         data = list(collection.find({}))  # Retrieve all documents in the collection
#         return jsonify(data)

#     except Exception as e:
#         print("Error:", e)


if __name__ == "__main__":
    app.run(debug=True)
