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
  justify-content: center;

  div {
    width: 100%;
    padding: 90px;
    background: #f0f0f5;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    section {
      width: 100%;
      max-width: 380px;

      img {
        width: 300px;
        height: auto;
      }

      h1 {
        margin: 64px 0 32px;
        font-size: 32px;
      }

      p {
        font-size: 18px;
        color: #737380;
        line-height: 32px;
      }

      a {
        display: flex;
        align-items: center;
        margin-top: 40px;
        color: #41414d;
        font-size: 18px;
        text-decoration: none;
        font-weight: 500;
        transition: opacity 0.2s;
      }
    }

    form {
      width: 100%;
      max-width: 450px;

      input {
        margin-top: 8px;
        width: 100%;
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

        &:hover {
          background: ${darken(0.03, '#8a78e4')};
        }
      }
    }
  }
`;
