import { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles/globalStyles';

const ConditionalRendering = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <View style={styles.container}>
            {isLoggedIn ? (
                <Text style={styles.headerText}>Welcome back, user!</Text>
            ) : (
                <Text style={styles.headerText}>Please log in.</Text>
            )}
            <Button
                title={isLoggedIn ? 'Logout' : 'Login'}
                onPress={() => setIsLoggedIn(!isLoggedIn)}
            />
        </View>
    );
};

export default ConditionalRendering;
