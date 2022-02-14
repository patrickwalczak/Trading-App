import { Fragment } from 'react'
import ReactDOM from 'react-dom'
import Backdrop from './Backdrop'
import ModalContentWrapper from './ModalContentWrapper'


const Modal = props => {

    const rootEl = document.getElementById('overlay')

    return <Fragment>

        {ReactDOM.createPortal(<Backdrop onCloseForm={props.onCloseFormActions}/>, rootEl)}
        {ReactDOM.createPortal(<ModalContentWrapper>{props.children}</ModalContentWrapper>, rootEl)}

    </Fragment>
}

export default Modal