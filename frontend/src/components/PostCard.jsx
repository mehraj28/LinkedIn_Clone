import React from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import dayjs from 'dayjs';

export default function PostCard({ post, onDelete }){
  const { user } = useAuth();

  const handleLike = async () => {
    await api.put(`/posts/like/${post._id}`);
    // naive: reload
    window.location.reload();
  };

  const handleDelete = async () => {
    if(!confirm('Delete post?')) return;
    await api.delete(`/posts/${post._id}`);
    onDelete();
  };

  return (
    <div className="post-card">
      <div className="post-head">
        <strong>{post.author?.name}</strong>
        <small>{dayjs(post.createdAt).format('DD MMM YYYY, HH:mm')}</small>
      </div>
      <p>{post.text}</p>
      {post.image && <img src={post.image} alt="post" className="post-image" />}
      <div className="post-actions">
        <button onClick={handleLike}>Like ({post.likes?.length || 0})</button>
        {user && post.author && post.author._id === user.id && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </div>
    </div>
  );
}
