import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles/globalStyles';

interface TestProps {
  name: string;
}

const AnotherComponent: React.FC<TestProps> = ({ name }) => {
  return <Text>Another {name} Component</Text>
}

const FunctionalComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Functional Component</Text>
      <AnotherComponent name='Test'></AnotherComponent>
    </View>
  )
}

export default FunctionalComponent;
