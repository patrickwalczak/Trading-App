import classes from './ExchangeOrderForm.module.css'


const TransactionSummary = () =>{
    return ( 
    <div className={classes.transactionSummaryContainer}>
        <div className={classes.transactionSummaryFragment}>
            <h6 className={classes.transactionSummaryHeader}> Available funds </h6> <span className={classes.transactionSummaryValue}>699$</span>
        </div>
        <div className={classes.transactionSummaryFragment}>
            <h6 className={classes.transactionSummaryHeader}> Commission</h6> <span className={classes.transactionSummaryValue}>10$</span>
        </div>
        <div className={classes.transactionSummaryFragment}>
            <h6 className={classes.transactionSummaryHeader}> Order value</h6> <span className={classes.transactionSummaryValue}>10$</span>
        </div>
        <div className={classes.transactionSummaryFragment}>
            <h6 className={classes.transactionSummaryHeader}> Available funds after order</h6> <span className={classes.transactionSummaryValue}>10$</span>
        </div>
    </div>

    )
}

export default TransactionSummary;