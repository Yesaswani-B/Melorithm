import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Home.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await axios.get(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
        setSuggestions(res.data);
      } catch (err) {
        console.error("Search error", err);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelectSong = async (song) => {
    setQuery(song.track_name);
    setShowDropdown(false);
    setLoading(true);
    setError('');
    setRecommendations(null);

    try {
      const res = await axios.get(`http://localhost:5000/api/recommend`, {
        params: {
          track_name: song.track_name,
          artist: song.artists
        }
      });
      setRecommendations(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch recommendations.');
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (song) => {
    const key = `${song.track_name}-${song.artists}`;
    if (favorites.has(key)) return;
    
    try {
      await axios.post('http://localhost:5000/api/favorite', song);
      setFavorites(prev => new Set(prev).add(key));
    } catch (err) {
      console.error("Failed to favorite", err);
    }
  };

  const getMetricColor = (val) => {
    if (val > 0.7) return 'var(--cyan-1)';
    if (val > 0.4) return 'var(--purple-2)';
    return 'var(--text-muted)';
  };

  return (
    <div className="page-wrapper home-page">
      <header className="hero">
        <h1 className="title">
          Find your next <span className="gradient-text">Obsession</span>
        </h1>
        <p className="subtitle">
          Advanced K-Nearest Neighbors recommendation engine powered by Spotify's acoustic features.
        </p>

        <div className="search-container" ref={searchRef}>
          <div className="search-bar glass">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search for a track or artist..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
            />
            {loading && <div className="spinner"></div>}
          </div>

          {showDropdown && suggestions.length > 0 && (
            <div className="suggestions glass">
              {suggestions.map((song, i) => (
                <div key={i} className="suggestion-item" onClick={() => handleSelectSong(song)}>
                  <div className="song-info">
                    <span className="song-title">{song.track_name}</span>
                    <span className="song-artist">{song.artists}</span>
                  </div>
                  <span className="song-genre">{song.track_genre}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {error && <div className="error-msg glass">⚠️ {error}</div>}

      {recommendations && (
        <section className="results-section">
          <div className="results-grid">
            <div className="query-card glass">
              <div className="card-header">
                <h3>Target Track</h3>
                <span className="badge">Original</span>
              </div>
              <div className="track-details">
                <h2 className="gradient-text">{recommendations.query.track_name}</h2>
                <p>{recommendations.query.artists}</p>
              </div>
              <div className="audio-features">
                <div className="feature">
                  <span className="label">Energy</span>
                  <div className="bar-bg">
                    <div className="bar-fill" style={{ width: `${recommendations.query.energy * 100}%`, background: getMetricColor(recommendations.query.energy) }}></div>
                  </div>
                </div>
                <div className="feature">
                  <span className="label">Dance</span>
                  <div className="bar-bg">
                    <div className="bar-fill" style={{ width: `${recommendations.query.danceability * 100}%`, background: getMetricColor(recommendations.query.danceability) }}></div>
                  </div>
                </div>
                <div className="feature">
                  <span className="label">Valence</span>
                  <div className="bar-bg">
                    <div className="bar-fill" style={{ width: `${recommendations.query.valence * 100}%`, background: getMetricColor(recommendations.query.valence) }}></div>
                  </div>
                </div>
                <div className="feature">
                  <span className="label">Tempo</span>
                  <span className="value">{recommendations.query.tempo} BPM</span>
                </div>
              </div>
            </div>

            <div className="recommendations-list">
              <h3 className="section-title">Similar Tracks</h3>
              <div className="recs-wrapper">
                {recommendations.recommendations.map((rec, i) => (
                  <div key={i} className="rec-card glass" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="rec-info">
                      <h4>{rec.track_name}</h4>
                      <p>{rec.artists}</p>
                    </div>
                    <div className="rec-meta">
                      <button 
                        className={`favorite-btn ${favorites.has(`${rec.track_name}-${rec.artists}`) ? 'liked' : ''}`}
                        onClick={() => handleFavorite(rec)}
                        title="Save to best matched"
                      >
                        {favorites.has(`${rec.track_name}-${rec.artists}`) ? '❤️' : '🤍'}
                      </button>
                      <div className="similarity">
                        <span className="sim-val">{(rec.similarity * 100).toFixed(1)}%</span>
                        <span className="sim-lbl">Match</span>
                      </div>
                      <span className="genre-tag">{rec.track_genre}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
