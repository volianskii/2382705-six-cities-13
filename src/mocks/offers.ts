type offer = {
  price: number;
  name: string;
  id: string;
  rating: number;
  type: 'apartment'|'house'|'hotel'|'hostel';
  capacity: number;
  bedrooms: number;
  amenities: string[];
  premium: boolean;
  host: {
    name: string;
    photo: string;
    description: string;
  };
  reviews: {
    name: string;
    photo: string;
    rating: number;
    review: string;
    date: {
      month: 'June'|'July'|'August';
      year: number;
    };
  }[];
}

const offers: offer[] = [
  {
    price: 120,
    name: 'Beautiful & luxurious studio at great location',
    id: 'dzgds456',
    rating: 4,
    type: 'apartment',
    capacity: 4,
    bedrooms: 3,
    amenities: ['heating','kitchen','fridge'],
    premium: true,
    host: {
      name: 'Alice',
      photo: 'SOME DIR',
      description: 'A QUIET COZY AND PICTURESQUE THAT HIDES BEHIND A A RIVER BY THE UNIQUE LIGHTNESS OF AMSTERDAM. THE BUILDING IS GREEN AND FROM 18TH CENTURY. AN INDEPENDENT HOUSE, STRATEGICALLY LOCATED BETWEEN REMBRAND SQUARE AND NATIONAL OPERA, BUT WHERE THE BUSTLE OF THE CITY COMES TO REST IN THIS ALLEY FLOWERY AND COLORFUL.',
    },
    reviews: [
      {
        name: 'Alan',
        photo: 'SOME DIR',
        rating: 3,
        review: 'A QUIET COZY AND PICTURESQUE THAT HIDES BEHIND A A RIVER BY THE UNIQUE LIGHTNESS OF AMSTERDAM. THE BUILDING IS GREEN AND FROM 18TH CENTURY.',
        date: {
          month: 'June',
          year: 2019,
        },
      }
    ],
  },
  {
    price: 150,
    name: 'Cool house near the park',
    id: 'reerter234',
    rating: 3,
    type: 'house',
    capacity: 6,
    bedrooms: 4,
    amenities: ['heating','kitchen','fridge','air conditioning','parking'],
    premium: false,
    host: {
      name: 'Tom',
      photo: 'SOME DIR',
      description: 'gdfgfjdksjlf;khsfkh;dklh;klapfdklakhlkfk43opk5op343i6jh4364h56kh346k43hj5k76h45kl7h54klh754klh7kl45hk',
    },
    reviews: [
      {
        name: 'Emily',
        photo: 'SOME DIR',
        rating: 4,
        review: 'gdfgfjdksjlf;khsfkh;dklh;klapfdklakhlkfk43opk5op343i6jh4364h56kh346k43hj5k76h45kl7h54klh754klh7kl45hk',
        date: {
          month: 'July',
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
    type: 'hostel',
    capacity: 10,
    bedrooms: 2,
    amenities: ['heating','kitchen'],
    premium: true,
    host: {
      name: 'Tim',
      photo: 'SOME DIR',
      description: 'JHJGFJFJFLDFJLHDL;HDFJ9438903486983KLDGMDKLFGLKDJ',
    },
    reviews: [
      {
        name: 'Jessy',
        photo: 'SOME DIR',
        rating: 4.5,
        review: 'JHJGFJFJFLDFJLHDL;HDFJ9438903486983KLDGMDKLFGLKDJ',
        date: {
          month: 'August',
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
    type: 'hotel',
    capacity: 25,
    bedrooms: 7,
    amenities: ['heating','kitchen','air conditioning','parking', 'restaurant'],
    premium: false,
    host: {
      name: 'Bob',
      photo: 'SOME DIR',
      description: 'lhlhlhlhlhllhlhlhllhlglf;flhkf899456094hflklf;khfk;l',
    },
    reviews: [
      {
        name: 'John',
        photo: 'SOME DIR',
        rating: 3.8,
        review: 'lhlhlhlhlhllhlhlhllhlglf;flhkf899456094hflklf;khfk;l',
        date: {
          month: 'June',
          year: 2017,
        },
      }
    ],
  }
];

export default offers;
