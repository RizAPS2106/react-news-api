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
  public isClearButtonVisible: boolean;
  public isShowError: boolean;
  public errorMessage: string;

  private baseView?: BaseView;
  private newsUseCase: NewsUseCase;
  private newsHolder: NewsHolder;

  public constructor(newsUseCase: NewsUseCase, newsHolder: NewsHolder) {
    this.type = 'everything';
    this.query = [{type: 'domains', value: 'wsj.com'}];
    this.news = [];
    this.isClearButtonVisible = false;
    this.isShowError = false;
    this.errorMessage = '';

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

  public onInputQueryChanged(type: string, query: any[]) {
    this.type = type;
    this.query = query;
  }

  public loadNewsList = async () : Promise<void> => {
    if (!this.validateQuery()) {
      this.isShowError = true;
      this.errorMessage = "Query not found";
      this.notifyViewAboutChanges();
      return;
    }
    
    try {
      await this.newsUseCase.newsList(this.type, this.query);
      this.isShowError = false;
      this.errorMessage = '';
    } catch (e:any) {
      this.errorMessage = e.message;
      this.isShowError = true;
    }

    this.notifyViewAboutChanges();
  };

  public onSearchClicked = (): void => {
    this.newsHolder.onSearch(this.type, this.query);
  };

  public onClearSearchClicked = (): void => {
    this.newsHolder.onClearSearch();
  };

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