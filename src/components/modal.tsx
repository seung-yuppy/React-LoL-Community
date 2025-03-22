import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: white;
    padding: 2rem 3rem;
    border-radius: 2rem;
    animation: ${fadeIn} 0.3s ease;
`;

const CloseButton = styled.button`
    color: #fff;
    background-color: #10a37f;
    border: #10a37f;
    padding: 0.7rem 2rem;
    font-size: 1.2rem;
    border-radius:0.5rem;
    cursor: pointer;
`;

type IModal = {
    children: React.ReactNode;
    onClose: () => void;
}

const Modal = ({ children, onClose }: IModal) => {
    return (
        <>
            <ModalOverlay>
                <ModalContent>
                    {children}
                    <CloseButton onClick={onClose}>
                        Close
                    </CloseButton>
                </ModalContent>
            </ModalOverlay>
        </>
    )
}

export default Modal;