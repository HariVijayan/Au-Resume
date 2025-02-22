import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // State variables to hold the input values and result
  const [document, setDocument] = useState('');
  const [queryString, setQueryString] = useState('');
  const [similarity, setSimilarity] = useState(null);
  const [error, setError] = useState('');

  // Handle change in document input
  const handleDocumentChange = (event) => {
    setDocument(event.target.value);
  };

  // Handle change in query string input
  const handleQueryStringChange = (event) => {
    setQueryString(event.target.value);
  };

  // Function to send the request to the FastAPI backend
  const calculateSimilarity = async () => {
    // Clear previous error message
    setError('');

    try {
      // Send POST request to FastAPI backend
      const response = await axios.post('http://localhost:8000/calculate_similarity/', {
        document: document,
        query_string: queryString
      });

      // Get the similarity percentage from the response and set it in state
      setSimilarity(response.data.similarity_percentage);
    } catch (err) {
      // If any error occurs, set error message
      setError('Error calculating similarity. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Cosine Similarity Calculator</h1>

      <div style={{ marginBottom: '10px' }}>
        <label>
          <strong>Document:</strong>
          <textarea
            value={document}
            onChange={handleDocumentChange}
            placeholder="Enter document text here"
            rows="5"
            cols="50"
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          <strong>Query String:</strong>
          <input
            type="text"
            value={queryString}
            onChange={handleQueryStringChange}
            placeholder="Enter query string"
            style={{ width: '50%', padding: '5px' }}
          />
        </label>
      </div>

      <button
        onClick={calculateSimilarity}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Calculate Similarity
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {similarity !== null && (
        <div style={{ marginTop: '20px' }}>
          <h3>Similarity Percentage: {similarity}</h3>
        </div>
      )}

      <a href='index.html'>Back</a>
    </div>
  );
}

export default App;
