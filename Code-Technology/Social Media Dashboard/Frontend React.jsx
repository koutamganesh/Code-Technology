import React, { useState } from 'react';
import axios from 'axios';

function UploadAvatar() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await axios.post('/api/upload/avatar', formData);
    setUrl(res.data.url);
  };
  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files)} />
      <button onClick={handleUpload}>Upload</button>
      {url && <img src={url} alt="avatar" />}
    </div>
  );
}
