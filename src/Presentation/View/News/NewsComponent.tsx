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
  query: object[];
  news: any[];
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
    this.newsViewModel.loadNewsList();
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
        
        { 
          news.length > 1 
          ?
            <Row gutter={[16, 16]}>
              { news.map((item, index)=>(
                <Col key={index} className='col-6'>
                  <Card className='h-100' cover={<img alt="example" src={item['urlToImage']} />} hoverable>
                    <h3>{item['title']}</h3>
                    <p><small>{item['author']}</small></p>
                    <p>{item['description']}</p>
                  </Card>
                </Col>
              )) } 
            </Row>
          :
            <p className='text-center'>Wait...</p>
        }
      </div>
    );
  }
}