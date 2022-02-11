import classes from './Modal.module.css'


const ModalContentWrapper = (props) => {

    return <div className={classes.modal}>
        {props.children}
    </div>
    
}

export default ModalContentWrapper;