import getRatingWidth from './rating-width';
import getReviewMonth from './review-month';
import { sortComments } from './sorting-comments';
import { sorting } from './sorting';
import { makeFakeComment, makeFakeOffer } from './mocks';


describe ('Function: getRatingWidth', () => {
  it ('should return \'0%\' when rating is 0.4', () => {
    const expectedResult = '0%';
    const result = getRatingWidth(0.4);

    expect(result).toEqual(expectedResult);
  });

  it ('should return \'40%\' when rating is 2.1', () => {
    const expectedResult = '40%';
    const result = getRatingWidth(2.1);

    expect(result).toEqual(expectedResult);
  });

  it ('should return \'100%\' when rating is 4.5', () => {
    const expectedResult = '100%';
    const result = getRatingWidth(4.5);

    expect(result).toEqual(expectedResult);
  });
});

describe ('Function: getReviewMonth', () => {
  it ('should return \'January\' when month is \'01\'', () => {
    const expectedResult = 'January';
    const result = getReviewMonth('01');

    expect(result).toEqual(expectedResult);
  });

  it ('should return \'June\' when month is \'06\'', () => {
    const expectedResult = 'June';
    const result = getReviewMonth('06');

    expect(result).toEqual(expectedResult);
  });

  it ('should return \'November\' when month is \'11\'', () => {
    const expectedResult = 'November';
    const result = getReviewMonth('11');

    expect(result).toEqual(expectedResult);
  });
});

describe ('Function: sortingComments', () => {
  it ('should sort comments by date', () => {
    const comments = new Array(3).fill(null).map(() => makeFakeComment());
    const result = sortComments(comments);
    const firstCommentDate = result[0].date;
    const secondCommentDate = result[1].date;
    let comparingResult = null;
    if (firstCommentDate > secondCommentDate) {
      comparingResult = true;
    } else {
      comparingResult = false;
    }

    expect(comparingResult).toBe(true);
  });
});

describe ('Function: sorting', () => {
  it ('should sort offers by price: HighToLow', () => {
    const offers = new Array(3).fill(null).map(() => makeFakeOffer());
    const result = sorting['HighToLow'](offers);

    expect(result[0].price).toBeGreaterThan(result[1].price);
    expect(result[1].price).toBeGreaterThan(result[2].price);
  });

  it ('should sort offers by price: LowToHigh', () => {
    const offers = new Array(3).fill(null).map(() => makeFakeOffer());
    const result = sorting['LowToHigh'](offers);

    expect(result[0].price).toBeLessThan(result[1].price);
    expect(result[1].price).toBeLessThan(result[2].price);

  });

  it ('should sort offers by price: TopRated', () => {
    const offers = new Array(3).fill(null).map(() => makeFakeOffer());
    const result = sorting['TopRated'](offers);

    expect(result[0].rating).toBeGreaterThan(result[1].rating);
    expect(result[1].rating).toBeGreaterThan(result[2].rating);
  });

  it ('should sort offers by price: Popular', () => {
    const offers = new Array(3).fill(null).map(() => makeFakeOffer());
    const result = sorting['Popular'](offers);

    expect(result[0]).toEqual(offers[0]);
    expect(result[1]).toEqual(offers[1]);
  });
});
