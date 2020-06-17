import React from "react";
import { Link } from "gatsby"
import Page from 'src/pages/Page';
import Logo from "src/assets/logo-matted.svg";
import './work.scss';

export default function Work() {

  return (
    <Page>
      <div className="Work">
        <header>
          <Logo className="Work-logoMatted" />
          <div className="Work-introWrap">
            <p className="Work-intro1">Hi there 👋</p>
            <p className="Work-intro2">I'm a<br />web developer<br />named Rob</p>
            <p className="Work-intro3">
              Below you will find some recent personal projects.
              If you're more interested in my 9-5-bring-home-the-bacon type work,
              your best bet would be my <a href="https://www.linkedin.com/in/robmisio/" target="_blank">LinkedIn profile</a>.
            </p>
          </div>
        </header>
      </div>
    </Page>
  )
}
