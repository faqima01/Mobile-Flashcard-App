import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Button from './Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

/**
 * Represents the page that the user is taken to once they click on the deck on the home page
 * @extends Component
 */
class IndividualDeckPage extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  fadeIn = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      timing: 5000,
      useNativeDriver: true,
    }).start();
  };

  componentDidMount() {
    this.fadeIn();
  }

  render() {
    const animatedStyle = { opacity: this.state.animation };
    const { navigation, decks, title } = this.props;
    const cardsNumber = decks[title].questions.length;
    return (
      <Animated.View style={[styles.container, animatedStyle]}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{cardsNumber} Cards</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('NewQuestion', {
                title,
              })
            }
          >
            <Button label='Add New Question' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Quizzes', { title })}
          >
            <Button label='Start the Quiz' />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 100,
  },
});

function mapStateToProps(state, { route }) {
  return {
    decks: state,
    title: route.params.title,
  };
}

export default connect(mapStateToProps)(IndividualDeckPage);
