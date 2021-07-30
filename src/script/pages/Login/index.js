import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-simple-toast';

const Login = ({navigation}) => {
  const [username, setUserName] = useState('admin');
  const [password, setPassword] = useState('admin');

  const checkLogin = () => {
    if (username && password === 'admin') {
      navigation.navigate('JobList');
    } else {
      Toast.show('username and password is admin');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={username => setUserName(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={checkLogin} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#3C98F0',
  },
  loginText: {
    color: 'white',
  },
});

export default Login;
