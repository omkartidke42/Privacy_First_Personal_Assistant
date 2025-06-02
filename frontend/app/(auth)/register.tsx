import BackButton from '../../components/BackButton'
import Input from '../../components/Input'
import ScreenWrapper from '../../components/ScreenWrapper'
import Typo from '../../components/Typo'
import { colors, spacingX, spacingY } from '../../constants/theme'
import { router, useRouter } from 'expo-router'
import { ReactNode, useRef, useState } from 'react'
import React from 'react'
import { ActivityIndicator, Alert, GestureResponderEvent, Pressable, StyleSheet, View } from 'react-native'
import { verticalScale } from '../../utils/styling'
import axios from 'axios'
// import { CustomButtonProps } from '@/types'

const Register = () => {
  const username = useRef('');
  const email = useRef('');
  const password = useRef('');

  const handleSubmit = async () => {
    if (!username.current || !password.current || !email.current) {
      Alert.alert('Register', 'Please fill all the fields');
      return;
    }

    const payload = {
      username: String(username.current),
      email: String(email.current),
      password: String(password.current),
    };
    

    try {
      const res = await axios.post(
        'http://10.121.51.159:8000/register',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Register result:', res.data);
      Alert.alert('Success', res.data.message || 'Registered successfully');

      router.push("/(auth)/login");
    } catch (err: any) {
      console.error('Register error:', err?.response?.data || err.message);
      Alert.alert(
        'Error',
        err?.response?.data?.message || 'Registration failed'
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
        <BackButton iconSize={24} />
        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>Let's,</Typo>
          <Typo size={30} fontWeight={"800"}>Get started</Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.text}>
            Create an account to track all your exepenses
          </Typo>
          <Input placeholder='Enter Your Name'
            onChangeText={(value: string) => (username.current = value)}
          />
          <Input placeholder='Enter Your Email'
            onChangeText={(value: string) => (email.current = value)}
          />
          <Input placeholder='Enter Your Password'
            secureTextEntry
            onChangeText={(value: string) => (password.current = value)}
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
export default Register
