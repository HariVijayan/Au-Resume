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

  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file!');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('http://localhost:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Set the extracted text to state to display it
      setExtractedText(response.data.text);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
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
      
      <div>
      <h1>Upload a PDF</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {extractedText && (
        <div>
          <h2>Extracted Text:</h2>
          <p>{extractedText}</p>
        </div>
      )}
    </div>

    </div>
  );
}

export default App;
