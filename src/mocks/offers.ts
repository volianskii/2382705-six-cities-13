enum Months {
  June = 'June',
  July = 'July',
  August = 'August',
  September = 'September',
  October = 'October',
  November = 'November',
  December = 'December',
  January = 'January',
  February = 'February',
  March = 'March',
  April = 'April',
  May = 'May',
}

enum ApartmentType {
  Apartment = 'apartment',
  House = 'house',
  Hotel = 'hotel',
  Hostel = 'hostel',
}

type Date = {
  month: Months;
  year: number;
}

type Host = {
  name: string;
  photo: string;
  description: string;
  proStatus: boolean;
}

export type OfferType = {
  price: number;
  name: string;
  id: string;
  rating: number;
  type: ApartmentType;
  capacity: number;
  bedrooms: number;
  amenities: string[];
  premium: boolean;
  lat: number;
  lng: number;
  host: Host;
  reviews: {
    name: string;
    photo: string;
    rating: number;
    review: string;
    date: Date;
  }[];
}

const offers: OfferType[] = [
  {
    price: 120,
    name: 'Beautiful & luxurious studio at great location',
    id: 'dzgds456',
    rating: 4,
    type: ApartmentType.Apartment,
    capacity: 4,
    bedrooms: 3,
    amenities: ['heating','kitchen','fridge'],
    premium: true,
    lat: 52.3909553943508,
    lng: 4.85309666406198,
    host: {
      name: 'Alice',
      photo: 'SOME DIR',
      description: 'A QUIET COZY AND PICTURESQUE THAT HIDES BEHIND A A RIVER BY THE UNIQUE LIGHTNESS OF AMSTERDAM. THE BUILDING IS GREEN AND FROM 18TH CENTURY. AN INDEPENDENT HOUSE, STRATEGICALLY LOCATED BETWEEN REMBRAND SQUARE AND NATIONAL OPERA, BUT WHERE THE BUSTLE OF THE CITY COMES TO REST IN THIS ALLEY FLOWERY AND COLORFUL.',
      proStatus: true
    },
    reviews: [
      {
        name: 'Alan',
        photo: 'SOME DIR',
        rating: 3,
        review: 'A COZY AND PICTURESQUE THAT HIDES BEHIND A A RIVER BY THE UNIQUE LIGHTNESS OF AMSTERDAM. THE BUILDING IS GREEN AND FROM 18TH CENTURY.',
        date: {
          month: Months.June,
          year: 2019,
        },
      },
      {
        name: 'Alex',
        photo: 'SOME DIR',
        rating: 6,
        review: 'dfdfkjgjkjkgdjklghjklkjlghkjlfjklklhkl',
        date: {
          month: Months.July,
          year: 2014,
        },
      }
    ],
  },
  {
    price: 150,
    name: 'Cool house near the park',
    id: 'reerter234',
    rating: 3,
    type: ApartmentType.House,
    capacity: 6,
    bedrooms: 4,
    amenities: ['heating','kitchen','fridge','air conditioning','parking'],
    premium: false,
    lat: 52.3609553943508,
    lng: 4.85309666406198,
    host: {
      name: 'Tom',
      photo: 'SOME DIR',
      description: 'gdfgfjdksjlf;khsfkh;dklh;klapfdklakhlkfk43opk5op343i6jh4364h56kh346k43hj5k76h45kl7h54klh754klh7kl45hk',
      proStatus: false
    },
    reviews: [
      {
        name: 'Emily',
        photo: 'SOME DIR',
        rating: 4,
        review: 'gdfgfjdksjlf;khsfkh;dklh;klapfdklakhlkfk43opk5op343i6jh4364h56kh346k43hj5k76h45kl7h54klh754klh7kl45hk',
        date: {
          month: Months.November,
          year: 2020,
        },
      }
    ],
  },
  {
    price: 190,
    name: 'Awesome hostel in the centre',
    id: 'kbmbmfgn32234',
    rating: 5,
    type: ApartmentType.Hostel,
    capacity: 10,
    bedrooms: 2,
    amenities: ['heating','kitchen'],
    premium: true,
    lat: 52.3909553943508,
    lng: 4.929309666406198,
    host: {
      name: 'Tim',
      photo: 'SOME DIR',
      description: 'JHJGFJFJFLDFJLHDL;HDFJ9438903486983KLDGMDKLFGLKDJ',
      proStatus: true
    },
    reviews: [
      {
        name: 'Jessy',
        photo: 'SOME DIR',
        rating: 4.5,
        review: 'JHJGFJFJFLDFJLHDL;HDFJ9438903486983KLDGMDKLFGLKDJ',
        date: {
          month: Months.January,
          year: 2022,
        },
      }
    ],
  },
  {
    price: 220,
    name: 'Beautiful hotel in the countryside',
    id: 'eqweuweir231',
    rating: 4.9,
    type: ApartmentType.Hotel,
    capacity: 25,
    bedrooms: 7,
    amenities: ['heating','kitchen','air conditioning','parking', 'restaurant'],
    premium: false,
    lat: 52.3809553943508,
    lng: 4.939309666406198,
    host: {
      name: 'Bob',
      photo: 'SOME DIR',
      description: 'lhlhlhlhlhllhlhlhllhlglf;flhkf899456094hflklf;khfk;l',
      proStatus: false
    },
    reviews: [
      {
        name: 'John',
        photo: 'SOME DIR',
        rating: 3.8,
        review: 'lhlhlhlhlhllhlhlhllhlglf;flhkf899456094hflklf;khfk;l',
        date: {
          month: Months.March,
          year: 2017,
        },
      }
    ],
  }
];

export default offers;
