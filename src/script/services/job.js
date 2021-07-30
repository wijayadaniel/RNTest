import {request} from './base';
import _ from 'lodash';

const jobAPI = '/recruitment/positions';

export const getJobList = async (search, full_time, location, list, onPage) => {
  let url = '';
  if (search !== '') {
    url = jobAPI + '.json?page=' + onPage + '&description=' + search;
  } else if (full_time && location) {
    url =
      jobAPI +
      '.json?page=' +
      onPage +
      '&description=' +
      search +
      '&location=' +
      location +
      '&full_time=' +
      full_time;
  } else {
    url = jobAPI + '.json?page=' + onPage;
  }
  const res = await request.get(url);

  return new Promise((resolve, reject) => {
    if (res.status === 200) {
      const jobList = _.concat(list, res.data);
      resolve(jobList);
    } else {
      reject(500);
    }
  });
};

export const getJobDetail = async id => {
  const url = jobAPI + '/' + id;
  const res = await request.get(url);
  return res.data;
};
