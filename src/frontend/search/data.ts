import { SearchViewData } from '../../data';

const searchData = document.getElementById('page-data');
if (searchData == null) {
  alert('page-data not found');
  throw new Error('page-data not found');
}

const data = JSON.parse(searchData.innerHTML) as SearchViewData;
console.log(data);
export const { searchResult } = data;
