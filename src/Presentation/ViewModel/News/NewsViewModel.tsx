import BaseViewModel from "../BaseViewModel";

export default interface NewsViewModel extends BaseViewModel {
  type: string;
  query: object[];
  news: any[];
  isClearButtonVisible: boolean;
  isShowError: boolean;
  errorMessage: string;

  loadNewsList(): void;
  onInputQueryChanged(type: string, query: object[]): void;
  onClearSearchClicked(): void;
}