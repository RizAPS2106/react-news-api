import React from 'react';
import './NewsComponent.css';
import BaseView from '../BaseView';
import NewsViewModel from '../../ViewModel/News/NewsViewModel';
import { Card,Row,Col } from 'antd';

export interface NewsComponentProps {
  newsViewModel: NewsViewModel;
}

export interface NewsComponentState {
  type: string;
  query: any;
  news: any;

  isClearButtonVisible: boolean;
  isShowError: boolean;
  errorMessage: string;
}

export default class NewsComponent extends React.Component<NewsComponentProps, NewsComponentState> implements BaseView {
  private newsViewModel: NewsViewModel;

  public constructor(props: NewsComponentProps) {
    super(props);

    const { newsViewModel } = this.props;
    this.newsViewModel = newsViewModel;

    this.state = {
      type: newsViewModel.type,
      query: newsViewModel.query,
      news: newsViewModel.news,

      isClearButtonVisible: newsViewModel.isClearButtonVisible,
      isShowError: newsViewModel.isShowError,
      errorMessage: newsViewModel.errorMessage,
    };
  }

  public componentDidMount(): void {
    this.newsViewModel.attachView(this);
    this.newsViewModel.setNewsList();
    this.newsViewModel.getNewsList();
  }
  
  public componentWillUnmount(): void {
    this.newsViewModel.detachView();
  }

  public onViewModelChanged(): void {
    this.setState({
      type: this.newsViewModel.type,
      query: this.newsViewModel.query,
      news: this.newsViewModel.news,

      isClearButtonVisible: this.newsViewModel.isClearButtonVisible,
      isShowError: this.newsViewModel.isShowError,
      errorMessage: this.newsViewModel.errorMessage,
    });
  }

  public onSearchClick(type: string, query: any): void {
    this.newsViewModel.onSearchClicked(type, query);
    this.newsViewModel.setQueries(type, query);
    this.newsViewModel.getNewsList();
  };

  public render() : JSX.Element {
    const {
        type,
        query,
        news,
        isClearButtonVisible,
        isShowError,
        errorMessage,
    } = this.state;

    return (
        <div className='container'>
            <h1>News</h1>
            <Row>
                <Col>
                    <Card title="Card">
                        <h3></h3>
                        <p>Card content</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
  }
}