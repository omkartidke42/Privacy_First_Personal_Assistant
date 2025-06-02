import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { verticalScale } from '../../utils/styling';

const Welcome = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Assist. Protect. Repeat</Text>

      <Animated.Image
        source={require('/home/qed42/Desktop/React_Native/P_A_Project/frontend/assets/images/pngImage.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Pressable style={styles.button} onPress={() => router.push('/register')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#facc15', 
    marginBottom: verticalScale(40),
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: verticalScale(250),
    marginBottom: verticalScale(40),
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 5,
    borderColor: '#fff',
    backgroundColor:'#f5f5f5'
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
