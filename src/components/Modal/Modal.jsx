import PropTypes from 'prop-types';
import { Component } from 'react';
import {Overlay, ModalStyled } from './Modal.styled';

export default class Modal extends Component {

    static propTypes = {
        children: PropTypes.node,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    };
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.modalClose();
        };
    };

    handleBackdropClick = e => {
        if(e.target.id === "backdrop") {
            this.props.modalClose();
        };
    };

    render() {
        return (
            <Overlay id={"backdrop"} onClick={this.handleBackdropClick}>
                <ModalStyled>
                    {this.props.children}
                </ModalStyled>
            </Overlay>
        );
    };
};