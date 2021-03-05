import React, { Children } from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');
function ModalView(props) {
    return (
        <div>
            <Modal isOpen={props.isOpen} onRequestClose={props.onRequestClose}
            style={{
                overlay:{
                    backgroundColor:'rgba(0,0,0,0.7)'
                },
                content:{
                    color:'black'
                }

            }}
            >
               {props.children}
            </Modal>
        </div>
    )
}

export default ModalView
