import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  .fade-appear {
    opacity: 0;
    z-index: 1;
  }
  .fade-appearance.fade-appear-active {
    opacity: 1;
    transition: opacity 300ms linear;
  }
  .fade-enter {
    opacity: 0;
    z-index: 1;
  }
  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms linear;
  }

  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    section {
      width: 100%;
      max-width: 300px;
      margin-right: 50px;

      img {
        width: 300px;
        height: auto;
      }

      form {
        margin-top: 50px;

        h1 {
          font-size: 32px;
          margin-bottom: 32px;
        }

        input {
          width: 350px;
          height: 60px;
          color: #333;
          border: 1px solid #dcdce6;
          border-radius: 8px;
          padding: 0px 24px;
        }

        span {
          color: red;
          align-self: flex-start;
          margin-left: 10px;
        }

        button {
          width: 350px;
          height: 60px;
          background: #8a78e4;
          border: 0;
          border-radius: 8px;
          color: #fff;
          font-weight: 700;
          margin-top: 16px;
          display: inline-block;
          text-align: center;
          text-decoration: none;
          font-size: 18px;
          line-height: 60px;
          transition: background 0.2s;
          margin-bottom: 10px;

          &:hover {
            background: ${darken(0.03, '#8a78e4')};
          }
        }

        .register {
          display: flex;
          align-items: center;
          margin-top: 30px;
          color: #41414d;
          font-size: 18px;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;

          svg {
            margin-right: 8px;
          }

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }

  img {
    width: 1000px;
    height: auto;
  }
`;
