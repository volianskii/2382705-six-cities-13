import { GridLoader } from 'react-spinners';
import { COLORS } from '../../constants/colors.ts';
import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className='container'>
      <GridLoader color={COLORS.Blue} size={50} />
    </div>
  );
}

export default LoadingScreen;
