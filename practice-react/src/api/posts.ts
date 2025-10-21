import { useMemo } from 'react';
import { useApi } from './client';

export interface PostResponse {
  _id: string;
  title: string;
  content: string;
}

export interface PostPayload {
  title: string;
  content: string;
}

export function usePostsApi() {
  const { request } = useApi();

  return useMemo(
    () => ({
      fetchPosts: () => request<PostResponse[]>('/posts'),
      fetchPost: (id: string) => request<PostResponse>(`/posts/${id}`),
      createPost: (payload: PostPayload) =>
        request<PostResponse>('/posts', {
          method: 'POST',
          body: JSON.stringify(payload),
        }),
      updatePost: (id: string, payload: PostPayload) =>
        request<PostResponse>(`/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        }),
      removePost: (id: string) =>
        request<{ success: boolean }>(`/posts/${id}`, {
          method: 'DELETE',
        }),
    }),
    [request],
  );
}
