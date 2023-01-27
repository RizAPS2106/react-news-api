import NewsViewModel from './NewsViewModel';
import BaseView from '../../View/BaseView';
import NewsUseCase from '../../../Domain/Interactor/NewsUseCase';
import NewsHolder from '../../../Domain/Entity/News/Model/NewsHolder';
import NewsListener from '../../../Domain/Entity/News/Model/NewsListener';

export default class NewsViewModelImpl implements NewsViewModel, NewsListener {
  public type: string;
  public query: any;
  public news: any; 

  private baseView?: BaseView;
  private newsUseCase: NewsUseCase;
  private newsHolder: NewsHolder;
  
  public isClearButtonVisible: boolean;
  public isShowError: boolean;
  public errorMessage: string;

  public constructor(newsUseCase: NewsUseCase, newsHolder: NewsHolder) {
    this.type = '';
    this.query = [];
    this.news = [];

    this.newsUseCase = newsUseCase;
    this.newsHolder = newsHolder;
    this.newsHolder.addNewsListener(this);

    this.isClearButtonVisible = false;
    this.isShowError = false;
    this.errorMessage = '';
  }

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };
  
  public setQueries(type: string, query: any) {
    this.type = type;
    this.query = query;
  }

  public setNewsList = async () : Promise<void> => {
    try {
        await this.newsUseCase.newsList();
        this.isShowError = false;
        this.errorMessage = '';
    } catch (e) {
        this.errorMessage = e.message;
        this.isShowError = true;
    }

    this.notifyViewAboutChanges();
  };

  public onSearchClicked = async (type: string, query: any) : Promise<void> => {
    this.type = type;
    this.query = query;

    try {
        await this.newsUseCase.searchNews(this.type, this.query);
        this.isShowError = false;
        this.errorMessage = '';
    } catch (e) {
        this.errorMessage = e.message;
        this.isShowError = true;
    }

    this.notifyViewAboutChanges();
  };

  public onClearSearchClicked = (): void => {
    this.newsHolder.onClearSearch();
  };

  public getNewsList(): void {
    this.news = this.newsHolder.getNews();
  }

  public onQueryChanged = (): void => {
    if (this.newsHolder.isNewsSearched()) {
      this.isClearButtonVisible = false;
    } else {
      this.isClearButtonVisible = true;
    }

    this.notifyViewAboutChanges();
  };

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };
}