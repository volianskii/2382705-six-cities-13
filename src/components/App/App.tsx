import MainPage from '../../pages/Main/Main.jsx';

type AppProps = {
  cardsCount: number;
};

function App({cardsCount}: AppProps) {
  return (
    <MainPage cardsCount={cardsCount} />
  );
}

export default App;
