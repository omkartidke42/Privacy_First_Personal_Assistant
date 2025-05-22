import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';

// Define the prop types here
export type BackButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

// Replace these constants with actual values or imports if needed
const colors = {
  white: '#FFFFFF',
  neutral500: '#666666'
};

const radius = {
  _12: 12
};

// Dummy function for scaling; replace with your actual logic
const verticalScale = (size: number) => size;

const BackButton = ({
  style,
  iconSize = 26
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={[styles.button, style]}>
      {/* <CaretLeft size={verticalScale(iconSize)} color={colors.white} weight="bold" /> */}
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral500,
    alignSelf: 'flex-start',
    borderRadius: radius._12,
    borderCurve: 'continuous',
    padding: 5,
    marginTop: 5
  }
});
