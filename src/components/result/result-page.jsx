import React, { useEffect, useState } from 'react';
import searchImg from '../../utils/imgs/search-img.svg';
import { useDispatch, useSelector } from 'react-redux';
import { transformHistogramData } from '../../utils/histogram-data';
import HistogramSlider from '../slider-section/histogram-slider';
import MainButton from '../buttons/main-btn';
import { documentsSearch } from '../../redux/documents';
import { getUser } from '../../utils/utils';
import DocumentCard from './document-card';
import { parseDocuments } from '../../utils/documents-data';


const ResultPage = () => {
    const dispatch = useDispatch();
    const {isLoading, histogramData} = useSelector(state => state.histograms);
    const {objectSearchData} = useSelector(state => state.objectSearch);
    const {documents} = useSelector(state => state.documents);
    const [countNumber, setCountNumber] = useState(0);
    const [visibleCards, setVisibleCards] = useState(10);
    const [parsedDocuments, setParsedDocuments] = useState(null);

    const loadMoreCards = () => {
        setVisibleCards(prevVisibleCards => prevVisibleCards + 10);

        if (visibleCards + 10 > documents.length && countNumber + 100 < objectSearchData.length) {
            setCountNumber(prevCountNumber => prevCountNumber + 100);
        }
    };
    
    useEffect(() => {
        if (objectSearchData && getUser()) {
            dispatch(documentsSearch({token: getUser(), documentsData: objectSearchData, countNumber}))
        }
    }, [objectSearchData, getUser(), countNumber])

    useEffect(() => {
        if (documents) {
            setParsedDocuments(parseDocuments(documents));
        }
    }, [documents]);

  return (
    <div className='result-page'>
        {!parsedDocuments && (
            <section className='search-img'>
                <div>
                    <h1>Ищем. Скоро<br/>будут результаты</h1>
                    <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
                </div>
                <img src={searchImg} alt='search'/>
            </section>
        )}
        <section className='carousel'>
            <h2>Общая сводка</h2>
            <p>Найдено 4 221 вариантов</p>
            <HistogramSlider data={histogramData ? transformHistogramData(histogramData) : []} isLoading={isLoading}/>
        </section>
        {parsedDocuments && (
            <section className='documents-list'>
                <h2>Список документов</h2>
                    <section className='documents'>
                        {parsedDocuments.slice(0, visibleCards).map((item, index) => (
                            <DocumentCard key={index} document={item}/>
                        ))}
                    </section>
                    {visibleCards < objectSearchData.length && (
                        <MainButton onClick={loadMoreCards} styling={'center search-btn'} isDisabled={false}>Показать больше</MainButton>
                    )}
            </section>
        )}
    </div>
  )
}

export default ResultPage