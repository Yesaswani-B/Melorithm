from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# ── Load pickled artifacts ────────────────────────────────────────────────────
BASE = os.path.join(os.path.dirname(__file__), "..")

print("Loading model artifacts…")
with open(os.path.join(BASE, "model.pkl"), "rb") as f:
    model = pickle.load(f)

with open(os.path.join(BASE, "scaler.pkl"), "rb") as f:
    scaler = pickle.load(f)

with open(os.path.join(BASE, "df.pkl"), "rb") as f:
    df = pickle.load(f)

FEATURES = [
    "danceability", "energy", "loudness", "speechiness",
    "acousticness", "instrumentalness", "liveness", "valence", "tempo"
]

print(f"Loaded dataset with {len(df)} tracks.")


# ── Routes ────────────────────────────────────────────────────────────────────

@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "tracks": len(df)})


@app.route("/api/search")
def search():
    """Return up to 20 song suggestions matching the query string."""
    q = request.args.get("q", "").strip().lower()
    if not q or len(q) < 2:
        return jsonify([])

    mask = (
        df["track_name"].str.lower().str.contains(q, na=False) |
        df["artists"].str.lower().str.contains(q, na=False)
    )
    results = df[mask][["track_name", "artists", "track_genre", "popularity"]].drop_duplicates(
        subset=["track_name", "artists"]
    ).sort_values("popularity", ascending=False).head(20)

    return jsonify(results.to_dict(orient="records"))


@app.route("/api/recommend")
def recommend():
    """Return top 5 recommendations for a given track_name + artist."""
    track_name = request.args.get("track_name", "").strip()
    artist     = request.args.get("artist", "").strip()

    if not track_name:
        return jsonify({"error": "track_name is required"}), 400

    # Find the song in df
    mask = df["track_name"].str.lower() == track_name.lower()
    if artist:
        mask &= df["artists"].str.lower().str.contains(artist.lower(), na=False)

    matches = df[mask]
    if matches.empty:
        return jsonify({"error": "Song not found in dataset"}), 404

    # Use the first match
    idx = matches.index[0]
    song_row = df.loc[idx, FEATURES].values.reshape(1, -1)
    song_scaled = scaler.transform(song_row)

    # Fetch more neighbors (e.g., 30) since we need to filter out duplicates
    distances, indices = model.kneighbors(song_scaled, n_neighbors=30)

    recs = []
    seen = set()
    # Add the query song to 'seen' so we don't recommend it
    seen.add((df.loc[idx, "track_name"].lower(), df.loc[idx, "artists"].lower()))

    for dist, i in zip(distances[0], indices[0]):
        row = df.iloc[i]
        key = (row["track_name"].lower(), row["artists"].lower())
        
        if key not in seen:
            seen.add(key)
            recs.append({
                "track_name":  row["track_name"],
                "artists":     row["artists"],
                "track_genre": row["track_genre"],
                "popularity":  int(row["popularity"]),
                "danceability":     round(float(row["danceability"]), 3),
                "energy":           round(float(row["energy"]), 3),
                "valence":          round(float(row["valence"]), 3),
                "tempo":            round(float(row["tempo"]), 1),
                "acousticness":     round(float(row["acousticness"]), 3),
                "similarity":       round(float(1 - dist), 4),
            })
            
        if len(recs) == 5:
            break

    query_song = {
        "track_name":  df.loc[idx, "track_name"],
        "artists":     df.loc[idx, "artists"],
        "track_genre": df.loc[idx, "track_genre"],
        "popularity":  int(df.loc[idx, "popularity"]),
        "danceability":     round(float(df.loc[idx, "danceability"]), 3),
        "energy":           round(float(df.loc[idx, "energy"]), 3),
        "valence":          round(float(df.loc[idx, "valence"]), 3),
        "tempo":            round(float(df.loc[idx, "tempo"]), 1),
        "acousticness":     round(float(df.loc[idx, "acousticness"]), 3),
    }

    return jsonify({"query": query_song, "recommendations": recs})


@app.route("/api/favorite", methods=["POST"])
def favorite():
    """Save a favorited song to the best_matched folder."""
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
        
    folder_path = os.path.join(BASE, "best_matched")
    os.makedirs(folder_path, exist_ok=True)
    
    file_path = os.path.join(folder_path, "favorites.json")
    
    favorites = []
    if os.path.exists(file_path):
        import json
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                favorites = json.load(f)
        except:
            favorites = []
            
    # Check if already exists to prevent duplicates
    exists = any(f.get("track_name") == data.get("track_name") and f.get("artists") == data.get("artists") for f in favorites)
    
    if not exists:
        favorites.append(data)
        import json
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(favorites, f, indent=4)
            
    return jsonify({"status": "success", "saved": not exists})

@app.route("/api/favorites", methods=["GET"])
def get_favorites():
    """Retrieve all favorited songs from the best_matched folder."""
    folder_path = os.path.join(BASE, "best_matched")
    file_path = os.path.join(folder_path, "favorites.json")
    
    if not os.path.exists(file_path):
        return jsonify([])
        
    import json
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            favorites = json.load(f)
        return jsonify(favorites)
    except:
        return jsonify([])

if __name__ == "__main__":
    app.run(debug=True, port=5000)
