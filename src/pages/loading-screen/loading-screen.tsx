import {GridLoader} from 'react-spinners';

function LoadingScreen(): JSX.Element {
  return (
    <div style={{height:'100vh', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
      <GridLoader color='#6f96e5' size={50} />
    </div>
  );
}

export default LoadingScreen;
