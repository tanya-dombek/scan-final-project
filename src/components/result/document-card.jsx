import React from 'react';
import MainButton from '../buttons/main-btn';

const DocumentCard = ({document}) => {
  return (
    <div className='document-card'>
        <div className='date-link'>
            <p>{document.issueDate}</p>
            {!!document.url ? <a href={document.url} target='_blank' rel="noreferrer">{document.source}</a> :
            <p>{document.source}</p>}
        </div>
        <h4>{document.title}</h4>
        {document.attribute !== '' && (
            <span>{document.attribute}</span>
        )}
        <div className='doc-content'>
        {document.content.imageUrl && (
                <img src={document.content.imageUrl} alt={document.title} />
            )}
            <p className="content">{document.content.text}</p>
        </div>
        <div className={!document.url ? 'doc-card-footer no-url' : 'doc-card-footer'}>
            {document.url && <MainButton styling='doc-card-btn'><a href={document.url} target='_blank' rel="noreferrer">Читать в источнике</a></MainButton>}
            <p className={!document.url ? 'no-url' : ''}>{`${document.wordCount} слова`}</p>
        </div>

    </div>
  )
}

export default DocumentCard