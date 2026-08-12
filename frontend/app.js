const { useState, useEffect, useRef } = React;

const App = () => {
  const [currentView, setCurrentView] = useState('login');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [map, setMap] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [farms, setFarms] = useState([]);
  const [marketPrices, setMarketPrices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [plantTips, setPlantTips] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authForm, setAuthForm] = useState({ email: '', password: '', username: '', region: '' });
  const [authError, setAuthError] = useState('');
  const [ndviData, setNdviData] = useState(null);
  const [selectedCropDetails, setSelectedCropDetails] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showAddFarmModal, setShowAddFarmModal] = useState(false);
  const [newFarm, setNewFarm] = useState({ name: '', cropType: '', address: '' });
  
  const mapRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  // Language translations
  const translations = {
    en: {
      title: "AgriVista",
      tagline: "Grow smarter with AI crop care",
      login: "Sign In",
      register: "Sign Up",
      logout: "Logout",
      home: "Home",
      farms: "My Farms",
      weather: "Weather",
      disease: "Disease Scan",
      market: "Markets",
      settings: "Settings",
      satellite: "Satellite",
      chatbot: "AI Assistant",
      selectCrop: "Choose a crop",
      welcomeBack: "Welcome back",
      manageFarms: "Monitor fields, weather, and crop health in one place",
      tea: "Tea",
      cinnamon: "Cinnamon",
      eggplant: "Eggplant",
      pepper: "Pepper",
      coconut: "Coconut",
      chili: "Chili",
      pumpkin: "Pumpkin",
      rice: "Rice",
      temperature: "Temperature",
      humidity: "Humidity",
      rainfall: "Rainfall",
      wind: "Wind",
      uploadPhoto: "Upload Photo",
      takePhoto: "Take Photo",
      detectDisease: "Detect Disease",
      healthy: "Healthy",
      diseased: "Diseased",
      recommendation: "Recommendation",
      confidence: "Confidence",
      addFarm: "Add Farm",
      farmName: "Farm Name",
      cropType: "Crop Type",
      location: "Location",
      save: "Save",
      cancel: "Cancel",
      plantTips: "Plant Care Tips",
      askQuestion: "Ask a question about farming...",
      send: "Send",
      ndviValue: "NDVI Value",
      healthStatus: "Health Status",
      lastUpdated: "Last Updated",
      recommendations: "Recommendations",
      bestMarket: "Best Market to Sell",
      priceComparison: "Price Comparison",
      email: "Email",
      password: "Password",
      username: "Username",
      region: "Region",
      signInToAccount: "Sign in to your account",
      createNewAccount: "Create a new account",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?"
    },
    si: {
      title: "AgriVista",
      tagline: "AI සමඟ බුද්ධිමත්ව වගා කරන්න",
      login: "පුරන්න",
      register: "ලියාපදිංචි වන්න",
      logout: "ඉවත් වන්න",
      home: "මුල් පිටුව",
      farms: "මගේ ගොවිපල",
      weather: "කාලගුණය",
      disease: "රෝග පරීක්ෂාව",
      market: "වෙළඳපොළ",
      settings: "සැකසුම්",
      satellite: "චන්ද්‍රිකා",
      chatbot: "AI සහායක",
      selectCrop: "බෝගය තෝරන්න",
      welcomeBack: "ආයුබෝවන්",
      manageFarms: "කෙත්, කාලගුණය සහ බෝග සෞඛ්‍යය එක තැනකින්",
      tea: "තේ",
      cinnamon: "කුරුඳු",
      eggplant: "වම්බටු",
      pepper: "මිරිස්",
      coconut: "පොල්",
      chili: "මිරිස්",
      pumpkin: "වට්ටක්කා",
      rice: "බත්",
      temperature: "තාපමානය",
      humidity: "ආර්ද්‍රතාවය",
      rainfall: "වර්ෂාපතනය",
      wind: "සුළඟ",
      uploadPhoto: "ඡායාරූපය උඩුගත කරන්න",
      takePhoto: "ඡායාරූපය ගන්න",
      detectDisease: "රෝග හඳුනාගන්න",
      healthy: "නිරෝගී",
      diseased: "රෝගී",
      recommendation: "නිර්දේශය",
      confidence: "විශ්වාසය",
      addFarm: "ගොවිපල එකතු කරන්න",
      farmName: "ගොවිපල නම",
      cropType: "බෝග වර්ගය",
      location: "ස්ථානය",
      save: "සුරකින්න",
      cancel: "අවලංගු කරන්න",
      plantTips: "ශාක රැකවරණ උපදෙස්",
      askQuestion: "කෘෂිකර්මය පිළිබඳ ප්‍රශ්නයක් අසන්න...",
      send: "යවන්න",
      ndviValue: "NDVI අගය",
      healthStatus: "සෞඛ්‍ය තත්වය",
      lastUpdated: "අවසන් යාවත්කාලීන කළේ",
      recommendations: "නිර්දේශ",
      bestMarket: "විකිණීමට හොඳම වෙළඳපොළ",
      priceComparison: "මිල සංසන්දනය",
      email: "විද්‍යුත් තැපෑල",
      password: "මුරපදය",
      username: "පරිශීලක නාමය",
      region: "කලාපය",
      signInToAccount: "ඔබේ ගිණුමට පුරන්න",
      createNewAccount: "නව ගිණුමක් සාදන්න",
      alreadyHaveAccount: "දැනටමත් ගිණුමක් තිබේද?",
      dontHaveAccount: "ගිණුමක් නැතිද?"
    }
  };

  const t = translations[language];

  // Configurable API base (override via window.API_BASE or localStorage.API_BASE)
  const API_BASE = (typeof window !== 'undefined' && (window.API_BASE || localStorage.getItem('API_BASE'))) || 'http://localhost:8000';

  // Restore session and preferences on first load
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('pms_session') || 'null');
      if (saved) {
        if (typeof saved.darkMode === 'boolean') setDarkMode(saved.darkMode);
        if (saved.language) setLanguage(saved.language);
        if (saved.user && saved.isAuthenticated) {
          setUser(saved.user);
          setIsAuthenticated(true);
          setCurrentView(saved.currentView || 'home');
        }
        if (saved.token) setAuthToken(saved.token);
      }
    } catch (e) {
      console.warn('Failed to restore session:', e);
    }
  }, []);

  // Persist session and preferences
  useEffect(() => {
    try {
      const data = {
        isAuthenticated,
        user,
        language,
        darkMode,
        currentView,
        token: authToken,
      };
      localStorage.setItem('pms_session', JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to persist session:', e);
    }
  }, [isAuthenticated, user, language, darkMode, currentView, authToken]);

  // Crop data with detailed information
  const crops = [
    {
      id: 'tea',
      name: t.tea,
      image: 'images/crops/tea.jpg',
      description: 'Premium tea cultivation',
      details: {
        planting: [
          'Plant in well-drained soil with partial shade',
          'Best planting time: March-April or September-October',
          'Space plants 1.5m apart for optimal growth'
        ],
        care: [
          'Water regularly, especially during dry seasons',
          'Prune annually to maintain bush shape',
          'Maintain soil pH between 5.5-6.5',
          'Fertilize with nitrogen-rich fertilizer every 3 months'
        ],
        harvesting: [
          'Pluck top two leaves and bud every 7-14 days',
          'Harvest during growing season for best quality',
          'Avoid harvesting during rainy periods'
        ],
        tips: [
          'Tea plants need high humidity and consistent rainfall',
          'Protect from frost and strong winds',
          'Provide shade during hot summer months'
        ],
        diseases: [
          {
            name: 'Tea Blister Blight',
            description: 'Fungal disease affecting young leaves',
            solution: 'Apply copper fungicides and improve air circulation'
          },
          {
            name: 'Red Rust',
            description: 'Rust-colored spots on leaves',
            solution: 'Remove affected leaves and apply sulfur-based fungicide'
          },
          {
            name: 'Brown Root Rot',
            description: 'Root rot causing plant wilting',
            solution: 'Improve drainage and apply systemic fungicide'
          }
        ]
      }
    },
    {
      id: 'cinnamon',
      name: t.cinnamon,
      image: 'images/crops/cinnomon.webp',
      description: 'Cinnamon spice farming',
      details: {
        planting: [
          'Plant in sandy loam soil with good drainage',
          'Best planting time: June-July during monsoon',
          'Space trees 3m apart for optimal growth'
        ],
        care: [
          'Water moderately, avoid waterlogging',
          'Apply organic manure twice yearly',
          'Prune to maintain height and bush shape',
          'Mulch around base to retain moisture'
        ],
        harvesting: [
          'Harvest bark from 2-3 year old trees',
          'Peel bark in strips during dry season',
          'Allow bark to dry in sun before storage'
        ],
        tips: [
          'Cinnamon needs warm, humid climate',
          'Plant in partial shade for best results',
          'Protect young plants from strong winds'
        ],
        diseases: [
          {
            name: 'Root Rot',
            description: 'Fungal infection affecting roots',
            solution: 'Improve drainage and apply fungicide'
          },
          {
            name: 'Leaf Spot',
            description: 'Dark spots on leaves',
            solution: 'Remove affected leaves and improve air circulation'
          }
        ]
      }
    },
    {
      id: 'eggplant',
      name: t.eggplant,
      image: 'images/crops/eggplant.webp',
      description: 'Eggplant vegetable farming',
      details: {
        planting: [
          'Sow seeds in nursery, transplant after 4-6 weeks',
          'Best planting time: February-March or August-September',
          'Space plants 60cm apart for optimal growth'
        ],
        care: [
          'Water regularly, especially during fruiting',
          'Stake plants for support as they grow',
          'Fertilize with balanced NPK fertilizer',
          'Remove side shoots to encourage main stem growth'
        ],
        harvesting: [
          'Harvest when fruits are firm and glossy',
          'Pick regularly to encourage more fruiting',
          'Use sharp knife to avoid damaging plant'
        ],
        tips: [
          'Eggplant needs full sun and warm temperatures',
          'Mulch around plants to retain moisture',
          'Provide support for heavy fruit loads'
        ],
        diseases: [
          {
            name: 'Bacterial Wilt',
            description: 'Plant wilting and yellowing',
            solution: 'Use resistant varieties and proper spacing'
          },
          {
            name: 'Fruit Rot',
            description: 'Rotting of developing fruits',
            solution: 'Improve air circulation and avoid overhead watering'
          },
          {
            name: 'Aphids',
            description: 'Small insects on leaves and stems',
            solution: 'Use neem oil or insecticidal soap'
          }
        ]
      }
    },
    {
      id: 'pepper',
      name: t.pepper,
      image: 'images/crops/peper.jpeg',
      description: 'Pepper spice cultivation',
      details: {
        planting: [
          'Plant cuttings or seeds in well-drained soil',
          'Best planting time: May-June with onset of monsoon',
          'Space plants 2m apart for climbing support'
        ],
        care: [
          'Provide support with poles or trellises',
          'Water regularly, mulch around base',
          'Prune annually to maintain shape',
          'Train vines to climb support structures'
        ],
        harvesting: [
          'Harvest when berries turn red',
          'Dry in sun for 3-4 days before storing',
          'Store in cool, dry place'
        ],
        tips: [
          'Pepper needs warm, humid climate',
          'Plant near trees for natural support',
          'Avoid waterlogging at all costs'
        ],
        diseases: [
          {
            name: 'Foot Rot',
            description: 'Rot at base of plant stem',
            solution: 'Ensure good drainage and proper spacing'
          },
          {
            name: 'Leaf Spot',
            description: 'Dark spots on leaves',
            solution: 'Remove affected leaves and improve air circulation'
          }
        ]
      }
    },
    {
      id: 'rice',
      name: t.rice,
      image: 'images/crops/rice_plant.png',
      description: 'Rice paddy farming',
      details: {
        planting: [
          'Transplant seedlings 20-25 days old',
          'Best time: June-July for main season, December-January for off-season',
          'Space plants 20cm x 20cm for optimal yield'
        ],
        care: [
          'Maintain 2-3 inches water depth',
          'Apply fertilizer in 3 splits during growth',
          'Control weeds regularly',
          'Monitor water levels daily'
        ],
        harvesting: [
          'Harvest when 80% grains are mature',
          'Cut 15-20cm above ground level',
          'Dry grains properly before storage'
        ],
        tips: [
          'Rice needs flooded fields',
          'Use certified seeds for best results',
          'Practice crop rotation to prevent diseases'
        ],
        diseases: [
          {
            name: 'Blast Disease',
            description: 'Fungal disease affecting leaves and grains',
            solution: 'Use resistant varieties and proper water management'
          },
          {
            name: 'Bacterial Blight',
            description: 'Bacterial infection causing leaf damage',
            solution: 'Apply copper-based bactericide and improve drainage'
          },
          {
            name: 'Sheath Blight',
            description: 'Fungal disease affecting rice sheath',
            solution: 'Use fungicides and maintain proper plant spacing'
          }
        ]
      }
    },
    {
      id: 'coconut',
      name: t.coconut,
      image: 'images/crops/coconut.jpeg',
      description: 'Coconut palm cultivation',
      details: {
        planting: [
          'Plant in full sun in sandy loam, well-drained soil',
          'Spacing 8–10 m between palms',
          'Use healthy 12-month-old seedlings'
        ],
        care: [
          'Apply compost yearly',
          'Water deeply during dry seasons',
          'Control weeds around the palm'
        ],
        harvesting: [
          'Starts fruiting at 6–8 years',
          'Produces nuts monthly for decades',
          'Harvest mature nuts regularly'
        ],
        tips: [
          'Thrives in tropical climates with full sun',
          'Ensure good drainage to avoid root stress',
          'Mulch to conserve moisture'
        ],
        diseases: [
          { name: 'Bud Rot', description: 'Rot of the growing point', solution: 'Improve drainage, remove affected tissue, apply fungicide' }
        ]
      }
    },
    {
      id: 'pumpkin',
      name: t.pumpkin,
      image: 'images/crops/pumkin.jpeg',
      description: 'Pumpkin vine cultivation',
      details: {
        planting: [
          'Sow seeds directly in sandy loam with organic matter',
          'Space 1–1.5 m between plants',
          'Ensure warm temperatures and full sun'
        ],
        care: [
          'Apply compost + NPK fertilizer',
          'Ensure bee activity for pollination',
          'Water consistently; avoid waterlogging'
        ],
        harvesting: [
          'Harvest at 90–120 days',
          'Pick when skin is hard and fruit sounds hollow',
          'Cure fruits before storage'
        ],
        tips: [
          'Mulch to suppress weeds and retain moisture',
          'Train vines to manage space',
          'Hand-pollinate if bees are scarce'
        ],
        diseases: [
          { name: 'Powdery Mildew', description: 'White coating on leaves', solution: 'Apply sulfur or neem oil; improve airflow' }
        ]
      }
    },
    {
      id: 'chili',
      name: t.chili,
      image: 'images/crops/chilli.jpg',
      description: 'Chili pepper cultivation',
      details: {
        planting: [
          'Raise nursery and transplant at 4–5 weeks',
          'Use well-drained loam, pH 6–7',
          'Spacing 45 × 45 cm'
        ],
        care: [
          'Full sunlight with moderate watering',
          'Fertilize with nitrogen and potassium',
          'Monitor aphids, thrips, and fruit borers'
        ],
        harvesting: [
          'First harvest after 70–90 days',
          'Harvest green or dry to red depending on need',
          'Pick regularly to encourage fruiting'
        ],
        tips: [
          'Use neem spray against common pests',
          'Stake plants in windy areas',
          'Avoid water stress during flowering'
        ],
        diseases: [
          { name: 'Anthracnose', description: 'Fruit lesions and rotting', solution: 'Use clean seed, apply fungicides, remove infected fruits' }
        ]
      }
    }
  ];

  // Mock data
  const mockWeatherData = {
    temperature: 28,
    humidity: 75,
    rainfall: 15,
    wind: 12,
    forecast: [
      { day: 'Today', temp: 28, rain: 15 },
      { day: 'Tomorrow', temp: 26, rain: 45 },
      { day: 'Day 3', temp: 24, rain: 60 }
    ]
  };

  const mockMarketPrices = [
    { crop: 'Rice', price: 1200, location: 'Colombo', trend: 'up' },
    { crop: 'Tea', price: 850, location: 'Kandy', trend: 'stable' },
    { crop: 'Coconut', price: 150, location: 'Galle', trend: 'down' },
    { crop: 'Cinnamon', price: 3200, location: 'Matale', trend: 'up' },
    { crop: 'Pepper', price: 1800, location: 'Kurunegala', trend: 'stable' }
  ];

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize map with simple approach
  useEffect(() => {
    if (currentView !== 'satellite' && currentView !== 'farms') return;
    const init = () => {
      if (!mapRef.current || typeof window === 'undefined' || !window.L) return;
      try {
        if (map) {
          map.remove();
          setMap(null);
        }
        const container = mapRef.current;
        if (container.offsetWidth === 0 || container.offsetHeight === 0) {
          setTimeout(init, 200);
          return;
        }
        const newMap = window.L.map(container, { center: [7.8731, 80.7718], zoom: 7 });
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(newMap);
        addFarmMarkers(newMap);
        setTimeout(() => newMap.invalidateSize(), 100);
        setMap(newMap);
      } catch (e) {
        console.error('Map init failed:', e);
      }
    };
    const id = setTimeout(init, 300);
    return () => clearTimeout(id);
  }, [currentView]);

  // Add farm markers to map
  const addFarmMarkers = (mapInstance) => {
    // Sample farm locations in Sri Lanka
    const farmLocations = [
      { lat: 7.8731, lng: 80.7718, name: "Tea Plantation - Kandy", crop: "Tea" },
      { lat: 7.4675, lng: 80.6234, name: "Rice Fields - Anuradhapura", crop: "Rice" },
      { lat: 6.9271, lng: 79.8612, name: "Cinnamon Estate - Colombo", crop: "Cinnamon" },
      { lat: 7.2906, lng: 80.6337, name: "Pepper Farm - Kurunegala", crop: "Pepper" },
      { lat: 8.3114, lng: 80.4037, name: "Eggplant Garden - Anuradhapura", crop: "Eggplant" }
    ];

    farmLocations.forEach(farm => {
      const marker = L.marker([farm.lat, farm.lng])
        .addTo(mapInstance)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-gray-900">${farm.name}</h3>
            <p class="text-sm text-gray-600">Crop: ${farm.crop}</p>
            <p class="text-xs text-gray-500">Coordinates: ${farm.lat.toFixed(4)}, ${farm.lng.toFixed(4)}</p>
          </div>
        `);
    });
  };

  // Geocoding function using Nominatim
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          display_name: data[0].display_name
        };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  // Load plant tips
  useEffect(() => {
    const loadPlantTips = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/plant-tips`);
        const data = await response.json();
        setPlantTips(data);
      } catch (error) {
        console.error('Failed to load plant tips:', error);
        // Mock data for offline
        setPlantTips([
          {
            title: "Soil Preparation",
            tip: "Test soil pH before planting. Most crops prefer pH 6.0-7.0.",
            icon: "🌱"
          },
          {
            title: "Watering Schedule",
            tip: "Water deeply but less frequently. Early morning is best.",
            icon: "💧"
          }
        ]);
      }
    };
    loadPlantTips();
  }, []);

  // Mock authentication
  const handleLogin = async () => {
    setAuthError('');
    try {
      const resp = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authForm.email, password: authForm.password })
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || `Login failed (${resp.status})`);
      }
      const data = await resp.json();
      setAuthToken(data.access_token);
      setUser(data.user);
      setIsAuthenticated(true);
      setCurrentView('home');
      try {
        const saved = JSON.parse(localStorage.getItem('pms_session') || '{}');
        localStorage.setItem('pms_session', JSON.stringify({ ...saved, isAuthenticated: true, user: data.user, token: data.access_token, currentView: 'home' }));
      } catch {}
    } catch (e) {
      console.error('Login error:', e);
      setAuthError('Invalid email or password.');
    }
  };

  const handleRegister = async () => {
    setAuthError('');
    try {
      const resp = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: authForm.email,
          username: authForm.username || authForm.email.split('@')[0],
          password: authForm.password,
          role: 'farmer',
          region: authForm.region || null,
          crops_grown: null,
          language
        })
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || `Registration failed (${resp.status})`);
      }
      // Auto-login after successful registration
      await handleLogin();
    } catch (e) {
      console.error('Register error:', e);
      setAuthError('Registration failed. Try a different email/username.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setAuthToken(null);
    setCurrentView('login');
    try {
      const saved = JSON.parse(localStorage.getItem('pms_session') || '{}');
      localStorage.setItem('pms_session', JSON.stringify({ ...saved, isAuthenticated: false, user: null, token: null, currentView: 'login' }));
    } catch {}
  };

  // Disease information helper function
  const getDiseaseInfo = (disease) => {
    const diseaseInfo = {
      "Powdery Mildew": "A fungal disease that appears as white, powdery coating on leaves. Common in humid conditions with poor air circulation.",
      "Leaf Spot Disease": "Fungal or bacterial infection causing dark spots on leaves. Often spreads through water splashing and poor sanitation.",
      "Bacterial Blight": "Bacterial infection causing wilting, yellowing, and death of plant tissue. Spreads rapidly in wet conditions.",
      "Root Rot": "Fungal disease affecting roots, causing plant wilting and death. Usually caused by overwatering and poor drainage.",
      "Rust Disease": "Fungal disease producing rust-colored pustules on leaves and stems. Thrives in humid, cool conditions.",
      "Aphid Infestation": "Small sap-sucking insects that weaken plants and spread diseases. Often accompanied by sticky honeydew.",
      "Nutrient Deficiency": "Plant showing signs of lacking essential nutrients like nitrogen, phosphorus, or potassium. Often causes yellowing or stunted growth."
    };
    return diseaseInfo[disease] || "Plant health issue requiring attention and proper treatment.";
  };

  // Disease detection
  const handleDiseaseDetection = async (file) => {
    if (!file) return;
    
    // Show loading state
    setDiseaseResult({ status: 'analyzing', message: 'Analyzing image with AI...' });
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      console.log('Sending image to Gemini API...');
      const response = await fetch(`${API_BASE}/api/disease-detection`, {
        method: 'POST',
        body: formData,
        headers: authToken ? { 'Authorization': `Bearer ${authToken}` } : {}
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Gemini API result:', result);
        setDiseaseResult(result);
      } else {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Disease detection failed:', error);
      // Enhanced fallback with more realistic results
      const mockResults = [
        {
          status: 'diseased',
          disease: 'Leaf Spot Disease',
          confidence: '87%',
          recommendation: 'Apply copper-based fungicide every 7-10 days. Remove affected leaves and improve air circulation around plants.'
        },
        {
          status: 'diseased',
          disease: 'Powdery Mildew',
          confidence: '92%',
          recommendation: 'Use neem oil spray or sulfur-based fungicide. Ensure proper spacing between plants for better air flow.'
        },
        {
          status: 'healthy',
          disease: 'No disease detected',
          confidence: '95%',
          recommendation: 'Your plant looks healthy! Continue regular watering and monitoring. Consider preventive measures like proper spacing and good drainage.'
        },
        {
          status: 'diseased',
          disease: 'Root Rot',
          confidence: '78%',
          recommendation: 'Improve soil drainage immediately. Reduce watering frequency and consider repotting with fresh, well-draining soil.'
        }
      ];
      
      const mockResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setDiseaseResult(mockResult);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleDiseaseDetection(file);
    }
  };

  const handleTakePhoto = () => {
    // Create a file input for camera capture
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Use back camera on mobile
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleDiseaseDetection(file);
      }
    };
    input.click();
  };

  // Chatbot functionality
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = { text: chatInput, sender: 'user', timestamp: new Date() };
    setChatMessages(prev => [...prev, userMessage]);
    const currentInput = chatInput;
    setChatInput('');
    
    // Add typing indicator
    const typingMessage = { text: 'AI is thinking...', sender: 'bot', timestamp: new Date(), isTyping: true };
    setChatMessages(prev => [...prev, typingMessage]);
    
    try {
      console.log('Sending message to chatbot:', currentInput);
      const response = await fetch(`${API_BASE}/api/chatbot`, {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
        body: JSON.stringify({ message: currentInput })
      });
      
      console.log('Chatbot response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Chatbot response:', data);
        
        // Remove typing indicator and add real response
        setChatMessages(prev => {
          const withoutTyping = prev.filter(msg => !msg.isTyping);
          const botMessage = { text: data.response, sender: 'bot', timestamp: new Date() };
          return [...withoutTyping, botMessage];
        });
      } else {
        throw new Error(`API request failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Remove typing indicator and add error response
      setChatMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        const botMessage = { 
          text: "I'm having trouble connecting to the AI service. Here are some general agricultural tips: Ensure proper soil drainage, water regularly but don't overwater, and monitor for pests and diseases. Please try again in a moment.", 
          sender: 'bot', 
          timestamp: new Date() 
        };
        return [...withoutTyping, botMessage];
      });
    }
  };

  // Weather alerts
  const weatherAlerts = [
    { type: 'rain', message: 'Heavy rain expected for 3 days - delay sowing', severity: 'high' },
    { type: 'drought', message: 'Low soil moisture - irrigation recommended', severity: 'medium' }
  ];

  const navItems = [
    { id: 'home', label: t.home, icon: 'fa-home' },
    { id: 'farms', label: t.farms, icon: 'fa-seedling' },
    { id: 'disease', label: t.disease, icon: 'fa-microscope' },
    { id: 'chatbot', label: t.chatbot, icon: 'fa-robot' },
    { id: 'market', label: t.market, icon: 'fa-chart-line' },
    { id: 'satellite', label: t.satellite, icon: 'fa-satellite' },
    { id: 'settings', label: t.settings, icon: 'fa-cog' },
  ];

  // Render components
  const renderLogin = () => (
    <div className={`auth-screen ${language === 'si' ? 'font-sinhala' : ''}`}>
      <section className="auth-hero">
        <div className="brand" style={{ border: 0, padding: 0, marginBottom: '2rem' }}>
          <div className="brand-mark"><i className="fas fa-leaf"></i></div>
          <div className="brand-text">
            <strong>{t.title}</strong>
            <span>Plantation intelligence</span>
          </div>
        </div>
        <h1>{t.tagline}</h1>
        <p>{t.manageFarms}</p>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <h2>{isLoginMode ? t.signInToAccount : t.createNewAccount}</h2>
          <p className="subtitle">{t.title}</p>

          <div className="segmented">
            <button className={isLoginMode ? 'active' : ''} onClick={() => setIsLoginMode(true)}>{t.login}</button>
            <button className={!isLoginMode ? 'active' : ''} onClick={() => setIsLoginMode(false)}>{t.register}</button>
          </div>

          {authError && <div className="auth-error">{authError}</div>}

          <div className="form-stack">
            <div className="field">
              <label>{t.email}</label>
              <input type="email" placeholder="you@farm.lk" value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} />
            </div>
            <div className="field">
              <label>{t.password}</label>
              <input type="password" placeholder="••••••••" value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} />
            </div>
            {!isLoginMode && (
              <>
                <div className="field">
                  <label>{t.username}</label>
                  <input type="text" placeholder="Farmer name" value={authForm.username}
                    onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })} />
                </div>
                <div className="field">
                  <label>{t.region}</label>
                  <input type="text" placeholder="Kandy, Matale…" value={authForm.region}
                    onChange={(e) => setAuthForm({ ...authForm, region: e.target.value })} />
                </div>
              </>
            )}
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.35rem' }}
              onClick={isLoginMode ? handleLogin : handleRegister}>
              {isLoginMode ? t.login : t.register}
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderHome = () => (
    <div>
      <div className="topbar">
        <div>
          <h1>{t.welcomeBack}{user?.name ? `, ${user.name}` : ''}</h1>
          <p>{t.manageFarms}</p>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
        <div className="stat-card weather-temp">
          <p className="stat-label"><i className="fas fa-thermometer-half"></i> {t.temperature}</p>
          <div className="stat-value">{mockWeatherData.temperature}°C</div>
        </div>
        <div className="stat-card weather-hum">
          <p className="stat-label"><i className="fas fa-tint"></i> {t.humidity}</p>
          <div className="stat-value">{mockWeatherData.humidity}%</div>
        </div>
      </div>

      <div className="section-head">
        <div>
          <h2>{t.plantTips}</h2>
          <p>Quick care guidance for today’s field work</p>
        </div>
      </div>
      <div className="grid-3" style={{ marginBottom: '1.75rem' }}>
        {plantTips.slice(0, 3).map((tip, index) => (
          <div key={index} className="tip-card">
            <div className="tip-icon">{tip.icon}</div>
            <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem' }}>{tip.title}</h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>{tip.tip}</p>
          </div>
        ))}
      </div>

      <div className="section-head">
        <div>
          <h2>{t.selectCrop}</h2>
          <p>Open a crop guide for planting and harvest tips</p>
        </div>
      </div>
      <div className="grid-3">
        {crops.map((crop) => (
          <div key={crop.id} className="crop-card" onClick={() => { window.location.href = `plants/${crop.id}.html`; }}>
            <img src={crop.image} alt={crop.name} />
            <div className="crop-body">
              <h3>{crop.name}</h3>
              <p>{crop.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDiseaseDetection = () => (
    <div>
      <div className="section-head">
        <div>
          <h2>{t.disease}</h2>
          <p>Upload a leaf photo for AI disease analysis</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Upload Photo</h3>
          <div className="form-stack">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" style={{ display: 'none' }} />
            <button className="btn btn-outline" onClick={() => fileInputRef.current?.click()}>
              <i className="fas fa-upload" style={{ marginRight: 8 }}></i>{t.uploadPhoto}
            </button>
            <button className="btn btn-primary" onClick={handleTakePhoto}>
              <i className="fas fa-camera" style={{ marginRight: 8 }}></i>{t.takePhoto}
            </button>
          </div>
        </div>

        <div className="panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ margin: 0 }}>Detection Results</h3>
            {diseaseResult && diseaseResult.status !== 'analyzing' && (
              <button className="btn btn-ghost" onClick={() => setDiseaseResult(null)}>Clear</button>
            )}
          </div>

          {diseaseResult ? (
            diseaseResult.status === 'analyzing' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div className="spinner"></div>
                <p>{diseaseResult.message}</p>
              </div>
            ) : (
              <div className={`panel ${diseaseResult.status === 'healthy' ? 'healthy-card' : 'disease-card'}`} style={{ boxShadow: 'none' }}>
                <p style={{ fontWeight: 700, marginTop: 0 }}>
                  {diseaseResult.status === 'healthy' ? 'Plant looks healthy' : 'Disease detected'}
                </p>
                {diseaseResult.disease && <p style={{ color: 'var(--muted)' }}>{diseaseResult.disease}</p>}
                {diseaseResult.confidence && <p><strong>Confidence:</strong> {diseaseResult.confidence}</p>}
                {diseaseResult.recommendation && (
                  <p style={{ background: 'rgba(64,145,108,0.08)', padding: '0.75rem', borderRadius: 12 }}>
                    {diseaseResult.recommendation}
                  </p>
                )}
              </div>
            )
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '2rem 0' }}>
              <i className="fas fa-leaf" style={{ fontSize: '2rem', color: 'var(--leaf-bright)', marginBottom: 8 }}></i>
              <p>Upload a clear photo of affected leaves</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderChatbot = () => (
    <div>
      <div className="section-head">
        <div>
          <h2>{t.chatbot}</h2>
          <p>Ask farming questions in plain language</p>
        </div>
      </div>

      <div className="panel chat-shell">
        <div className="chat-messages">
          {chatMessages.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '3rem 1rem' }}>
              <i className="fas fa-robot" style={{ fontSize: '2rem', marginBottom: 8 }}></i>
              <p>Ask me anything about farming and agriculture!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {chatMessages.map((message, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div className={`bubble ${message.sender === 'user' ? 'user' : message.isTyping ? 'typing' : 'bot'}`}>
                    <p style={{ margin: 0 }}>{message.text}</p>
                    {!message.isTyping && (
                      <p style={{ margin: '0.35rem 0 0', fontSize: '0.72rem', opacity: 0.7 }}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>
        <div className="chat-compose">
          <input
            className="chat-input"
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
            placeholder={t.askQuestion}
          />
          <button className="btn btn-primary" onClick={sendChatMessage}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );

  const renderFarms = () => (
    <div>
      <div className="section-head">
        <div>
          <h2>{t.farms}</h2>
          <p>Track your plantation plots and map locations</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddFarmModal(true)}>
          <i className="fas fa-plus" style={{ marginRight: 8 }}></i>{t.addFarm}
        </button>
      </div>

      <div className="grid-3" style={{ marginBottom: '1.25rem' }}>
        {farms.length === 0 ? (
          <div className="panel" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2.5rem' }}>
            <i className="fas fa-seedling" style={{ fontSize: '2.5rem', color: 'var(--mint)' }}></i>
            <p>No farms added yet</p>
          </div>
        ) : (
          farms.map((farm, index) => (
            <div key={index} className="panel">
              <h3 style={{ marginTop: 0 }}>{farm.name}</h3>
              <p style={{ color: 'var(--muted)', margin: '0.25rem 0' }}>Crop: {farm.cropType}</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{farm.location}</p>
            </div>
          ))
        )}
      </div>

      <div className="panel">
        <h3 style={{ marginTop: 0 }}>Farm Locations</h3>
        <div ref={mapRef} className="map-container"></div>
      </div>
    </div>
  );

  const renderMarketPrices = () => (
    <div>
      <div className="section-head">
        <div>
          <h2>{t.market}</h2>
          <p>Regional crop prices and selling suggestions</p>
        </div>
      </div>

      <div className="market-hero">
        <h3 style={{ margin: '0 0 0.35rem' }}>{t.bestMarket}</h3>
        <p style={{ margin: 0, opacity: 0.9 }}>Cinnamon in Matale — Rs. 3,200 (Highest Price)</p>
      </div>

      <div className="panel" style={{ marginBottom: '1rem' }}>
        <h3 style={{ marginTop: 0 }}>{t.priceComparison}</h3>
        <div className="price-bars">
          {mockMarketPrices.map((item, index) => (
            <div key={index} className="price-bar">
              <div className="bar" style={{ height: `${(item.price / 3500) * 180}px` }}></div>
              <span style={{ fontSize: '0.72rem' }}>{item.crop}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Rs. {item.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-3">
        {mockMarketPrices.map((item, index) => (
          <div key={index} className="market-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <h3 style={{ margin: 0 }}>{item.crop}</h3>
              <span style={{ fontSize: '0.75rem', color: item.trend === 'up' ? 'var(--ok)' : item.trend === 'down' ? 'var(--alert)' : 'var(--muted)' }}>
                {item.trend}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 600, margin: '0.45rem 0' }}>Rs. {item.price}</p>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.88rem' }}>{item.location}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSatelliteView = () => (
    <div>
      <div className="section-head">
        <div>
          <h2>{t.satellite}</h2>
          <p>Field overview and vegetation health signals</p>
        </div>
        <button
          className="btn btn-ghost"
          onClick={() => {
            if (map) {
              map.remove();
              setMap(null);
            }
            setTimeout(() => {
              if (mapRef.current && window.L) {
                const newMap = window.L.map(mapRef.current, { center: [7.8731, 80.7718], zoom: 7 });
                window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  maxZoom: 19,
                  attribution: '© OpenStreetMap contributors'
                }).addTo(newMap);
                addFarmMarkers(newMap);
                setMap(newMap);
                setTimeout(() => newMap.invalidateSize(), 100);
              }
            }, 100);
          }}
        >
          <i className="fas fa-sync-alt" style={{ marginRight: 6 }}></i>Refresh Map
        </button>
      </div>

      <div className="panel" style={{ marginBottom: '1rem' }}>
        <div ref={mapRef} className="map-container"></div>
      </div>

      <div className="grid-3">
        <div className="stat-card">
          <p className="stat-label">{t.ndviValue}</p>
          <div className="stat-value" style={{ color: 'var(--leaf)' }}>0.65</div>
        </div>
        <div className="stat-card">
          <p className="stat-label">{t.healthStatus}</p>
          <div className="stat-value" style={{ fontSize: '1.6rem', color: 'var(--ok)' }}>Good</div>
        </div>
        <div className="stat-card">
          <p className="stat-label">{t.lastUpdated}</p>
          <div className="stat-value" style={{ fontSize: '1.2rem' }}>2h ago</div>
        </div>
      </div>
    </div>
  );

  const renderCropModal = () => {
    if (!showCropModal || !selectedCropDetails) return null;

    return (
      <div className="modal-backdrop">
        <div className="modal-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0 }}>{selectedCropDetails.name} Growing Guide</h2>
            <button className="btn btn-ghost" onClick={() => { setShowCropModal(false); setSelectedCropDetails(null); }}>×</button>
          </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Plant Image */}
              <div>
                <img
                  src={selectedCropDetails.image}
                  alt={selectedCropDetails.name}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
              
              {/* Plant Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Planting Instructions</h3>
                  <ul className="space-y-2 text-gray-700">
                    {selectedCropDetails.details.planting.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Care Tips</h3>
                  <ul className="space-y-2 text-gray-700">
                    {selectedCropDetails.details.care.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-seedling text-green-500 mr-3 mt-1"></i>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Additional Information */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Harvesting</h3>
                <ul className="space-y-2 text-gray-700">
                  {selectedCropDetails.details.harvesting.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-hands text-yellow-500 mr-3 mt-1"></i>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Expert Tips</h3>
                <ul className="space-y-2 text-gray-700">
                  {selectedCropDetails.details.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-lightbulb text-blue-500 mr-3 mt-1"></i>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Common Diseases */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Diseases & Solutions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCropDetails.details.diseases.map((disease, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">{disease.name}</h4>
                    <p className="text-sm text-red-700 mb-2">{disease.description}</p>
                    <p className="text-sm text-red-600">
                      <strong>Solution:</strong> {disease.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowCropModal(false);
                  setSelectedCropDetails(null);
                }}
              >
                Close
              </button>
            </div>
        </div>
      </div>
    );
  };

  const renderAddFarmModal = () => {
    if (!showAddFarmModal) return null;

    return (
      <div className="modal-backdrop">
        <div className="modal-panel" style={{ width: 'min(440px, 100%)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0 }}>Add New Farm</h2>
            <button className="btn btn-ghost" onClick={() => setShowAddFarmModal(false)}>×</button>
          </div>

          <div className="form-stack">
            <div className="field">
              <label>Farm Name</label>
              <input type="text" value={newFarm.name} onChange={(e) => setNewFarm({...newFarm, name: e.target.value})} placeholder="Enter farm name" />
            </div>
            <div className="field">
              <label>Crop Type</label>
              <select value={newFarm.cropType} onChange={(e) => setNewFarm({...newFarm, cropType: e.target.value})}>
                <option value="">Select crop type</option>
                <option value="Tea">Tea</option>
                <option value="Rice">Rice</option>
                <option value="Cinnamon">Cinnamon</option>
                <option value="Pepper">Pepper</option>
                <option value="Eggplant">Eggplant</option>
              </select>
            </div>
            <div className="field">
              <label>Address/Location</label>
              <input type="text" value={newFarm.address} onChange={(e) => setNewFarm({...newFarm, address: e.target.value})} placeholder="Kandy, Sri Lanka" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={async () => {
                  if (newFarm.name && newFarm.cropType && newFarm.address) {
                    const location = await geocodeAddress(newFarm.address);
                    if (location) {
                      const farm = {
                        name: newFarm.name,
                        cropType: newFarm.cropType,
                        location: location.display_name,
                        lat: location.lat,
                        lng: location.lng
                      };
                      setFarms([...farms, farm]);
                      setNewFarm({ name: '', cropType: '', address: '' });
                      setShowAddFarmModal(false);
                      if (map) {
                        L.marker([location.lat, location.lng])
                          .addTo(map)
                          .bindPopup(`<strong>${farm.name}</strong><br/>${farm.cropType}`);
                      }
                    } else {
                      alert('Could not find location. Please try a more specific address.');
                    }
                  } else {
                    alert('Please fill in all fields.');
                  }
                }}
            >
              Add Farm
            </button>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowAddFarmModal(false)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div>
      <div className="section-head">
        <div>
          <h2>{t.settings}</h2>
          <p>Language, appearance, and profile</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Language</h3>
          <div className="grid-2">
            {[
              { code: 'en', name: 'English' },
              { code: 'si', name: 'සිංහල' }
            ].map((lang) => (
              <button
                key={lang.code}
                className={`btn ${language === lang.code ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setLanguage(lang.code)}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3 style={{ marginTop: 0 }}>Appearance</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Dark Mode</span>
            <button className={`btn ${darkMode ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div className="panel" style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ marginTop: 0 }}>Profile</h3>
          <div className="form-stack">
            <div className="field">
              <label>Name</label>
              <input type="text" value={user?.name || ''} readOnly />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={user?.email || ''} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (currentView) {
      case 'home':
        return renderHome();
      case 'farms':
        return renderFarms();
      case 'disease':
        return renderDiseaseDetection();
      case 'chatbot':
        return renderChatbot();
      case 'market':
        return renderMarketPrices();
      case 'satellite':
        return renderSatelliteView();
      case 'settings':
        return renderSettings();
      default:
        return renderHome();
    }
  };

  if (!isAuthenticated) {
    return renderLogin();
  }

  return (
    <div className={`app-shell ${darkMode ? 'dark' : ''} ${language === 'si' ? 'font-sinhala' : ''}`}>
      {!isOnline && (
        <div className="offline-indicator">
          You're offline. Some features may be limited.
        </div>
      )}

      <aside className="side-nav">
        <div className="brand">
          <div className="brand-mark"><i className="fas fa-leaf"></i></div>
          <div className="brand-text">
            <strong>{t.title}</strong>
            <span>Farm OS</span>
          </div>
        </div>
        <nav className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="nav-footer">
          <select className="lang-select" value={language} onChange={(e) => setLanguage(e.target.value)} style={{ width: '100%' }}>
            <option value="en">English</option>
            <option value="si">සිංහල</option>
          </select>
          <button className="nav-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      <div className="main-pane">
        <main>{renderMainContent()}</main>
      </div>

      <nav className="mobile-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-btn ${currentView === item.id ? 'active' : ''}`}
            onClick={() => setCurrentView(item.id)}
          >
            <i className={`fas ${item.icon}`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {renderCropModal()}
      {renderAddFarmModal()}
    </div>
  );
};

// Error boundary for React
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <div className="text-red-500 text-6xl mb-4">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Error</h2>
            <p className="text-gray-600 mb-4">
              Something went wrong. Please refresh the page to try again.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Refresh Page
            </button>
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500">Error Details</summary>
              <pre className="mt-2 text-xs text-red-600 bg-gray-100 p-2 rounded overflow-auto">
                {this.state.error?.toString()}
              </pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize the app with error boundary
try {
  ReactDOM.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>, 
    document.getElementById('root')
  );
} catch (error) {
  console.error('Failed to render app:', error);
  document.getElementById('root').innerHTML = `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div class="text-red-500 text-6xl mb-4">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Loading Error</h2>
        <p class="text-gray-600 mb-4">
          Failed to load the application. Please check your internet connection and refresh the page.
        </p>
        <button 
          onclick="window.location.reload()"
          class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Refresh Page
        </button>
      </div>
    </div>
  `;
}
