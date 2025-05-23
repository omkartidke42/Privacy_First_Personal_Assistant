import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const welcome = () => {
    const router = useRouter();
  return (
    <>
     <View>
      <Text>Assist. Protect. Repeat</Text>
    </View>

    <View>
         <Pressable style={styles.button} onPress={() => router.push('/register')}>
                <Text style={styles.buttonText}>Go to Register</Text>
              </Pressable>
    </View>
    </>
   
  )
}

export default welcome

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: '#ef4444', // Tailwind "red-500"
    },
    button: {
      backgroundColor: '#3b82f6', // Tailwind "blue-500"
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  