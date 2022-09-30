import MainScreen from '../../pages/main/main';

type AppScreenProps = {
  pisya: number;
}

function App({pisya}: AppScreenProps): JSX.Element {
  return (
    <MainScreen pisya={pisya}/>
  );
}

export default App;
