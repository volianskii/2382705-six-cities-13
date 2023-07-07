import MainPage from '../../pages/main-page/main-page.jsx';

type AppProps = {
  cardsCount: number;
};

function App({cardsCount}: AppProps) {
  return (
    <MainPage cardsCount={cardsCount} />
  );
}

export default App;
