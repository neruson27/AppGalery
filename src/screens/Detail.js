import React from 'react';
import {StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {setPosition, setProfileItems} from '../store/item';
import ImageSquare from '../components/ImageSquare';
import BackButton from '../components/BackButton';

function DetailScreen({navigation, route}) {
  const {from} = route.params;
  const position = useSelector(state => state.item[`${from}ItemPosition`]);
  const item = useSelector(state => state.item[`${from}Items`])[position];
  const dispatch = useDispatch();
  const translateX = new Animated.Value(0);
  const onPanGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
        },
      },
    ],
    {useNativeDriver: true},
  );
  const onPanEnded = ({nativeEvent}) => {
    if (nativeEvent.translationX > 0) {
      dispatch(setPosition({positionType: from, many: position - 1}));
    } else {
      dispatch(setPosition({positionType: from, many: position + 1}));
    }
    translateX.setValue(0);
  };

  return (
    <PanGestureHandler onGestureEvent={onPanGestureEvent} onEnded={onPanEnded}>
      <Animated.View
        style={[styles.root, styles.animatedTranslateX(translateX)]}>
        <TouchableOpacity style={styles.backButton}>
          <BackButton
            size={40}
            color={'#FFFFFF'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
        <ImageSquare
          id={item.id}
          url={item.urls.full}
          title={item.description}
          votes={item.likes}
          user={item.user}
          listView={false}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 100,
  },
  animatedTranslateX: translateX => ({
    transform: [
      {
        translateX: translateX,
      },
    ],
  }),
});

export default DetailScreen;
