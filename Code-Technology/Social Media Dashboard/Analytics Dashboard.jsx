import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Analytics() {
  const [stats, setStats] = useState({});
  useEffect(() => {
    axios.get('/api/analytics/overview').then(res => setStats(res.data));
  }, []);
  return (
    <div>
      <p>Total users: {stats.users}</p>
      <p>Total posts: {stats.posts}</p>
      <p>Total likes: {stats.likes}</p>
    </div>
  );
}
