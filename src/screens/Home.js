import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setItems, setPosition} from '../store/item';
import unsplash from '../providers/unplash';
import DrawerButton from '../components/DrawerButton';
import ImageSquare from '../components/ImageSquare';

function HomeScreen({navigation}) {
  const images = useSelector(state => state.item.homeItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPhotos = async () => {
      const photos = await unsplash.photos.getRandom({
        count: 30,
      });

      dispatch(setItems(photos.data));

      return photos.data;
    };

    getPhotos();
  }, [dispatch]);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.images}
      onPress={() => {
        dispatch(setPosition({positionType: 'home', many: index}));
        navigation.navigate('Detail', {index, from: 'home'});
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
      <View style={styles.header}>
        <DrawerButton
          size={26}
          color={'#000000'}
          onPress={() => navigation.toggleDrawer()}
        />
        <Text style={styles.textHeader}>Discover</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          numColumns={2}
        />
      </ScrollView>
    </View>
  );
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
    marginVertical: height / 16,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'Museo Sans',
    color: '#000000',
    width: width / 1.7,
  },
  contentContainer: {
    paddingBottom: 4,
  },
  images: {
    marginVertical: 4,
  },
});

export default HomeScreen;
