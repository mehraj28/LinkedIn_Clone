import React, { useState } from 'react';
import api from '../api/api';

export default function PostForm({ onPosted }){
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const submit = async e => {
    e.preventDefault();
    let imageUrl = '';
    if(file){
      const fd = new FormData();
      fd.append('file', file);
      const r = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
      imageUrl = r.data.url;
    }
    const res = await api.post('/posts', { text, image: imageUrl });
    setText(''); setFile(null);
    onPosted(res.data);
  };

  return (
    <form className="post-form" onSubmit={submit}>
      <textarea required placeholder="What's on your mind?" value={text} onChange={e=>setText(e.target.value)} />
      <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
      <button type="submit">Post</button>
    </form>
  );
}
