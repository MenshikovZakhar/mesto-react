import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopup(props) {
    const { isOpen, onClose, onSubmit } = props



    return (
        <PopupWithForm
            name="delete"
            isOpen={isOpen && 'popup_opened'}
            title="Вы уверены?"
            btnText="Да"
            onClose={onClose}
            onSubmit={onSubmit}
        ></PopupWithForm>


    )
}
export default DeletePopup