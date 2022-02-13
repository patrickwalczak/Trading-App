import FoundElement from "./FoundElement"
import classes from './ExchangeOrderForm.module.css'
import StatusMsg from "./StatusMsg";
import { useSelector } from "react-redux"



const FoundElementsContainer = (props) => {
    const {searchResults} = useSelector(state => state.searchResults)
    let content;

    if(searchResults.length >= 1) {

        content = <ul className={classes.foundElementsList}>
           { searchResults.map(item => <FoundElement key={item.id} data={item} />)}
            </ul>
    }

    if(!searchResults.length) {
        content = <StatusMsg>no element found</StatusMsg>
    }


    return (
        <div className={classes.foundElementsContainer}>
            <h5 className={classes.foundElementsHeader}>Results <span className={classes.resultsAmount}>{searchResults.length}</span></h5>
                {content}
        </div>
    )

}

export default FoundElementsContainer;