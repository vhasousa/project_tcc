import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 50vh;
  margin: 100px auto;
  border-radius: 8px;
  padding: 50px;

  background-color: #8789ff;

  div {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    div {
      display: block;
      color: #fff;

      h1 {
        font-size: 2.5em;
      }

      p {
        font-size: 1em;
      }

      form {
        width: 100%;
        max-width: 450px;
        margin-top: 15px;

        input {
          margin-top: 8px;
          width: 100%;
          height: 60px;
          color: #333;
          border: 1px solid #fff;
          border-radius: 8px;
          padding: 0px 24px;
        }

        span {
          color: red;
          align-self: flex-start;
          margin-left: 10px;
        }

        select {
          margin-top: 8px;
          width: 100%;
          height: 60px;
          color: rgba(0, 0, 0, 0.6);
          border: 1px solid #dcdce6;
          border-radius: 8px;
          padding: 0px 24px;
          background: #fff;
        }

        button {
          width: 100%;
          height: 60px;
          background: #fff;
          border: 0;
          border-radius: 8px;
          color: #8a78e4;
          font-weight: 700;
          margin-top: 16px;
          display: inline-block;
          text-align: center;
          text-decoration: none;
          font-size: 18px;
          line-height: 60px;
          transition: background 0.2s;

          &:hover {
            background: ${darken(0.1, '#fff')};
          }
        }
      }
    }
  }
`;
