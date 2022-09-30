import MainScreen from '../../pages/main/main';
import MainChildScreen from '../../pages/main/page-content';


type AppScreenProps = {
  pisya: number;
}

function App({pisya}: AppScreenProps): JSX.Element {
  return (
    <MainScreen pisya={pisya}>
      <MainChildScreen/>
    </MainScreen>
  );
}

export default App;
