import styled from 'styled-components';
import LoginForm from './LoginForm';
import clothes from './images/clothes.jpg';

const Login = () => {
  return (
    <StyledMain>
      <div className='close-btn'>X</div>
      <div className='img'></div>
      <div className='login'>
        <h1>Log In</h1>
        <LoginForm></LoginForm>
      </div>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .close-btn {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
  }

  .img {
    background: url(${clothes}) no-repeat;
    background-size: cover;
    border-radius: 0.4rem 0 0 0.4rem;
  }

  .login {
    h1 {
      margin-bottom: 3.2rem;
      font-weight: 500;
    }
    padding: 0 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 576px) {
  }
`;

export default Login;
