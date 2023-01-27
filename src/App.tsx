import React from 'react';
import NewsComponent from './Presentation/View/News/NewsComponent';
import NewsViewModelImpl from './Presentation/ViewModel/News/NewsViewModelImpl';
import NewsAPI from './Data/News/NewsAPI';
import NewsUseCase from './Domain/Interactor/NewsUseCase';
import NewsHolder from './Domain/Entity/News/Model/NewsHolder';

function App() : JSX.Element {
  // data
  const newsRepository = new NewsAPI();
  
  // domain
  const newsHolder = new NewsHolder();
  const newsUseCase = new NewsUseCase(newsRepository, newsHolder);
  
  // view
  const newsViewModel = new NewsViewModelImpl(newsUseCase, newsHolder);

  return (
    <div className="app-container d-flex container-fluid">
      <NewsComponent newsViewModel={newsViewModel} />
    </div>
  );
}

export default App;
