from flask import Flask, request, jsonify
import json
from flask_cors import CORS
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from langchain.vectorstores import FAISS
import sys
import jinja2
import pdfkit
from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator
import os

app = Flask(__name__)
CORS(app)

os.environ["GOOGLE_API_KEY"] = os.environ.get('GOOGLE_API')
os.environ["OPENAI_API_KEY"] = os.environ.get('OPENAI_API')

def get_pdf_text(pdf_path):
    text = ""
    with open(pdf_path, "rb") as f:
        pdf_reader = PdfReader(f)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=os.environ["GOOGLE_API_KEY"])
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local("faiss_index")

def get_conversational_chain():
    prompt_template = """
        You are a doctor reviewing a medical report for a patient.
        Provide answers to patient's questions and suggest diet plans based on the report.
        Mention possible diseases if a healthy diet is not followed, based on the report's parameters.

        Context: {context}
        Question: {question}

        Answer:
    """

    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

def process_and_respond(pdf_path):
    # Process PDF text
    raw_text = get_pdf_text(pdf_path)
    text_chunks = get_text_chunks(raw_text)
    get_vector_store(text_chunks)

    # Initiate conversation without requiring a question
    context = raw_text  # Provide entire PDF text as context
    question = ""  # No initial question required
    chain = get_conversational_chain()
    response = chain({"input_documents": [], "context": context, "question": question})

    return response["output_text"]


@app.route('/analyzeReports', methods=['POST'])
def upload_file():
    # Define the directory where you want to save the uploaded file
    temp_directory = "/tmp"  # Change this to your desired directory

    # Ensure the directory exists, create if not
    if not os.path.exists(temp_directory):
        os.makedirs(temp_directory)

    # Define the complete path for the uploaded file
    temp_pdf_path = os.path.join(temp_directory, "uploaded_file.pdf")

    # Save the uploaded file
    file = request.files['file']
    file.save(temp_pdf_path)

    # Process and respond to the uploaded file
    response = process_and_respond(temp_pdf_path)
    sections = response.split("**Question:**")
    structured_json = {}
    for section in sections[1:]:
        question, answer = section.split("**Answer:**")
        structured_json[question.strip()] = answer.strip()
    return jsonify(structured_json), 200, {'Content-Type': 'application/json'}


if __name__ == "__main__":
    app.run(debug=True)
