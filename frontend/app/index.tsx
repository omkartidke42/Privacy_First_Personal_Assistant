import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();
  useEffect(() =>{
    setTimeout(() => {
      router.push("/welcome")
    }, 3000);
  })

  return (
    <>
    <View>
      <Text>Welcome</Text>
    </View>
    </>
  );
};

export default Index;

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
