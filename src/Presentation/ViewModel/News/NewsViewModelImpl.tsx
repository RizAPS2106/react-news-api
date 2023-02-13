import NewsViewModel from './NewsViewModel';
import BaseView from '../../View/BaseView';
import NewsUseCase from '../../../Domain/Interactor/NewsUseCase';
import NewsHolder from '../../../Domain/Entity/News/Model/NewsHolder';
import NewsListener from '../../../Domain/Entity/News/Model/NewsListener';
import QueryValidator from '../../Util/QueryValidator';

export default class NewsViewModelImpl implements NewsViewModel, NewsListener {
  public type: string;
  public query: object[];
  public news: any[]; 
  public newsItem: any[]; 
  public isClearButtonVisible: boolean;
  public isShowError: boolean;
  public errorMessage: string;
  public openDetail: boolean;
  public isShowLoading: boolean;

  private baseView?: BaseView;
  private newsUseCase: NewsUseCase;
  private newsHolder: NewsHolder;

  public constructor(newsUseCase: NewsUseCase, newsHolder: NewsHolder) {
    this.type = 'everything';
    this.query = [{type: 'domains', value: 'wsj.com'}];
    this.news = [];
    this.newsItem = [];
    this.isClearButtonVisible = false;
    this.isShowError = false;
    this.errorMessage = '';
    this.openDetail= false;
    this.isShowLoading= true;

    this.newsUseCase = newsUseCase;
    this.newsHolder = newsHolder;
    this.newsHolder.addNewsListener(this);
  }

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };
  
  public onQueryChanged = (): void => {
    this.news = this.newsHolder.getNewsList();

    this.notifyViewAboutChanges();
  };

  public loadNewsList = async () : Promise<void> => {
    if (!this.validateQuery()) {
      this.isShowError = true;
      this.errorMessage = "Query not found";
      this.notifyViewAboutChanges();
      return;
    }

    this.isShowLoading = true;
    
    try {
      await this.newsUseCase.newsList(this.type, this.query);
      this.isShowError = false;
      this.errorMessage = '';
      this.isShowLoading = false;
    } catch (e:any) {
      this.isShowError = true;
      this.errorMessage = e.message;
      this.isShowLoading = false;
    }

    this.notifyViewAboutChanges();
  };

  public onSearchClicked = (type: string, query: object): void => {
    if(query['value'] === '') {
      return
    }

    this.newsHolder.onSearch(type, [{type: 'domains', value: 'wsj.com'}, query]);
    this.type = type;
    this.query = [{type: 'domains', value: 'wsj.com'}, query];
    this.isClearButtonVisible = true;
    
    this.loadNewsList();

    this.notifyViewAboutChanges();
  };

  public onClearSearchClicked = (): void => {
    this.newsHolder.onClearSearch();
    this.type = 'everything';
    this.query = [{type: 'domains', value: 'wsj.com'}];
    this.isClearButtonVisible = false;

    this.loadNewsList();

    this.notifyViewAboutChanges();
  };

  public onOpenDetail = (newsItem: any[]): void => {
    this.newsItem = newsItem;
    this.openDetail = true;
    
    this.notifyViewAboutChanges();
  }

  public onCloseDetail = (): void => {
    this.newsItem = [];
    this.openDetail = false;

    this.notifyViewAboutChanges();
  }

  private validateQuery = (): boolean => {
    if (!QueryValidator.isValidQuery(this.query)) {
      this.isShowError = true;
      this.errorMessage = 'Query not found';
      return false;
    }

    if (this.errorMessage === 'Query not found') {
      this.isShowError = false;
      this.errorMessage = '';
    }

    return true;
  }

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };
}