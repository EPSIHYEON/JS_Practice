import { useMemo } from 'react';
import { useApi } from './client';

export interface PostAuthor {
  _id: string;
  username: string;
}

export interface PostResponse {
  _id: string;
  title: string;
  content: string;
  imageData?: string;
  author?: PostAuthor;
  likesCount: number;
  liked?: boolean;
}

export interface PostPayload {
  title: string;
  content: string;
  imageData?: string | null;
}

export interface ToggleLikeResponse extends PostResponse {
  liked: boolean;
}

export interface LikeSummaryResponse {
  totalLikes: number;
  postCount: number;
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
      toggleLike: (id: string) =>
        request<ToggleLikeResponse>(`/posts/${id}/like`, {
          method: 'POST',
        }),
      fetchLikeSummary: () =>
        request<LikeSummaryResponse>('/posts/me/likes-summary'),
      fetchMyPosts: () => request<PostResponse[]>('/posts/me'),
    }),
    [request],
  );
}
