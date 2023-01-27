import BaseView from "../View/BaseView";

export default interface BaseViewModel {
  attachView(baseView: BaseView): void;
  detachView(): void;
}