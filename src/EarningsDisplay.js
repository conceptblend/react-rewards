import React from "react";
import { formatDollarAmount, formatPointsAmount } from './utils';

const EarningsDisplay = (props) => {
    let formattedAmount = props.amount || 0

    /* Format the amount as 'points' or (default:) 'dollars' */
    formattedAmount =
        props.format === 'points'
        ? formatPointsAmount(formattedAmount)
        : formatDollarAmount(formattedAmount)
    
    let bgWidth = props.percentage * 100

    return (
        <p className="lead" id="rewards-phrase">
            You'd earn&nbsp;
            <span id="rewards-container">
                <span id="rewards-bg" style={{ width: bgWidth+"%" }}></span>
                <strong id="rewards">{formattedAmount}</strong>
            </span>
            &nbsp;
            <span className="rewards-type">
                {props.rewardsTypeDescription}
            </span>
            !
        </p>
    );
}

EarningsDisplay.defaultProps = {
    amount: 0,
    percentage: 1,
    rewardsTypeDescription: "unknown",
}

export default EarningsDisplay;
