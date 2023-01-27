import NewsRepository from '../../Domain/Repository/News/NewsRepository';
import NewsResult from '../../Domain/Entity/News/Structure/NewsResult';
import axios from "axios";

const API_URL = "https://newsapi.org/v2";
const API_KEY = "apiKey=a889fd40432e4dacb29049403dec4bff";

const Axios = axios.create({
  baseURL: API_URL
});

export default class NewsAPI implements NewsRepository {
  getNewsAPI(type: string, query:[]): Promise<NewsResult> {
    return new Promise((resolve, reject) => {
      const availableQuery = ['q', 'from', 'to', 'sortBy', 'country', 'category', 'sources', 'domains'];
      let queryString = '';

      query.forEach(q => {
        if (availableQuery.find(q['type']) === undefined) {
          reject(new Error('Query not found'));
          return;
        }
        queryString+=`${q['type']}=`; 
        queryString+=`${q['value']}&`;
      })      

      Axios.get(`/${type}?${queryString}${API_KEY}`)
      .then(function (response) {
        console.log(response.data);
        resolve({
          news: response.data,
        });
        return;
      })
      .catch(function (error) {
        console.log(error);
        reject(new Error(error));
        return;
      })
    });
  }
}