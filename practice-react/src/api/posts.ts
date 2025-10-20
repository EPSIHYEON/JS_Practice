// src/api/posts.ts
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function fetchPosts() {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) throw new Error('Failed to load posts');
  return res.json();
}

export async function createPost(payload: { title: string; content: string }) {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}