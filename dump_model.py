"""
Build script – run this as the Render build command:
    python dump_model.py

Trains the NearestNeighbors model on dataset.csv and saves the three
pickle artifacts into backend/ so app.py can load them at startup.
"""

import os
import pickle
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler

# Resolve paths relative to this file so it works locally and on Render
ROOT = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(ROOT, "backend")
DATASET_PATH = os.path.join(ROOT, "dataset.csv")

print("Loading dataset…")
df = pd.read_csv(DATASET_PATH)
df.dropna(inplace=True)
print(f"  {len(df)} tracks loaded.")

FEATURES = [
    "danceability", "energy", "loudness", "speechiness",
    "acousticness", "instrumentalness", "liveness", "valence", "tempo"
]

print("Fitting scaler and model…")
ss = StandardScaler()
x = ss.fit_transform(df[FEATURES])

model = NearestNeighbors(n_neighbors=30, metric="cosine")
model.fit(x)

print(f"Saving artifacts to {BACKEND_DIR} …")
os.makedirs(BACKEND_DIR, exist_ok=True)

with open(os.path.join(BACKEND_DIR, "model.pkl"), "wb") as f:
    pickle.dump(model, f)

with open(os.path.join(BACKEND_DIR, "scaler.pkl"), "wb") as f:
    pickle.dump(ss, f)

with open(os.path.join(BACKEND_DIR, "df.pkl"), "wb") as f:
    pickle.dump(df, f)

print("Done! model.pkl, scaler.pkl, df.pkl saved in backend/")
