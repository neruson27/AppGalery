import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {SharedElement} from 'react-navigation-shared-element';
import Pinchable from 'react-native-pinchable';

function ImageSquare({id, url, title, votes, user, listView, index}) {
  const navigator = useNavigation();

  return (
    <View style={styles.container(listView, index)}>
      <Pinchable>
        <SharedElement id={`item.${id}`}>
          <Image
            source={{uri: url ?? null}}
            style={styles.img(listView)}
            resizeMode="cover"
          />
        </SharedElement>
      </Pinchable>
      <LinearGradient
        colors={['transparent', '#000000']}
        style={styles.textContainer}>
        <ScrollView style={styles.textTitleContainer(listView)}>
          <Text style={styles.textTitle(listView)}>{title}</Text>
        </ScrollView>
        <Text style={styles.textVotes(listView)}>{votes} likes</Text>
        {listView && !user ? (
          <></>
        ) : (
          <TouchableOpacity
            onPress={() => navigator.navigate('Profile', {user})}>
            <View style={styles.user}>
              <Image
                source={{uri: user?.profile_image.small}}
                style={styles.imageProfile}
              />
              <View style={styles.textProfileContainer}>
                <Text style={styles.textName}>{user?.name}</Text>
                <Text style={styles.textProfile}>View profile</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: (listView, index) => ({
    borderRadius: listView ? 10 : 0,
    height: listView ? (height - 80) / 2.5 : height,
    width: listView ? (width - 60) / 2 : width,
    marginHorizontal: listView ? 10 : 0,
    marginTop: !listView || index % 2 === 0 ? 0 : 20,
    backgroundColor: 'transparent',
  }),
  img: listView => ({
    height: '100%',
    borderRadius: listView ? 10 : 0,
  }),
  textTitleContainer: listView => ({
    maxHeight: listView ? 46 : 180,
  }),
  textTitle: listView => ({
    color: 'white',
    fontSize: listView ? 12 : 42,
  }),
  textVotes: listView => ({
    color: 'rgba(255,255,255,0.4)',
    fontSize: listView ? 8 : 14,
  }),
  textContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
  },
  user: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 26,
  },
  imageProfile: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 8,
  },
  textProfileContainer: {
    width: 300,
  },
  textName: {
    color: 'white',
    fontSize: 12,
  },
  textProfile: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
  },
});

export default ImageSquare;
