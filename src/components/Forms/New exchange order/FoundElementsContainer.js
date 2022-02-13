import FoundElement from "./FoundElement"
import classes from './ExchangeOrderForm.module.css'
import StatusMsg from "./StatusMsg";


const FoundElementsContainer = (props) => {
    let content;

    if(props.searchingResults.length >= 1) {

        content = <ul className={classes.foundElementsList}>
           { props.searchingResults.map(item => <FoundElement key={item.id} data={item} />)}
            </ul>
    }

    if(!props.searchingResults.length) {
        content = <StatusMsg>no element found</StatusMsg>
    }


    return (
        <div className={classes.foundElementsContainer}>
            <h5 className={classes.foundElementsHeader}>Results <span className={classes.resultsAmount}>{props.searchingResults.length}</span></h5>
                {content}
        </div>
    )

}

export default FoundElementsContainer;