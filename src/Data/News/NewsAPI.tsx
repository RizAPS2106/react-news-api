import NewsRepository from '../../Domain/Repository/News/NewsRepository';
import NewsResult from '../../Domain/Entity/News/Structure/NewsResult';
import axios from "axios";

const API_URL = "https://newsapi.org/v2";
const API_KEY = "apiKey=a889fd40432e4dacb29049403dec4bff";

const Axios = axios.create({
  baseURL: API_URL
});

export default class NewsAPI implements NewsRepository {
  newsAPI(type: string, query: object[]): Promise<NewsResult> {
    return new Promise((resolve, reject) => {
      let queryString = '';

      query.forEach(q => {
        queryString+=`${q['type']}=`; 
        queryString+=`${q['value']}&`;
      })      

      Axios.get(`/${type}?${queryString}${API_KEY}`)
      .then(function (response) {
        resolve({
          news: response.data.articles
        });
        return;
      })
      .catch(function (error) {
        reject(new Error(error));
        return;
      })
    });
  }
}