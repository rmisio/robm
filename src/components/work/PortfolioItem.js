import React from 'react';
import LazyLoadImage from 'src/components/LazyLoadImage';
import './portfolioItem.scss';
import 'src/styles/hover.scss';

export default function PortfolioItem(props) {
  const links = [];

  if (props.sourceLink) {
    links.push((
      <a
        href={props.sourceLink}
        target="_blank"
        className="hvr-underline-from-left"
      >View the source</a>
    ));
  }

  if (props.projectLink) {
    links.push((
      <a
        href={props.projectLink}
        target="_blank"
        className="hvr-underline-from-left"
      >View project</a>
    ));
  }

  let buttonBar = null;

  if (links.length) {
    buttonBar = (
      <div className="PortfolioItem-buttonBar">
        {links.map(l => <div className="PortfolioItem-buttonBarLinkWrap">{l}</div>)}
      </div>
    );
  }

  return (
    <section className={`PortfolioItem ${props.className || ''}`}>
      <div className="PortfolioItem-content">
        <h1>{props.title}</h1>
        <p className="PortfolioItem-description">{props.description}</p>
        <ul className="PortfolioItem-tags unstyled">
          {
            props
              .tags
              .sort()
              .map(tag => (
                <li
                  key={tag.title.replace(/\s/g, '')}
                  className="PortfolioItem-tag"
                >{tag.title}</li>
              ))
          }
        </ul>
        {buttonBar}
      </div>
      <LazyLoadImage
        images={props.images}
        aspectRatioPercentage={props.imageAspectRatio}
      />
    </section>
  )
}
