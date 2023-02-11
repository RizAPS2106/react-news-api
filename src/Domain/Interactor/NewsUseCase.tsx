import NewsRepository from '../Repository/News/NewsRepository';
import NewsHolder from '../Entity/News/Model/NewsHolder';

export default class NewsUseCase {
  private newsRepository: NewsRepository;
  private newsHolder: NewsHolder;

  public constructor(newsRepository: NewsRepository, newsHolder: NewsHolder) {
    this.newsRepository = newsRepository;
    this.newsHolder = newsHolder;
  }

  public async newsList(type: string, query: object[]): Promise<void> {
    const newsResult = await this.newsRepository.newsAPI(type, query);
    this.newsHolder.onLoadNews(newsResult.news);
  }
}