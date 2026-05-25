import './About.css';

export default function About() {
  return (
    <div className="page-wrapper about-page">
      <div className="about-header">
        <h1 className="title">About <span className="gradient-text">SoundMatch</span></h1>
        <p className="subtitle">The story behind the music recommendations.</p>
      </div>

      <div className="about-content">
        {/* Creator Section */}
        <div className="creator-card glass">
          <div className="creator-info">
            <div className="avatar-ring">
              <div className="avatar-inner">YB</div>
            </div>
            <div className="creator-text">
              <h2>Yesaswani Boddepalli</h2>
              <span className="grade-badge">10th Grade</span>
              <p className="creator-bio">
                I immensely enjoy listening to music. I used machine learning for this specific project to make predictions, get new music recommendations, and discover new melodies. I used ReactJS to create a modern, eye-catching, and user-friendly web app as a demo.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="info-card glass">
          <div className="section-label">🧠 The Algorithm</div>
          <h2>How It Works</h2>
          <p>
            SoundMatch uses a <strong>K-Nearest Neighbors (KNN)</strong> algorithm to find songs that are mathematically similar to your target track. The model analyzes 9 distinct acoustic features extracted from the Spotify dataset to calculate the "distance" between songs in a multi-dimensional feature space using <strong>cosine similarity</strong>.
          </p>
          <p>
            When you search for a song, the system scales its audio features using a pre-fitted <code>StandardScaler</code>, then queries the trained model to find the 5 closest neighbors — songs with the most similar acoustic profile.
          </p>
        </div>

        {/* Audio Features Grid */}
        <div className="section-label standalone">🎚️ Audio Features Used</div>
        <div className="features-grid">
          <div className="feature-item glass">
            <span className="icon">💃</span>
            <h3>Danceability</h3>
            <p>How suitable a track is for dancing based on tempo, rhythm stability, beat strength, and overall regularity. Ranges from 0.0 to 1.0.</p>
          </div>
          <div className="feature-item glass">
            <span className="icon">⚡</span>
            <h3>Energy</h3>
            <p>A perceptual measure of intensity and activity. Energetic tracks feel fast, loud, and noisy — like death metal vs. a Bach prelude.</p>
          </div>
          <div className="feature-item glass">
            <span className="icon">🔊</span>
            <h3>Loudness</h3>
            <p>The overall loudness of a track in decibels (dB). Values typically range between -60 and 0 dB, averaged across the entire track.</p>
          </div>
          <div className="feature-item glass">
            <span className="icon">🗣️</span>
            <h3>Speechiness</h3>
            <p>Detects the presence of spoken words. Higher values indicate more speech-like content (e.g., podcasts, rap, spoken word).</p>
          </div>
          <div className="feature-item glass">
            <span className="icon">🎸</span>
            <h3>Acousticness</h3>
            <p>A confidence measure of whether the track is acoustic. 1.0 represents high confidence the track is purely acoustic.</p>
          </div>
          <div className="feature-item glass">
            <span className="icon">🎹</span>
            <h3>Instrumentalness</h3>
            <p>Predicts whether a track contains no vocals. Values above 0.5 are intended to represent instrumental tracks.</p>
          </div>
          <div className="feature-item glass">
            <span className="icon">🎤</span>
            <h3>Liveness</h3>
            <p>Detects the presence of an audience in the recording. Higher values represent an increased probability the track was performed live.</p>
          </div>
          <div className="feature-item glass">
            <span className="icon">🎭</span>
            <h3>Valence</h3>
            <p>A measure from 0.0 to 1.0 describing the musical positiveness. High valence sounds happy and cheerful; low valence sounds sad or angry.</p>
          </div>
          <div className="feature-item glass">
            <span className="icon">🥁</span>
            <h3>Tempo</h3>
            <p>The overall estimated tempo of a track in beats per minute (BPM). This is the speed or pace of a given piece of music.</p>
          </div>
        </div>

        {/* Technical Details */}
        <div className="info-card glass model-card">
          <div className="section-label">⚙️ Technical Details</div>
          <h2>The Model & Dataset</h2>
          <div className="tech-details">
            <div className="detail-row">
              <span className="detail-key">Dataset Size</span>
              <span className="detail-val">114,000+ tracks across 114 genres</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">Algorithm</span>
              <span className="detail-val">K-Nearest Neighbors (k=6)</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">Distance Metric</span>
              <span className="detail-val">Cosine Similarity</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">Preprocessing</span>
              <span className="detail-val">StandardScaler (zero-mean, unit-variance)</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">Features</span>
              <span className="detail-val">9 Spotify audio features</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">Serialization</span>
              <span className="detail-val">Pickle (model.pkl, scaler.pkl, df.pkl)</span>
            </div>
          </div>
          <div className="tech-stack">
            <span className="tech-tag">Python</span>
            <span className="tech-tag">Scikit-Learn</span>
            <span className="tech-tag">Pandas</span>
            <span className="tech-tag">NumPy</span>
            <span className="tech-tag">Flask</span>
            <span className="tech-tag">React</span>
            <span className="tech-tag">Vite</span>
            <span className="tech-tag">Axios</span>
          </div>
        </div>

        {/* Pipeline Section */}
        <div className="info-card glass">
          <div className="section-label">🔄 Recommendation Pipeline</div>
          <h2>How a Recommendation is Made</h2>
          <div className="pipeline">
            <div className="pipeline-step">
              <div className="step-num">1</div>
              <div className="step-content">
                <h4>User Searches</h4>
                <p>The user types a song name or artist. The backend searches the 114K-track dataset for matches.</p>
              </div>
            </div>
            <div className="pipeline-step">
              <div className="step-num">2</div>
              <div className="step-content">
                <h4>Feature Extraction</h4>
                <p>The 9 audio features of the selected song are extracted from the dataset.</p>
              </div>
            </div>
            <div className="pipeline-step">
              <div className="step-num">3</div>
              <div className="step-content">
                <h4>Standardization</h4>
                <p>Features are scaled using the pre-fitted StandardScaler so that tempo (0–200+ BPM) doesn't outweigh acousticness (0–1).</p>
              </div>
            </div>
            <div className="pipeline-step">
              <div className="step-num">4</div>
              <div className="step-content">
                <h4>KNN Query</h4>
                <p>The scaled features are fed into the NearestNeighbors model, which returns the closest songs by cosine distance.</p>
              </div>
            </div>
            <div className="pipeline-step">
              <div className="step-num">5</div>
              <div className="step-content">
                <h4>Deduplication & Response</h4>
                <p>Duplicate tracks are filtered out, and the top 5 unique recommendations are returned to the frontend.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
