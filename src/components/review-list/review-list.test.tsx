import { render, screen } from '@testing-library/react';
import ReviewList from './review-list';
import React from 'react';

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    const mockComments = [
      {
        id: 'sfdfsdfdf',
        date: '2012-01-26T13:51:50.417-07:00',
        user: {
          name: 'David',
          avatarUrl: '/local/path/image.png',
          isPro: false,
        },
        comment: 'Test comment',
        rating: 4,
      },
      {
        id: 'fdfsffds',
        date: '2015-01-26T13:51:50.417-07:00',
        user: {
          name: 'Michael',
          avatarUrl: '/local/path2/image2.png',
          isPro: true,
        },
        comment: 'Test comment',
        rating: 4.5,
      }
    ];
    const reviewsContainerTestId = 'reviews-container';
    const reviewContainerTestId = 'review-container';

    render(<ReviewList comments={mockComments}/>);

    expect(screen.getByTestId(reviewsContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(reviewContainerTestId).length).toBe(mockComments.length);
  });
});
