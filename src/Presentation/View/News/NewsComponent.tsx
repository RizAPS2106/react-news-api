import React from 'react';
import './NewsComponent.css';
import BaseView from '../BaseView';
import NewsViewModel from '../../ViewModel/News/NewsViewModel';
import { Card,Row,Col,Modal,Input,Button } from 'antd';

export interface NewsComponentProps {
  newsViewModel: NewsViewModel;
}

export interface NewsComponentState {
  type: string;
  query: object[];
  news: any[];
  newsItem: any[];
  isClearButtonVisible: boolean;
  isShowError: boolean;
  errorMessage: string;
  openDetail: boolean;
  isShowLoading: boolean;
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
      newsItem: newsViewModel.newsItem,
      isClearButtonVisible: newsViewModel.isClearButtonVisible,
      isShowError: newsViewModel.isShowError,
      errorMessage: newsViewModel.errorMessage,
      openDetail: newsViewModel.openDetail,
      isShowLoading: newsViewModel.isShowLoading
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
      newsItem: this.newsViewModel.newsItem,
      isClearButtonVisible: this.newsViewModel.isClearButtonVisible,
      isShowError: this.newsViewModel.isShowError,
      errorMessage: this.newsViewModel.errorMessage,
      openDetail: this.newsViewModel.openDetail,
      isShowLoading: this.newsViewModel.isShowLoading
    });
  }

  public render() : JSX.Element {
    const { Search } = Input;

    const {
      type,
      query,
      news,
      newsItem,
      isClearButtonVisible,
      isShowError,
      errorMessage,
      openDetail,
      isShowLoading
    } = this.state;

    return (
      <div className='container'>
        <div className="d-flex justify-content-between align-items-center">
          <h1>News</h1>
          <div className="d-flex justify-content-between align-items-center">
            <Search placeholder="search some news" onSearch={(e):void => {this.newsViewModel.onSearchClicked('everything', {type: 'q', value: e})}} style={{ width: 200 }} />
            {
              isClearButtonVisible && (
                <Button onClick={():void => {this.newsViewModel.onClearSearchClicked()}}>Show All</Button>
              )
            }
          </div>
        </div>
        {
          query.length > 1 && (
            <p className='text-end'>Search key : {query[query.length -1]['value']}</p>
          )           
        }

        { 
          isShowLoading 
          ?
            <p className='text-center'>Loading...</p>
          :
            news.length > 1 
            ?
              <Row gutter={[16, 16]}>
                { news.map((item, index)=>(
                  <Col key={index} className='col-6'>
                    <Card className='h-100' cover={<img alt="news cover image" src={item['urlToImage']} />} hoverable onClick={():void => this.newsViewModel.onOpenDetail(item)}>
                      <h3>{item['title']}</h3>
                      <p><small>{item['author']}</small></p>
                      <p>{item['description']}</p>
                    </Card>
                  </Col>
                )) } 
              </Row>
            :
              <p className='text-center'>News not found</p>
        }

        <Modal
          title={<h3>{newsItem['title']}</h3>}
          style={{ top: 20 }}
          open={openDetail}
          okButtonProps={{ style: { display: 'none' } }}
          onCancel={():void => this.newsViewModel.onCloseDetail()}
          cancelText='Close'
          width={1000}
        >
          <img alt="example" src={newsItem['urlToImage']} className='w-100 h-50 mb-3' />
          <p>{newsItem['author']}</p>
          <p>{newsItem['publishedAt']}</p>
          <p>{newsItem['content']}</p>
        </Modal>
      </div>
    );
  }
}