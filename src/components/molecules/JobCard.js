import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Linking,
} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const JobCard = ({
  logo,
  title,
  company,
  company_url,
  location,
  onPress,
  isDetail,
}) => {
  const compUrl = company_url !== null ? company_url : '';
  const handleClick = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Image
              // source={
              //   logo == null ? require('../../img/no_image.png') : {uri: logo}
              // }
              source={{uri: logo}}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.description}>
            <Text>{title}</Text>
            <Text>{company}</Text>
            {isDetail ? (
              <TouchableOpacity onPress={() => handleClick(compUrl)}>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    textDecorationColor: 'blue',
                    color: 'blue',
                  }}>
                  Open website
                </Text>
              </TouchableOpacity>
            ) : (
              <Text>{location}</Text>
            )}
          </View>
          {isDetail ? null : (
            <View style={styles.icon}>
              <Icon name="chevron-right" />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: scale(8),
    borderRadius: moderateScale(5),
    backgroundColor: '#FFF',
    borderColor: '#EAEAEA',
    borderWidth: 0.5,
    shadowOpacity: 0.5,
    shadowColor: '#FFFFFF',
    elevation: 2,
  },
  description: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: moderateScale(8),
  },
  icon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: moderateScale(4),
  },
  image: {
    height: moderateScale(100),
    width: moderateScale(80),
  },
});

export default JobCard;
