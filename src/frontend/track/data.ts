import { TopViewData, TrackViewData } from '../../data';

const pageData = document.getElementById('page-data');
if (pageData == null) {
  alert('page-data not found');
  throw new Error('page-data not found');
}

const data = JSON.parse(pageData.innerHTML) as TrackViewData;
console.log(data);
export const { track } = data;
