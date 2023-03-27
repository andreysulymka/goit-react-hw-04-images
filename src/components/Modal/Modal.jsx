import PropTypes from 'prop-types';
import { useEffect } from 'react';
import {Overlay, ModalStyled } from './Modal.styled';

export default function Modal({ children, modalClose }) {
 
    
    useEffect(() => {

        const handleKeyDown = e => {
        if (e.code === 'Escape') {
            modalClose();
        };
    };
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
          window.removeEventListener('keydown', handleKeyDown);  
        }
  }, [modalClose]);
    
    const handleBackdropClick = e => {
        if(e.target.id === "backdrop") {
            modalClose();
        };
    };

return (
            <Overlay id={"backdrop"} onClick={handleBackdropClick}>
                <ModalStyled>
                    {children}
                </ModalStyled>
            </Overlay>
        );

}




    Modal.propTypes = {
    children: PropTypes.node,
    modalClose: PropTypes.func.isRequired,
};
    

   
