import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-burgundy text-white font-cairo">
      <View style={styles.container}>
        <Text style={styles.title}>خامة</Text>
        <Text style={styles.subtitle}>React Native (Expo 50)</Text>
        <StatusBar style="auto" />
      </View>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#722F37',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    color: '#D4AF37',
    fontWeight: 'bold',
    fontFamily: 'Cairo', // Requires font loading in production
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  }
});
