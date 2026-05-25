import pandas as pd 
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler
import pickle

# Load and prepare data
df = pd.read_csv('dataset.csv')
df.dropna(inplace=True)

# Standardize features
features = ['danceability','energy','loudness','speechiness','acousticness','instrumentalness','liveness','valence','tempo']
ss = StandardScaler()
x = ss.fit_transform(df[features])

# Train model
model = NearestNeighbors(n_neighbors=6, metric='cosine')
model.fit(x)

# Save the offline model into a pickle file
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)
    
# You will also likely need the dataframe and scaler for offline inference, so let's save them too
with open("scaler.pkl", "wb") as f:
    pickle.dump(ss, f)

with open("df.pkl", "wb") as f:
    pickle.dump(df, f)

print("model.pkl, scaler.pkl, and df.pkl saved successfully!")
