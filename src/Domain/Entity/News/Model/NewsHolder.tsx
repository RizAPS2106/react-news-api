import NewsListener from "./NewsListener";

export default class NewsHolder {
  private newsListener:NewsListener[];
  private isSearched:boolean;
  private type:string;
  private query:object[];
  private news:any[];

  public constructor() {
    this.newsListener = [];
    this.isSearched = false;
    this.type = 'everything';
    this.query = [{type: 'domains', value: 'wsj.com'}];
    this.news = [];
  }

  public getNewsList() {
    return this.news;
  }

  public onLoadNews(news: any[]) {
    this.news = news;
    this.notifyListeners();
  }
  
  public onSearch(type: string, query: object[]) {
    this.type = type;
    this.query = query;
    this.isSearched = true;

    this.notifyListeners();
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
