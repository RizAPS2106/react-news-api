import NewsRepository from '../Repository/News/NewsRepository';
import NewsHolder from '../Entity/News/Model/NewsHolder';

export default class NewsUseCase {
  private newsRepository: NewsRepository;
  private newsHolder: NewsHolder;

  public constructor(newsRepository: NewsRepository, newsHolder: NewsHolder) {
    this.newsRepository = newsRepository;
    this.newsHolder = newsHolder;
  }

  public async newsList(): Promise<void> {
    const newsResult = await this.newsRepository.getNewsAPI('everything', [{type: 'q', value: ''}]);
    console.log(newsResult.news);
    this.newsHolder.setNews(newsResult.news);
    this.newsHolder.getNews();
  }
  
  public async searchNews(type: string, query:any): Promise<void> {
    const newsResult = await this.newsRepository.getNewsAPI(type, query);

    this.newsHolder.onSearch(type, query);
    this.newsHolder.setNews(newsResult.news);
    this.newsHolder.getNews();
  }
}