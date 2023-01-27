import NewsResult from "../../Entity/News/Structure/NewsResult";

export default interface NewsRepository {
  getNewsAPI(type: string, query:any): Promise<NewsResult>;
}
