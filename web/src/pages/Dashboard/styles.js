import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 24px;
    list-style: none;
    margin: 20px 20px 0px 20px;

    li {
      background: #fff;
      padding: 24px;
      border-radius: 8px;
      position: relative;
    }
  }
`;

export const Menu = styled.div``;
