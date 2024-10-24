# app.py
import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import openai

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure OpenAI API
openai.api_key = os.getenv('need to put api from  openai')


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_image():
    data = request.get_json()
    prompt = data.get('prompt')

    try:
        # Request an image from OpenAI API
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size="512x512",
            response_format="url"
        )
        image_url = response['data'][0]['url']
        return jsonify({'imageUrl': image_url})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Failed to generate image'}), 500

if __name__ == '__main__':
    app.run(debug=True)
