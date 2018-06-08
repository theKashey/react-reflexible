import * as React from 'react';
import {Component} from 'react';
import styled from 'styled-components';

import {FlexiblePick, FlexibleRender, Reflexible, Try} from "../src";

export interface AppState {

}

const Block = styled.div`
    resize: horizontal;
    overflow: hidden;
    box-sizing: border-box;
    width: 400px
    padding: 0.5em 1em;
    border: 1px solid;
    margin: 20px;
`;

const Button = () => (
  <button style={{width: '100%'}}>
    <Reflexible>
      <Try><Try>Star </Try>⭐️</Try>
      Reflexible
    </Reflexible>
  </button>
);

const PickButton = () => (
  <button style={{width: '100%'}}>
    <FlexiblePick
      try={[
        '⭐️ Reflexible',
        'Star!',
        '⭐️'
      ]}
    >
    </FlexiblePick>
  </button>
);

export default class App extends Component <{}, AppState> {
  state: AppState = {}

  render() {
    return (
      <div>
        <Block>
          <Reflexible>
            Control1
          </Reflexible>
        </Block>

        <Block>
          Control2
        </Block>

        <Block>
          <Reflexible>
            <Try>1</Try> 3 <Try>2</Try>
          </Reflexible>
        </Block>

        <Block>
          <Reflexible>
            <Try>🐈</Try> Walking cats <Try>🐈</Try>
          </Reflexible>
        </Block>

        <Block>
          <Reflexible>
            <Try>🐈<Try>🐈</Try></Try> Walking cats <Try>🐈<Try>🐈</Try></Try>
          </Reflexible>
        </Block>

        <Block>
          <FlexibleRender
            display="🐈 Walking cats 🐈"
            failback={<FlexibleRender
              display="Walking cats"
              failback="🐈🐈"
            />}
          />
        </Block>

        <Block>
          <FlexiblePick
            try={[
              "This is a long-long story of my life, it took at least an hour...",
              "This is a long-long 📖 of 🤓, it will took ⏳️",
              "🙇‍ 📖 🤓 ⏳ (i hope you understood)",
              "🙇‍ 📖 🤓 ⏳",
              "🦁"
            ]}
          />
        </Block>

        <Block>
          <FlexiblePick
            try={[
              "\"The quick brown fox jumps over the lazy dog\"",
              "The quick brown 🦊 jumps over the lazy 🐶",
              "The ⚡️ brown 🦊 ⬆️ over the 🐢 🐶",
              "⚡️ 🦊 ⬆️ 🐢 🐶",
            ]}
          />
        </Block>

        <Block>
          <div style={{width: '100%', display: 'flex'}}>
            <div style={{width: '50%'}}><Button/></div>
            <div style={{width: '30%'}}><Button/></div>
            <div style={{width: '20%'}}><Button/></div>
          </div>
        </Block>

        <Block>
          <div style={{width: '100%', display: 'flex'}}>
            <div style={{width: '50%'}}><PickButton/></div>
            <div style={{width: '30%'}}><PickButton/></div>
            <div style={{width: '20%'}}><PickButton/></div>
          </div>
        </Block>


      </div>
    )
  }
}