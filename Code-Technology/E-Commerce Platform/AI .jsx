// frontend/src/pages/Recommendations.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Recommendations() {
  const [recommended, setRecommended] = useState([]);
  useEffect(() => {
    axios.get('/api/recommendation').then(res => setRecommended(res.data));
  }, []);

  return (
    <div>
      <h2>Recommended for You</h2>
      {recommended.map(product => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
}

export default Recommendations;
