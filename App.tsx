import { StyleSheet, Text, View } from 'react-native';
import FunctionalComponent from './src/pages/FunctionalComponent';
import Counter from './src/pages/UseState';
import { styles } from './src/styles/globalStyles';
import ConditionalRendering from './src/pages/ConditionalRendering';
import EventHandling from './src/pages/EventHandling';
import UseEffect from './src/pages/UseEffect';
import UseContext from './src/pages/UseContext';

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <UseEffect/>
      {/* <Counter></Counter>
      <ConditionalRendering></ConditionalRendering>
      <EventHandling></EventHandling>
      <UseEffect></UseEffect> */}
    </View>
    // <UseContext></UseContext>
  );
}