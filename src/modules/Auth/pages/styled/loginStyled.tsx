import styled from 'styled-components';
import src from '../../../../assets/images/bg-login.png';

const Styled = {
  Container: styled.div`
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-image: url(${src});
    background-size: cover;
    background-position: center;
    .has-error .ant-form-explain,
    .has-error .ant-form-split {
      // color: #fff;
    }
    .logo {
      position: absolute;
      top: 5%;
      left: 10%;
      img {
        height: 120px;
      }
      span {
        color: #fff;
        font-weight: 700;
        font-size: 20px;
        padding-left: 20px;
      }
    }
    .loginContent {
      width: 400px;
      max-width: 100%;
      min-height: 250px;
      background-color: #fff;
      padding: 40px;
      // color: #fff;
      box-sizing: border-box;
      box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.35);
      border-radius: 8px;
      .ant-form-item-label > label {
        color: #979797;
        &:before,
        &:after {
          display: none;
        }
      }
      .title {
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        // color: #fff;
        text-transform: uppercase;
        text-align: center;
      }
    }
    .ant-btn-primary {
      color: #fff;
      height: 40px;
      background-color: #02a7f0;
      border-color: #02a7f0;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
      -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      &:hover {
        background-color: #02a7f0;
        border-color: #02a7f0;
      }
      font-size: 18px;
      font-family: "Roboto";
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #02a7f0;
      border-color: #02a7f0;
    }
    .ant-checkbox-indeterminate .ant-checkbox-inner:after {
      background-color: #02a7f0;
      border-color: #02a7f0;
    }
    .ant-checkbox-input:focus + .ant-checkbox-inner,
    .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner {
      border-color: #02a7f0;
    }
  `,
};
export default Styled;
