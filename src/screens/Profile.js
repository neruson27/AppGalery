import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setProfileItems, setPosition} from '../store/item';
import unsplash from '../providers/unplash';
import ImageSquare from '../components/ImageSquare';
import BackButton from '../components/BackButton';

function ProfileScreen({navigation, route}) {
  const {user} = route.params;
  const dispatch = useDispatch();
  const images = useSelector(state => state.item.profileItems);

  useEffect(() => {
    dispatch(setProfileItems([]));

    const getPhotos = async () => {
      const photos = await unsplash.users.getPhotos(user.username);

      dispatch(setProfileItems(photos.data));

      return photos.data;
    };

    getPhotos();
  }, [user, dispatch]);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.images}
      onPress={() => {
        dispatch(setPosition({positionType: 'profile', many: index}));
        navigation.navigate('Detail', {index, from: 'profile'});
      }}>
      <ImageSquare
        id={item.id}
        url={item.urls.full}
        title={item.description}
        votes={item.likes}
        listView={true}
        index={index}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <TouchableHighlight style={styles.backButton}>
        <BackButton
          size={40}
          color={'#000000'}
          onPress={() => {
            dispatch(setProfileItems([]));
            navigation.goBack();
          }}
        />
      </TouchableHighlight>
      <View style={styles.user}>
        <Image
          source={{uri: user.profile_image.small}}
          style={styles.imageProfile}
        />
        <View style={styles.textProfileContainer}>
          <Text style={styles.textName}>{user.name}</Text>
          <ScrollView>
            <Text style={styles.textProfile}>{user.bio}</Text>
          </ScrollView>
        </View>
      </View>
      <View>
        <Text style={styles.textMyPhotos}>My Photos</Text>
        <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
          <FlatList
            data={images}
            renderItem={renderItem}
            ListEmptyComponent={() => (
              <Text style={styles.emptyState}>Empty</Text>
            )}
            keyExtractor={item => `${item.id}`}
            numColumns={2}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  container: {
    height: height,
    width: width,
  },
  emptyState: {
    color: 'black',
    margin: height / 8,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 100,
  },
  user: {
    flexDirection: 'row',
    marginTop: height / 7,
    paddingLeft: 15,
    marginBottom: 10,
    height: '10%',
  },
  imageProfile: {
    width: 64,
    height: 64,
    borderRadius: 30,
    marginRight: 8,
  },
  textProfileContainer: {
    width: '75%',
  },
  textName: {
    color: 'black',
    fontSize: 22,
  },
  textProfile: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 12,
  },
  textMyPhotos: {
    color: 'black',
    paddingLeft: 15,
    fontFamily: 'Museo Sans',
    fontWeight: 'bold',
    fontSize: 42,
  },
  contentContainer: {
    paddingBottom: '55%',
  },
});

export default ProfileScreen;
