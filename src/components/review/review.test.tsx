import { render, screen } from '@testing-library/react';
import Review from './review';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const mockComment = {
      id: 'sfdfsdfdf',
      date: '2012-01-26T13:51:50.417-07:00',
      user: {
        name: 'David',
        avatarUrl: '/local/path/image.png',
        isPro: false,
      },
      comment: 'Test comment',
      rating: 4,
    };
    const reviewContainerTestId = 'review-container';

    render(<Review comment={mockComment}/>);

    expect(screen.getByTestId(reviewContainerTestId)).toBeInTheDocument();
  });
});
