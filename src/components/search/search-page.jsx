import React from 'react';
import SearchForm from './search-form';
import searchImg from '../../utils/imgs/rocket.svg';
import docImg from '../../utils/imgs/document.svg';
import foldersImg from '../../utils/imgs/folders.svg';

const SearchPage = () => {
  return (
    <div className='search-page'>
        <div className='search-container'>
            <h1>Найдите необходимые данные в пару кликов.</h1>
            <p className='description'>Задайте параметры поиска.<br/>Чем больше заполните, тем точнее поиск</p>
            <SearchForm />
        </div>
        <div className='imgs-container'>
            <div>
                <img src={docImg} alt='document' className='document-image'/>
                <img src={foldersImg} alt='folders' className='folders-img'/>
            </div>
            <img src={searchImg} alt='search' className='search-img'/>
        </div>

    </div>
  )
}

export default SearchPage