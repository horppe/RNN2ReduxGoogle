import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import * as appActions from '../../reducers/app/actions';
import { Navigation } from 'react-native-navigation';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import MountainBackground from '../../components/MountainBackground';
// this is a traditional React component connected to the redux store
class LoginScreen extends PureComponent {
  static get options() {
    return {
      topBar: {
        visible: true,
        drawBehind: false,
        background: {
          color: 'white',
        },
        title: {
          text: 'Login',
          fontSize: 20,
          color: '#3c0e65',
        },
      },
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  render() {
    let isLoading = false;
    const {
      user,
      updateUser,
      proceedToDashboard,
    } = this.props;
    return (
      <MountainBackground>
        <View style={{ marginTop: 80 }}>
          <View style={styles.inputWrapper}>
            <CustomTextInput
              placeholder={'Enter username'}
              editable={!isLoading}
              returnKeyType={'next'}
              blurOnSubmit={false}
              withRef={true}
              value={user.email}
              onChangeText={username => updateUser({ username })}
            />
          </View>
          <View style={styles.inputWrapper}>
            <CustomTextInput
              name={'password'}
              placeholder={'Enter password'}
              editable={!isLoading}
              returnKeyType={'done'}
              secureTextEntry={true}
              withRef={true}
              value={user.password}
              onChangeText={password => updateUser({ password })}
              isEnabled={!isLoading}
            />
          </View>
          <CustomButton
            colors={['#FAFAFA', '#FFFFFF']}
            text={'LOGIN'}
            onPress={() => proceedToDashboard()}
            buttonStyle={{}}
            textStyle={{ color: '#3c0e65' }}
          />
        </View>
      </MountainBackground>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'blue',
  },
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    user: state.app.user,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    proceedToDashboard: () => dispatch(appActions.login()),
    updateUser: fields => dispatch(appAction.updateUser(fields)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
