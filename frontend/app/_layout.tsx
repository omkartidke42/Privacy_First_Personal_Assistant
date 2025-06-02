import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useColorScheme } from '../hooks/useColorScheme';
import { Pressable } from 'react-native';

export default function RootLayout() {
  const router = useRouter();

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ paddingLeft: 15 }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
        }
      }
        
        >

      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
