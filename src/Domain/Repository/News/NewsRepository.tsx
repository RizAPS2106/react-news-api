import NewsResult from "../../Entity/News/Structure/NewsResult";

export default interface NewsRepository {
  newsAPI(type: string, query: object[]): Promise<NewsResult>;
}
