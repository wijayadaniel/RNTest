import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  Button,
} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../../../components/atoms/Loader';
import Search from '../../../components/atoms/Search';
import JobCard from '../../../components/molecules/JobCard';
import {getJobList} from '../../services/job';

const JobList = ({navigation}) => {
  const [jobList, setJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paginateLoader, setpaginateLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [isFulltime, setIsFulltime] = useState(false);
  const [locationTxt, setLocationTxt] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getData();
  }, [getData, page, search]);

  const getData = useCallback(() => {
    getJobList(search, isFulltime, locationTxt, jobList, page)
      .then(response => {
        const filtered = response.filter(item => item !== null);
        setJobList(filtered);
        setIsLoading(false);
        setpaginateLoader(false);
      })
      .catch(err => {
        setpaginateLoader(false);
      });
  }, [jobList, page, search]);

  const doLoadMore = () => {
    setpaginateLoader(true);
    setPage(page + 1);
  };

  const renderItem = ({item}) => {
    let compUrl = '';
    if (item.company_url !== null) {
      compUrl = item.compUrl;
    }
    return (
      <JobCard
        logo={item.company_logo}
        title={item.title}
        company={item.company}
        company_url={compUrl}
        location={item.location}
        onPress={() => navigation.navigate('JobDetail', {id: item.id})}
      />
    );
  };

  const renderLoader = () => {
    return <View>{paginateLoader ? <Loader size={'small'} /> : null}</View>;
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row'}}>
        <Search searchValue={text => setSearch(text)} />
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => setShowFilter(!showFilter)}>
          <Icon name="chevron-down" size={24} />
        </TouchableOpacity>
      </View>
      {showFilter ? (
        <View style={styles.filterContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text>Fulltime</Text>
            <Switch
              style={{marginLeft: moderateScale(248)}}
              value={isFulltime}
              onValueChange={() => setIsFulltime(prev => !prev)}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>Location</Text>
            <TextInput
              style={styles.locationTextInput}
              onChangeText={locTxt => setLocationTxt(locTxt)}
              value={locationTxt}
              placeholder="location"
            />
          </View>
          <View style={styles.buttonApply}>
            <Button title="Apply" />
          </View>
        </View>
      ) : null}
      <FlatList
        data={jobList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={() => {
          setPage(1);
          setIsLoading(true);
          getData();
        }}
        onEndReachedThreshold={0.2}
        onEndReached={doLoadMore}
        ListFooterComponent={renderLoader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonApply: {
    alignSelf: 'flex-end',
    height: 36,
    width: 80,
    margin: 8,
  },
  locationTextInput: {
    height: 20,
    width: '80%',
    marginLeft: 16,
    borderWidth: 1,
  },
  filterContainer: {
    margin: scale(8),
    borderColor: '#EAEAEA',
    borderWidth: 0.5,
    elevation: 2,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});

export default JobList;
