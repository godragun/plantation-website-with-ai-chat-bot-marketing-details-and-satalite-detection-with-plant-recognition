import functions_framework
from flask import jsonify, request
import google.generativeai as genai
import os


def get_gemini_model():
    """Return a configured Gemini model or raise if the API key is missing."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable is not set.")
    genai.configure(api_key=api_key)
    return genai.GenerativeModel("gemini-1.5-flash")

@functions_framework.http
def disease_detection(request):
    """HTTP Cloud Function for disease detection using Gemini Vision API."""
    
    if request.method != 'POST':
        return jsonify({'error': 'Method not allowed'}), 405
    
    try:
        # Get the image data from request
        image_data = request.get_json()
        
        if not image_data or 'image' not in image_data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Initialize Gemini model
        model = get_gemini_model()
        
        # Analyze the image for disease detection
        prompt = """
        Analyze this agricultural crop image and provide:
        1. Disease status (healthy/diseased)
        2. If diseased, identify the specific disease name
        3. Confidence percentage
        4. Treatment recommendations
        
        Focus on common crop diseases like blight, rust, powdery mildew, bacterial spots, etc.
        Provide practical, farmer-friendly advice.
        """
        
        response = model.generate_content([prompt, image_data['image']])
        
        # Parse response
        response_text = response.text
        lines = response_text.split('\n')
        
        status = "healthy"
        disease = None
        confidence = "0%"
        recommendation = "No specific treatment needed."
        
        for line in lines:
            line_lower = line.lower()
            if "diseased" in line_lower or "disease" in line_lower:
                status = "diseased"
            if "confidence" in line_lower or "%" in line:
                import re
                confidence_match = re.search(r'(\d+)%', line)
                if confidence_match:
                    confidence = confidence_match.group(1) + "%"
            if "treatment" in line_lower or "recommend" in line_lower:
                recommendation = line.strip()
        
        if status == "diseased":
            for line in lines:
                if any(disease_name in line_lower for disease_name in ["blight", "rust", "mildew", "spot", "rot", "wilt"]):
                    disease = line.strip()
                    break
        
        return jsonify({
            "status": status,
            "disease": disease,
            "confidence": confidence,
            "recommendation": recommendation
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@functions_framework.http
def chatbot(request):
    """HTTP Cloud Function for agricultural chatbot using Gemini."""
    
    if request.method != 'POST':
        return jsonify({'error': 'Method not allowed'}), 405
    
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({'error': 'No message provided'}), 400
        
        # Initialize Gemini model
        model = get_gemini_model()
        
        # Restrict to agricultural questions only
        agricultural_prompt = f"""
        You are an agricultural expert assistant. Only answer questions related to:
        - Crop farming and cultivation
        - Plant diseases and treatments
        - Soil management and fertilizers
        - Weather and irrigation
        - Agricultural best practices
        - Farm management
        
        If the question is not related to agriculture, politely decline and ask for an agricultural question.
        
        User question: {data['message']}
        
        Provide helpful, practical advice for farmers. Keep responses concise and actionable.
        """
        
        response = model.generate_content(agricultural_prompt)
        
        return jsonify({
            "response": response.text,
            "timestamp": "2024-01-01T00:00:00Z"
        })
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
