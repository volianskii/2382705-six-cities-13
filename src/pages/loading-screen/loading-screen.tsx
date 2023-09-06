import { GridLoader } from 'react-spinners';
import { Colors } from '../../constants/colors.ts';

import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className='spinner-container'>
      <GridLoader color={Colors.Blue} size={50} />
      <p>Loading...</p>
    </div>
  );
}

export default LoadingScreen;
