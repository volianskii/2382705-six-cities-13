import type { User } from './offer';

export type Comment = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
};
