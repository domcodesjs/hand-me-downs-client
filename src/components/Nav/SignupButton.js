import { useState } from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import Signup from '../Signup/Signup';

function SignupButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  return (
    <div>
      <StyledButton onClick={toggleModal}>Signup</StyledButton>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <Signup></Signup>
      </StyledModal>
    </div>
  );
}

const StyledButton = styled.button`
  background: none;
  border: 0.1rem solid #000;
  border-radius: 10rem;
  padding: 0.8rem 2.4rem;
`;

const StyledModal = Modal.styled`
  width: 78rem;
  height: 50rem;
  display: flex;
  border-radius: .4rem;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

export default SignupButton;
