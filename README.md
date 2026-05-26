# 🎵 Melorithm - Music Recommendation System

![Melorithm Banner](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Flask](https://img.shields.io/badge/Backend-Flask-lightgrey)
![Scikit-Learn](https://img.shields.io/badge/Machine%20Learning-Scikit--Learn-orange)

**Melorithm** is an advanced, full-stack music recommendation engine powered by machine learning. It uses a K-Nearest Neighbors (KNN) algorithm to analyze tracks based on Spotify's acoustic features and find songs that are mathematically similar to your taste.

---

## 🚀 Live Demo

- **Frontend Application:** [https://melorithm.onrender.com/](https://melorithm.onrender.com/)
- **Backend API:** [https://melorithm-api.onrender.com](https://melorithm-api.onrender.com)

*(Note: Since the backend is hosted on Render's free tier, it may take 30-50 seconds to spin up on the very first request if it has been inactive.)*

---

## ✨ Features

- **Smart Search:** Instantly search through a curated dataset of over 114,000 tracks.
- **Acoustic Matching:** Recommendations aren't just based on genre; they are calculated using 9 distinct audio features including:
  - *Danceability, Energy, Valence, Tempo, Acousticness, Instrumentalness, Liveness, Speechiness, and Loudness.*
- **Cosine Similarity:** Calculates the precise distance between your selected track and potential matches in a multi-dimensional feature space.
- **Favorites:** Save your best-matched songs to a personalized list.
- **Modern UI:** A sleek, glassmorphic interface built with React.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (via Vite)
- **Axios** (for API communication)
- **React Router** (for navigation)
- **Vanilla CSS** (Custom glassmorphism design system)

### Backend & Machine Learning
- **Python / Flask** (REST API)
- **Scikit-Learn** (K-Nearest Neighbors model, StandardScaler)
- **Pandas & NumPy** (Data processing)
- **Gunicorn** (Production WSGI server)

---

## 💻 Running Locally

To run this project on your local machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/Yesaswani-B/Melorithm.git
cd Melorithm
```

### 2. Backend Setup
Make sure you have Python 3 installed.

```bash
# Install required Python packages
pip install -r backend/requirements.txt

# Generate the Machine Learning models (Pickle files)
# This will read dataset.csv, train the model, and save the artifacts in the backend/ folder.
python dump_model.py

# Start the Flask development server
cd backend
python app.py
```
*The backend will run at `http://localhost:5000`*

### 3. Frontend Setup
Open a new terminal window.

```bash
# Navigate to the frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start the Vite development server
npm run dev
```
*The frontend will run at `http://localhost:5173`*

---

## 🧠 How the Algorithm Works

1. **User Selection**: You search for and select a target track.
2. **Feature Extraction**: The system retrieves the 9 specific acoustic features of that track.
3. **Standardization**: Features are scaled using a pre-fitted `StandardScaler` so that large ranges (like Tempo: 0-200 BPM) don't unfairly outweigh smaller ranges (like Acousticness: 0-1).
4. **KNN Query**: The scaled features are fed into the `NearestNeighbors` model, calculating the closest neighbors via Cosine Distance.
5. **Results**: Duplicate tracks are filtered out, and the top 5 most acoustically similar songs are returned with a match percentage.

---

## 👩‍💻 Author

**Yesaswani Boddepalli**
*Built as a machine learning and full-stack web development project.*
