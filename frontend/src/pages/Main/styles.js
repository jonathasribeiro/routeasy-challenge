import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin: 10px 0;
  }
`;

export const Content = styled.div`
  @media (min-width: 1440px) {
    width: 70%;
    height: 90%;
  }

  width: 90%;
  height: 90%;

  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: space-between;
`;

export const LeftContent = styled.div`
  width: 35%;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 80%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px solid #999999;
    padding: 10px;

    input {
      width: 100%;
      height: 30px;
      padding: 5px;
      margin: 5px 0;
      border-radius: 5px;
      border: 1px solid #999999;
    }

    .location {
      width: 100%;
      height: 30px;
      margin: 5px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 1px solid #999999;
      border-radius: 5px;

      input {
        width: 80%;
        height: 28px;
        padding: 5px;
        margin: 0;
        border: none;
      }

      button.button {
        width: 20%;
        height: 30px;
        border: none;
        background: none;
        text-decoration: underline black;
        margin-right: 10px;
        color: black;
        font-weight: normal;
        font-size: 12px;
      }
    }

    .coordinates {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      input {
        width: 49%;
      }
    }

    button {
      margin: 5px;
      width: 100%;
      height: 30px;
      background: #3cbc8d;
      border: none;
      color: #fff;
      font-weight: bold;
      font-size: 18px;
      border-radius: 5px;
      transition: 0.2s;

      &:hover {
        opacity: 0.7;
      }
    }
  }

  button {
    margin: 10px;
    background: #ff0000;
    width: 76%;
    height: 30px;
    border: none;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    border-radius: 5px;
    transition: 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const RightContent = styled.div`
  padding: 5px;

  width: 65%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  .leaflet-container {
    width: 100%;
    height: 450px;
    border-radius: 15px;
  }
`;

export const Resume = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: 10px 0;
  width: 100%;
`;

export const Box = styled.div`
  text-align: center;
  width: 25%;
  margin: 0px 5px;
  padding: 5px;
  border: 1px solid #999999;
  border-radius: 5px;
`;

export const Table = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 250px;

  p {
    margin-top: 10px;
  }

  table {
    width: 100%;
    text-align: center;

    tr {
      &:nth-child(even) {
        background-color: #f2f2f2;
      }

      &:hover {
        background-color: #ddd;
      }
    }

    thead tr th {
      background: #4caf50;
      color: #f2f2f2;
      padding: 5px;
    }

    tbody tr td {
      height: 30px;
    }
  }
`;
