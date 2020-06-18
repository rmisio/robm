import React from 'react';
import {
  GAMEDEV,
  REACT,
  RESPONSIVE
} from 'src/core/tags';
import Page from 'src/components/Page';
import PortfolioItem from './PortfolioItem';
import tetrisL from './portfolio-images/tetris-L.png';
import tetrisM from './portfolio-images/tetris-M.png';
import tetrisXSb64 from './portfolio-images/tetris-XS-base64';
import Logo from 'src/assets/logo-matted.svg';
import './work.scss';

export default function Work() {
  return (
    <Page>
      <div className="Work">
        <header>
          <Logo className="Work-logoMatted" />
          <div className="Work-introWrap">
            <p className="Work-intro1">Hi there 👋</p>
            <h1 className="Work-intro2">I'm a<br />web developer<br />named Rob</h1>
            <p className="Work-intro3">
              Below you will find some recent personal projects.
              If you're more interested in my 9-5-bring-home-the-bacon type work,
              your best bet would be my <a href="https://www.linkedin.com/in/robmisio/" target="_blank">LinkedIn profile</a>.
            </p>
          </div>
        </header>
        <div className="Work-portfolio">
          <PortfolioItem
            className="Work-portfolioItem-tetris"
            title="Tetris"
            description="
              I've always been a big fan of the classic game Tetris. I've always thought
              it would be really cool to code up. I had a little downtime, so I made it
              happen.
            "
            tags={[GAMEDEV, REACT, RESPONSIVE]}
            imageAspectRatio={88.71}
            images={[
              {
                src: tetrisXSb64,
              },
              {
                srcSet: `${tetrisM} 1x, ${tetrisL} 2x`,
                loadOnScroll: true,
              },
            ]}            
          />
        </div>
      </div>
    </Page>
  )
}
