import React, { useEffect, useState } from 'react';
import api from '../api/api';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

export default function Feed(){
  const [posts, setPosts] = useState([]);

  const load = async () => {
    const res = await api.get('/posts');
    setPosts(res.data);
  };

  useEffect(()=>{ load(); }, []);

  const onPosted = p => setPosts(prev => [p, ...prev]);

  return (
    <div>
      <h2>Feed</h2>
      <PostForm onPosted={onPosted} />
      <div className="posts">
        {posts.map(p => <PostCard key={p._id} post={p} onDelete={()=>setPosts(posts.filter(x=>x._id!==p._id))} />)}
      </div>
    </div>
  );
}
