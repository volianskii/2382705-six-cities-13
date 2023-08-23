const getRatingWidth = (rating: number | undefined) => {
  let ratingWidth = '0%';
  if (rating) {
    switch (Math.round(rating)) {
      case 0:
        ratingWidth = '0%';
        break;
      case 1:
        ratingWidth = '20%';
        break;
      case 2:
        ratingWidth = '40%';
        break;
      case 3:
        ratingWidth = '60%';
        break;
      case 4:
        ratingWidth = '80%';
        break;
      case 5:
        ratingWidth = '100%';
        break;
    }
  }
  return ratingWidth;
};

export default getRatingWidth;
