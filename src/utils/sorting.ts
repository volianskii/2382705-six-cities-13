import { OfferType } from '../types/offer';
import { SortingType } from '../types/sorting';

function sortByRating(a: OfferType, b: OfferType) {
  return b.rating - a.rating;
}

function sortLowToHigh(a: OfferType, b: OfferType) {
  return a.price - b.price;
}

function sortHighToLow(a: OfferType, b: OfferType) {
  return b.price - a.price;
}

const sorting: Record<SortingType, (offers: OfferType[]) => OfferType[]> =
  {
    Popular: (offers: OfferType[]) => offers.slice(),
    HighToLow: (offers: OfferType[]) => offers.slice().sort(sortHighToLow),
    LowToHigh: (offers: OfferType[]) => offers.slice().sort(sortLowToHigh),
    TopRated: (offers: OfferType[]) => offers.slice().sort(sortByRating),
  };

export { sorting };
