import BaseViewModel from "../BaseViewModel";

export default interface NewsViewModel extends BaseViewModel {
  type: string;
  query: object[];
  news: any[];
  newsItem: any[];
  isClearButtonVisible: boolean;
  isShowError: boolean;
  errorMessage: string;
  openDetail: boolean;
  isShowLoading: boolean;

  loadNewsList(): void;
  onSearchClicked(type: string, query: object): void;
  onClearSearchClicked(): void;
  onOpenDetail(news: any[]): void;
  onCloseDetail(): void;
}