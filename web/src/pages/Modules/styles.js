import styled from 'styled-components';

export const Container = styled.div`
  width: 150vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin: 30px auto;
  color: #fff;

  div {
    background-color: #8789ff;
    padding: 20px;
    border-radius: 3px;

    aside {
      display: flex;
      justify-content: space-between;
    }

    div {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 2.5em;
  }

  h2 {
    font-weight: 800;
    font-size: 1.5em;
  }
`;
