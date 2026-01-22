import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { styles } from '../styles/globalStyles';

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>USE STATE</Text>
            <Text>Count: {count}</Text>
            <Button title="Increase" onPress={() => setCount(count + 1)} />
        </View>
    );
};

export default Counter;