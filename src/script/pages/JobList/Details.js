import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, useWindowDimensions, ScrollView} from 'react-native';
import RenderHTML from 'react-native-render-html';
import Loader from '../../../components/atoms/Loader';
import JobCard from '../../../components/molecules/JobCard';
import {getJobDetail} from '../../services/job';
import {moderateScale} from 'react-native-size-matters';

const JobDetail = ({route}) => {
  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {id} = route.params;

  useEffect(() => {
    getData();
    return () => {
      getData();
    };
  }, [getData, id]);

  const getData = useCallback(() => {
    getJobDetail(id).then(response => {
      setDetail(response);
      setIsLoading(false);
    });
  }, [id]);

  console.log(`--- data`, detail.description);
  const {description} = detail;
  const {width} = useWindowDimensions();
  if (isLoading) return <Loader />;
  return (
    <ScrollView>
      <Text>Company</Text>
      <JobCard
        logo={detail.company_logo}
        title={detail.title}
        company={detail.company}
        company_url={detail.company_url}
        isDetail
      />
      <Text>Job Spesification</Text>
      <View
        style={{
          backgroundColor: 'white',
          margin: moderateScale(8),
          borderWidth: 0.5,
          borderColor: 'black',
          paddingHorizontal: moderateScale(8),
          borderRadius: 4,
        }}>
        <RenderHTML contentWidth={width} source={{html: description}} />
      </View>
    </ScrollView>
  );
};

export default JobDetail;
