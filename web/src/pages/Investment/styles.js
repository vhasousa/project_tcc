import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background-color: #8789ff;
  width: 70vh;
  margin: 50px auto;
  padding: 50px;
  color: #fff;

  border-radius: 5px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 5em;
    font-weight: 800;
    text-align: center;
  }

  h2 {
    font-size: 2.5em;
    font-weight: 800;
    text-align: center;
  }

  div {
    display: flex;
    justify-content: space-around;
    padding: 10px;

    a {
      background-color: #fff;
      border-radius: 3px;

      P {
        color: #8789ff;
        font-size: 1.5em;
        margin: 0 2px 0 0;
      }

      &:hover {
        background: ${darken(0.1, '#fff')};
      }
    }
  }
`;
