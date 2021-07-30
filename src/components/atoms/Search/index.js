import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const active = '#3C98F0';
const unactive = '#C2C2C2';

const Search = ({searchValue}) => {
  const [hover, setHover] = useState(false);
  const [search, setChangeSearch] = useState('');
  return (
    <View
      style={{
        paddingTop: moderateScale(8),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={[
          styles.searchContainer,
          hover ? {borderColor: active} : {borderColor: unactive},
        ]}>
        <Icon name="search" style={{margin: scale(4)}} />
        <TextInput
          placeholder={'Search Name'}
          defaultValue={search}
          onFocus={() => setHover(!hover)}
          onBlur={() => setHover(false)}
          onSubmitEditing={() => searchValue(search)}
          onChangeText={(text) => setChangeSearch(text)}
          style={styles.textInput}
        />
        {search ? (
          <TouchableOpacity
            onPress={() => {
              setChangeSearch('');
              searchValue('');
            }}>
            <Icon name="times-circle" />
          </TouchableOpacity>
        ) : (
          <View style={{width: scale(16)}} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: moderateScale(28),
    height: moderateScale(28),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    width: '85%',
  },
  textInput: {
    width: moderateScale(200),
    height: moderateScale(28),
    paddingTop: moderateScale(-3),
    paddingBottom: moderateScale(4),
    color: 'black',
  },
});

export default Search;
