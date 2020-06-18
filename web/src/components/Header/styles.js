import styled from 'styled-components';

export const Container = styled.div`
  background: #543ed6;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    a {
      font-weight: bold;
      color: #fff;
    }

    img {
      width: 50px;
      height: auto;
    }
  }

  aside {
    display: flex;
    align-items: center;

    div {
      color: #fff;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #333;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #fff;
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
