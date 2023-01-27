import BaseViewModel from "../BaseViewModel";

export default interface NewsViewModel extends BaseViewModel {
  type: string;
  query: any;
  news: any;

  isClearButtonVisible: boolean;
  isShowError: boolean;
  errorMessage: string;

  setNewsList(): void;
  getNewsList(): void;
  setQueries(type: string, query: any): void;
  onQueryChanged(): void;
  onSearchClicked(type: string, query: any): void;
  onClearSearchClicked(): void;
}