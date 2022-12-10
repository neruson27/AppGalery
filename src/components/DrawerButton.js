import React from 'react';
import {TouchableHighlight, View, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

function DrawerButton({color, size, onPress}) {
  return (
    <TouchableHighlight
      style={styles.root}
      underlayColor="#DDDDDD"
      onPress={onPress}>
      <View style={styles.container(size)}>
        <Svg width={size} height={size / 2} viewBox="0 0 25 12">
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.5 0C0.671573 0 0 0.671573 0 1.5C0 2.32843 0.671573 3 1.5 3H19.5C20.3284 3 21 2.32843 21 1.5C21 0.671573 20.3284 0 19.5 0H1.5ZM5.5 9C4.67157 9 4 9.67157 4 10.5C4 11.3284 4.67157 12 5.5 12H23.5C24.3284 12 25 11.3284 25 10.5C25 9.67157 24.3284 9 23.5 9H5.5Z"
            fill={color}
          />
        </Svg>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  root: {
    marginLeft: 6,
  },
  container: size => ({
    width: size,
    height: size,
    paddingTop: 4,
  }),
});

export default DrawerButton;
