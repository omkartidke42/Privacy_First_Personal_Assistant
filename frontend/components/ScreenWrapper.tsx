// import { colors } from '@/constants/theme';
// import { ScreenWrapperProps } from '@/types';
// import React from 'react';
// import { Dimensions, Platform, StatusBar, StyleSheet, View } from 'react-native';

// const {height} = Dimensions.get('window');

// const screenWrapper = ({children}: ScreenWrapperProps) => {
//     let paddingTop = Platform.OS == 'ios'? height * 0.06 : 0.50;
//   return (
//     <View style= {[{
//         paddingTop,
//         flex:1,
//         backgroundColor:colors.neutral900
//     }]} >
//     <StatusBar barStyle={"light-content"} />
//       {children}
//     </View>
//   )
// }

// export default screenWrapper

// const styles = StyleSheet.create({})
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const ScreenWrapper = ({ children }: any) => (
  <SafeAreaView style={styles.wrapper}>{children}</SafeAreaView>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default ScreenWrapper;
