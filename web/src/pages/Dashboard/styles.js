import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  /* margin-top: 16px; */
  margin-top: 10px;

  section {
    a {
      margin: 10px;
      width: 80%;
      height: 60px;
      background: #8a78e4;
      border: 0;
      border-radius: 8px;
      color: #fff;
      font-weight: 700;
      display: inline-block;
      text-align: center;
      text-decoration: none;
      font-size: 18px;
      line-height: 60px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#8a78e4')};
      }
    }
  }

  div {
    height: 10px;
  }
`;
