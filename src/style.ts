import {stylesheetSinglentone} from 'react-style-singleton';

const style = stylesheetSinglentone();

const styles = `
.react-reflexible {
  display: -ms-inline-flexbox;
  display: inline-flex;
  
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;

  overflow: hidden;

  box-sizing: border-box;
  max-width: 100%;
  
  height: 1.5em;
  line-height: 1.5em;

  white-space: nowrap;
  text-overflow: ellipsis;
}

.react-reflexible-try {
  display: inline;
  /*flex-basis: 100%;*/
}

.react-reflexible-failback {
  display: block;
  overflow: hidden;

  flex-grow: 1;
  width: 0;

  text-overflow: ellipsis;
}
`;

export const addStyle = () => style.add(styles);
export const removeStyle = () =>style.remove();