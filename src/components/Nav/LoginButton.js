import { useState } from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import Login from '../Login/Login';

function LoginButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const toggleModal = () => {
    setOpacity(0);
    setIsOpen(!isOpen);
  };

  const afterOpen = () => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  };

  const beforeClose = () => {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  };

  return (
    <>
      <StyledButton onClick={toggleModal}>Login</StyledButton>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <Login toggleModal={toggleModal}></Login>
      </StyledModal>
    </>
  );
}

const StyledButton = styled.button`
  background: none;
  background: #000;
  color: #fff;
  border-radius: 10rem;
  padding: 0.8rem 2.4rem;
`;

const StyledModal = Modal.styled`
  width: 80rem;
  height: 50rem;
  display: flex;
  border-radius: .4rem;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

export default LoginButton;
