import { User } from "./user";

export interface Discussion {
  id: number;
  discussable_type: string;
  discussable_id: number;
  title: string;
  content: string;
  is_question: boolean;
  is_answered: boolean;
  upvotes: number;
  user: User;
  replies_count: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export type Thread = {
  id: number;
  discussable_type: string;
  discussable_id: number;
  title: string;
  content: string;
  is_question: boolean;
  is_answered: boolean;
  upvotes: number;
  user: User;
  replies_count: number;
  created_at: string;
  updated_at: string;
};

export interface Reply {
  id: number;
  content: string;
  user: User;
  created_at: string;
  updated_at: string;
}

export interface SingleDiscussion {
  thread: Thread;
  replies: Reply[];
  replies_count: number;
}
