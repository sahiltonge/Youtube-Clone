import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './searchresult.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`https://capstone-9ln6.onrender.com/video/search?query=${query}`);
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="search-results-container">
      <h2 className="search-results-heading">Search Results for "{query}"</h2>
      {videos.length === 0 ? (
        <p className="no-results">No results found.</p>
      ) : (
        <div className="search-results-grid">
          {videos.map((video) => (
            <Link
              key={video._id}
              to={`/video/${video._id}`}
              className="search-result-card"
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="search-result-thumbnail"
              />
              <div className="search-result-info">
                <h3 className="search-result-title">{video.title}</h3>
                <p className="search-result-description">{video.description}</p>
                <p className="search-result-meta">{video.views} views • {new Date(video.createdAt).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
