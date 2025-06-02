import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import BackButton from '@/components/BackButton'
import Input from '../../components/Input'
import ScreenWrapper from '../../components/ScreenWrapper'
import Typo from '../../components/Typo'
import { colors, spacingX, spacingY } from '../../constants/theme'
import { router, useRouter } from 'expo-router'
import  { ReactNode, useRef, useState } from 'react'
import { ActivityIndicator, Alert, GestureResponderEvent, Pressable } from 'react-native'
import { verticalScale } from '../../utils/styling'
// import { CustomButtonProps } from '@/types'
import axios from 'axios'


const login = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  
  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Login', 'Please fill all the fields');
      return;
    }
  
    const payload = {
      userEmail: String(emailRef.current),
      userPassword: String(passwordRef.current),
    };
  
    try {
      const res = await axios.post(
        'http://10.121.51.159:3000/api/auth/login', // Use your local IP if testing on physical device
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      Alert.alert('Success', res.data.message || 'Logged In successfully');
  
      router.push("/");
    } catch (err: any) {
      console.error('Login error:', err?.response?.data || err.message);
      Alert.alert(
        'Error',
        err?.response?.data?.message || 'Login failed'
      );
    }
  };
  
  type CustomButtonProps = {
      onPress: (event: GestureResponderEvent) => void;
      loading: boolean;
      children: ReactNode;
    };
    
  const CustomButton: React.FC<CustomButtonProps> = ({ onPress, loading, children }) => (
      <Pressable onPress={onPress} style={styles.button} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          children
        )}
      </Pressable>
      
  )
return (
  <ScreenWrapper>
  <View style={styles.container}>
      {/* <BackButton iconSize={28} /> */}
      <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>Let's,</Typo>
          <Typo size={30} fontWeight={"800"}>Get started</Typo>
      </View>

      <View style={styles.form}>
          <Typo size={16} color={colors.text}>
              Create an account to track all your exepenses
          </Typo>
          <Input placeholder='Enter Your Email'
              onChangeText={(value: string) => (emailRef.current = value)}
              />
          <Input placeholder='Enter Your Password'
              secureTextEntry
              onChangeText={(value: string) => (passwordRef.current = value)}
              />

          <CustomButton onPress={handleSubmit} loading={false}  >
              <Typo fontWeight={'700'} color={'green'} size={21}>Sign Up</Typo>
          </CustomButton>
      </View>

      {/* Footer */}
      {/* <View style={styles.footer} >
          <Typo size={15}>Already have an account?</Typo>
          <Pressable onPress={() => router.navigate("/(auth)/login")} >
              <Typo size={15} color={colors.primary}>
                  Login
              </Typo>
          </Pressable>
      </View> */}
  </View>


</ScreenWrapper>
)
}

const styles = StyleSheet.create({
  button: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
  },
  container: {
      flex: 1,
      gap: spacingY._30,
      paddingHorizontal: spacingX._20
  },
  welcomeImage: {
      width: "100%",
      height: verticalScale(300),
      alignSelf: "center",
      marginTop: verticalScale(100)
  },
  form: {
      gap: spacingY._20
  },
  loginButton: {
      alignSelf: "flex-end",
      marginRight: spacingX._20
  },
  welcomeText: {
      fontSize: verticalScale(20),
      fontWeight: "bold",
      color: colors.text
  },
  forgotPassword: {
      textAlign: "right",
      fontWeight: "500",
      color: colors.text
  },
  footer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 5
  },
  footerText: {
      textAlign: "center",
      color: colors.text,
      fontSize: verticalScale(15)
  }

})
export default login
