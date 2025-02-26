import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [document, setDocument] = useState('');
  const [similarity, setSimilarity] = useState(null);
  const [error, setError] = useState('');
  const [matchedEntities, setMatchedEntities] = useState(null);
  const [unmatchedEntities, setUnmatchedEntities] = useState(null);

  const handleDocumentChange = (event) => {
    setDocument(event.target.value);
  };

  const [file, setFile] = useState(null);

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
    formData.append('job_description', document);

    try {
      const response = await axios.post('http://localhost:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);

      setSimilarity(response.data.match_score);
      setMatchedEntities(response.data.matched_entities);
      setUnmatchedEntities(response.data.unmatched_entities);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <>
      <h1>Resume Success Score Profiler</h1>

      <div style={{ marginBottom: '10px' }}>
        <label>
          <strong>Job Description:</strong>
          <textarea
            value={document}
            onChange={handleDocumentChange}
            placeholder="Enter JD"
            rows="5"
            cols="50"
          />
        </label>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div>
        <h1>Upload a PDF</h1>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>

        {similarity !== null && (
        <div style={{ marginTop: '20px' }}>
          <h3>Similarity Percentage: {similarity}</h3>
        </div>
      )}

        {matchedEntities && (
          <div>
            <h2>Matched Entities:</h2>
            {Object.keys(matchedEntities).map((entity) => (
              <div key={entity}>
                <strong>{entity.charAt(0).toUpperCase() + entity.slice(1)}:</strong>
                
                <p>Resume: 
  {matchedEntities[entity]?.resume
    ? (Array.isArray(matchedEntities[entity].resume) 
        ? matchedEntities[entity].resume.join(', ') 
        : matchedEntities[entity].resume)
    : 'No matching skills'}
</p>


                <p>Job Description: 
                {Array.isArray(matchedEntities[entity]?.job_description)
                    ? matchedEntities[entity].job_description.join(', ')
                    : matchedEntities[entity]?.job_description || 'No matching job description found'}
                </p>

                <p>Similarity: {Array.isArray(matchedEntities[entity]?.similarity) || 'N/A'}</p>
              </div>
            ))}
          </div>
        )}

        {unmatchedEntities && (
          <div>
            <h2>Unmatched Entities:</h2>
            {Object.keys(unmatchedEntities).map((entity) => (
              <div key={entity}>
                <strong>{entity.charAt(0).toUpperCase() + entity.slice(1)}:</strong>
                
                <p>Resume: 
  {unmatchedEntities[entity]?.resume
    ? (Array.isArray(unmatchedEntities[entity].resume) 
        ? unmatchedEntities[entity].resume.join(', ') 
        : unmatchedEntities[entity].resume)
    : 'No matching skills'}
</p>


                <p>Job Description: 
                  {Array.isArray(unmatchedEntities[entity]?.job_description)
                    ? unmatchedEntities[entity].job_description.join(', ')
                    : unmatchedEntities[entity]?.job_description || 'No matching job description found'}
                </p>

                <p>Similarity: {Array.isArray(unmatchedEntities[entity]?.similarity) || 'N/A'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <a href='index.html'>Back</a>
    </>
  );
}

export default App;
