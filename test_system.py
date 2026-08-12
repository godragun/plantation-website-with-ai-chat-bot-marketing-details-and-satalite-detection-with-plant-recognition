#!/usr/bin/env python3
"""
Test script for Plantation Management System
"""

import requests
import json
import time
import subprocess
import sys
import os

def test_backend():
    """Test backend API endpoints"""
    print("🧪 Testing Backend API...")
    
    base_url = "http://localhost:8000"
    
    try:
        # Test health endpoint
        response = requests.get(f"{base_url}/docs", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is running")
            return True
        else:
            print("❌ Backend not responding")
            return False
    except requests.exceptions.RequestException:
        print("❌ Backend not accessible")
        return False

def test_frontend():
    """Test frontend accessibility"""
    print("🧪 Testing Frontend...")
    
    try:
        response = requests.get("http://localhost:3000", timeout=5)
        if response.status_code == 200:
            print("✅ Frontend is running")
            return True
        else:
            print("❌ Frontend not responding")
            return False
    except requests.exceptions.RequestException:
        print("❌ Frontend not accessible")
        return False

def test_gemini_integration():
    """Test Gemini API integration"""
    print("🧪 Testing Gemini API Integration...")
    
    try:
        # Test chatbot endpoint
        response = requests.post(
            "http://localhost:8000/api/chatbot",
            json={"message": "What is the best time to plant rice?"},
            headers={"Authorization": "Bearer mock-token"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if "response" in data:
                print("✅ Gemini Chatbot working")
                return True
            else:
                print("❌ Gemini response format incorrect")
                return False
        else:
            print(f"❌ Gemini API error: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Gemini API connection failed: {e}")
        return False

def check_images():
    """Check if all crop images are present"""
    print("🧪 Checking Crop Images...")
    
    images = [
        "frontend/images/crops/tea.jpg",
        "frontend/images/crops/cinnomon.webp", 
        "frontend/images/crops/eggplant.webp",
        "frontend/images/crops/peper.jpeg",
        "frontend/images/crops/rice_plant.png"
    ]
    
    missing_images = []
    for image in images:
        if not os.path.exists(image):
            missing_images.append(image)
    
    if missing_images:
        print(f"❌ Missing images: {missing_images}")
        return False
    else:
        print("✅ All crop images present")
        return True

def main():
    """Run all tests"""
    print("🚀 Plantation Management System - Test Suite")
    print("=" * 50)
    
    tests = [
        ("Crop Images", check_images),
        ("Backend API", test_backend),
        ("Frontend", test_frontend),
        ("Gemini Integration", test_gemini_integration)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"\n{test_name}:")
        result = test_func()
        results.append((test_name, result))
        time.sleep(1)
    
    print("\n" + "=" * 50)
    print("📊 Test Results:")
    
    passed = 0
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{len(results)} tests passed")
    
    if passed == len(results):
        print("\n🎉 All tests passed! System is ready to use.")
        print("\n🌐 Access your application:")
        print("   Frontend: http://localhost:3000")
        print("   Backend API: http://localhost:8000")
        print("   API Docs: http://localhost:8000/docs")
    else:
        print("\n⚠️  Some tests failed. Please check the issues above.")
        print("\n💡 To start the system:")
        print("   1. Run: start.bat")
        print("   2. Or manually start backend and frontend servers")

if __name__ == "__main__":
    main()
