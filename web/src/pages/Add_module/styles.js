import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 100%;
    max-width: 450px;

    input {
      width: 100%;
      height: 60px;
      color: #333;
      border: 1px solid #dcdce6;
      border-radius: 8px;
      padding: 0px 24px;
    }

    *button {
      width: 100%;
      height: 60px;
      background: #8a78e4;
      border: 0;
      border-radius: 8px;
      color: #fff;
      font-weight: 700;
      margin-top: 16px;
      display: inline-block;
      font-size: 18px;
      line-height: 60px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#8a78e4')};
      }
    }
  }
`;
