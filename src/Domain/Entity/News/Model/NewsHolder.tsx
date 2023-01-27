import NewsListener from "./NewsListener";

export default class NewsHolder {
  private newsListener:NewsListener[];
  private isSearched:boolean;
  private type:string;
  private query:any;
  private news:any;

  public constructor() {
    this.newsListener = [];
    this.isSearched = false;
    this.type = 'everything';
    this.query = [{type: 'q', value: ''}];
    this.news = [];
  }

  public setNews(news: []) {
    this.news = news;
  }

  public getNews() {
    return this.news;
  }
  
  public onSearch(type: string, query: []) {
    this.type = type;
    this.query = query;
    this.isSearched = true;
  }

  public onClearSearch() {
    this.type = 'everything';
    this.query = [{type: 'q', value: ''}];
    this.isSearched = false;

    this.notifyListeners();
  }
  
  public isNewsSearched() {
    return this.isSearched;
  }

  public getQueries() {
    return [{type: this.type, query: this.query}];
  }

  public addNewsListener(newsListener: NewsListener): void {
    this.newsListener.push(newsListener);
  }

  public removeNewsListener(newsListener: NewsListener): void {
    this.newsListener.splice(this.newsListener.indexOf(newsListener), 1);
  }

  private notifyListeners(): void {
    this.newsListener.forEach((listener) => listener.onQueryChanged());
  }
}
