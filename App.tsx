import { SafeAreaView } from 'react-native-safe-area-context';
import FamilyTreeScreen from './src/example/FamilyTreeScreen';

const App = () => {
  console.log('1235');
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <FamilyTreeScreen />
    </SafeAreaView>
  );
};

export default App;
