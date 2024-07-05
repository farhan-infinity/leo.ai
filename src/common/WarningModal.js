import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteDocument } from "../redux/actions/documentAction";
import { deleteAccount } from '../redux/actions/authAction';

function WarningModal(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { className, toggle, modal, id, modalTextHeader } = props;

    const deleteDoc = () => {
        if (id !== null) {
            let data = {
                id: id,
                navigate
            }
            dispatch(deleteDocument(data))
        }
    }

    return (
        <>
            <Modal
                style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center" }}
                isOpen={modal}
                modalTransition={{ timeout: 500 }}
                backdropTransition={{ timeout: 100 }}
                toggle={toggle}
                className={className}
            >

                <div className='custom-modal-body' style={{ backgroundColor: "white", padding: "20px 30px", borderRadius: "20px" }}>
                    <h3 className='modal-warning-text' style={{ marginTop: "20px" }}>
                        {modalTextHeader}
                    </h3>
                    <div className='modal-warning-buttons' style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        <Button style={{ padding: "15px 30px", borderRadius: "10px" }} color="danger" onClick={() => deleteDoc()}>
                            Yes
                        </Button>
                        <Button style={{ padding: "15px 30px", borderRadius: "10px" }} color="secondary" onClick={toggle}>
                            No
                        </Button>
                    </div>
                </div>
            </Modal >
        </>
    );
}

WarningModal.propTypes = {
    className: PropTypes.string,
    toggle: PropTypes.toggle,
    id: PropTypes.id,
    modal: PropTypes.modal,
    modalTextHeader: PropTypes.modalTextHeader
};

export default WarningModal;