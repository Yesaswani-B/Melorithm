import { useState, useEffect } from 'react';
import axios from 'axios';
import './BestMatch.css';

export default function BestMatch() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/favorites');
        setFavorites(res.data);
      } catch (err) {
        setError('Failed to load your best matched songs.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="page-wrapper best-match-page">
      <div className="header-section">
        <h1 className="title">
          Your <span className="gradient-text">Best Matches</span>
        </h1>
        <p className="subtitle">
          All the tracks you've saved from your recommendations.
        </p>
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner-large"></div>
        </div>
      ) : error ? (
        <div className="error-msg glass">⚠️ {error}</div>
      ) : favorites.length === 0 ? (
        <div className="empty-state glass">
          <span className="empty-icon">🎧</span>
          <h2>No matches saved yet</h2>
          <p>Go to the Discover page and click the heart icon on recommendations to save them here!</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((song, i) => (
            <div key={i} className="favorite-card glass">
              <div className="card-top">
                <div className="song-info">
                  <h3 className="song-title">{song.track_name}</h3>
                  <p className="song-artist">{song.artists}</p>
                </div>
                <div className="song-meta">
                  <span className="genre-badge">{song.track_genre}</span>
                  {song.similarity && (
                    <div className="sim-badge">
                      {(song.similarity * 100).toFixed(1)}% Match
                    </div>
                  )}
                </div>
              </div>
              
              <div className="audio-features-mini">
                <div className="feature-mini">
                  <span className="f-label">Energy</span>
                  <div className="f-bar-bg">
                    <div 
                      className="f-bar-fill" 
                      style={{ 
                        width: `${song.energy * 100}%`,
                        background: song.energy > 0.7 ? 'var(--cyan-1)' : song.energy > 0.4 ? 'var(--purple-2)' : 'var(--text-muted)'
                      }}
                    ></div>
                  </div>
                </div>
                <div className="feature-mini">
                  <span className="f-label">Dance</span>
                  <div className="f-bar-bg">
                    <div 
                      className="f-bar-fill" 
                      style={{ 
                        width: `${song.danceability * 100}%`,
                        background: song.danceability > 0.7 ? 'var(--cyan-1)' : song.danceability > 0.4 ? 'var(--purple-2)' : 'var(--text-muted)'
                      }}
                    ></div>
                  </div>
                </div>
                <div className="feature-mini">
                  <span className="f-label">Valence</span>
                  <div className="f-bar-bg">
                    <div 
                      className="f-bar-fill" 
                      style={{ 
                        width: `${song.valence * 100}%`,
                        background: song.valence > 0.7 ? 'var(--cyan-1)' : song.valence > 0.4 ? 'var(--purple-2)' : 'var(--text-muted)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
