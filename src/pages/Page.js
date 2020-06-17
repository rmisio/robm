import React from 'react';
import 'typeface-khula';
import 'src/styles/main.scss';

export default function Page(props) {
  return (
    <div className="Page">{props.children}</div>
  )
}