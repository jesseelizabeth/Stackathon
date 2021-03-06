import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';
import { signup } from '../../utils/auth';

export default class Signup extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#4834d4',
    },
    headerTintColor: '#fff',
  };
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.state = {
      loading: false,
      email: '',
      password: '',
      username: '',
    };
    this.handleSignup = this.handleSignup.bind(this);
    // this.saveUser = this.saveUser.bind(this);
    // this.singUpAndSaveUser = this.singUpAndSaveUser.bind(this);
  }
  handleSignup() {
    this.setState({ loading: true });
    const { email, password, username } = this.state;
    try {
      signup(email, password, username).then(() => {
        this.setState({ loading: false });
        this.props.navigation.navigate('Welcome');
      });
    } catch (error) {
      this.setState({ loading: false });
    }
  }
  // saveUser() {
  //   this.ref.add({ email: this.state.email });
  // }
  // singUpAndSaveUser() {
  //   this.saveUser();
  //   this.handleSignup();
  // }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          placeholder="username"
          placeholderTextColor="rgba(255,255,255,0.7)"
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
          returnKeyType="next"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          ref={input => (this.passwordInput = input)}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text onPress={this.handleSignup} style={styles.buttonText}>
            SIGN UP
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4834d4',
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 20,
  },
  buttonContainer: {
    backgroundColor: '#eb4d4b',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
