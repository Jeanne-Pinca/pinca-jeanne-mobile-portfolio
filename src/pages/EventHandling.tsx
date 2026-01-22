import { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { styles } from '../styles/globalStyles';

const EventHandling = () => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Enter your name" 
        value={name} 
        onChangeText={setName} 
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Show Name" onPress={() => alert(`Hello, ${name}!`)} />
    </View>
  );
};

export default EventHandling;
