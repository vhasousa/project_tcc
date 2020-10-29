import styled from 'styled-components';

export const Container = styled.div`
  max-width: 90vh;
  justify-content: center;
  color: #333;
  margin: 10px auto;
  border-radius: 5px;
  padding: 30px;
  background-color: #8789ff;
  border: 3px solid #eee;
  text-align: center;

  h2 {
    /* font-weight: 800; */
    font-size: 24px;
    background-color: #fff;
    padding: 35px 15px 35px 15px;
    border-radius: 3px;
    min-width: 50vh;
  }

  div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    grid-template-areas:
      'a a'
      'b b'
      'c c';

    button {
      margin-top: 15px;
      padding: 10px;
      border-radius: 3px;
      border: none;
      font-size: 16px;
    }
  }
`;

export const Button = styled.button`
  grid-area: c;
  justify-self: end;
  color: #fff;
`;
