import React from 'react';
import LazyLoadImage from 'src/components/LazyLoadImage';
import './portfolioItem.scss';

export default function PortfolioItem(props) {
  return (
    <section className={`PortfolioItem ${props.className || ''}`}>
      <div className="PortfolioItem-content">
        <h1>{props.title}</h1>
        <p className="PortfolioItem-description">{props.description}</p>
        <ul className="unstyled">
          {
            props
              .tags
              .sort()
              .map(tag => <li key={tag.title.replace(/\s/g, '')}>{tag.title}</li>)
          }
        </ul>
        <div className="PortfolioItem-buttonBar">
          <button>View the source</button>
          <button>View project</button>
        </div>
      </div>
      <LazyLoadImage
        images={props.images}
        aspectRatioPercentage={props.imageAspectRatio}
      />
    </section>
  )
}
