import { TopViewData } from '../../data';

const pageData = document.getElementById('page-data');
if (pageData == null) {
  alert('page-data not found');
  throw new Error('page-data not found');
}

const data = JSON.parse(pageData.innerHTML) as TopViewData;
console.log(data);
export const { tracksCount, recentSearchedTracks } = data;
