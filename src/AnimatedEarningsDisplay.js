import React from "react";

import EarningsDisplay from "./EarningsDisplay";

class AnimatedEarningsDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.amount = props.amount;
        this.steps = 24;
        this.increment = this.amount / this.steps;
        this.interval = null;

        this.state = {
            animatedAmount: 0,
            isAnimating: false,
            percentage: 0
        };
    }
    /*
        When the props update, determine if we need to start the animation over, again, based on the amount provided.
        */
    componentDidUpdate(prevProps) {
        if (this.props.amount !== prevProps.amount) {
            clearInterval(this.interval);

            // Prepare animation values
            this.amount = this.props.amount;
            this.increment = this.amount / this.steps;

            // Create animation
            this.interval = setInterval(this.tick.bind(this), 50);
        }
    }
    /*
        When the component is being removed, do a possibliy redundant action to remove the interval.
        */
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        let amt = this.state.animatedAmount + this.increment;

        //console.log("Tick... " + this.interval + " // " + amt);

        /* If we're below the limit, keep going. Otherwise, clear the interval and stop */
        if (amt < this.amount) {
            this.setState({
                animatedAmount: amt,
                isAnimating: true,
                percentage: amt / this.amount
            });
        } else {
            clearInterval(this.interval);
            /* Just in case, we're gonna make sure the last value is exactly the amount */
            this.setState({
                animatedAmount: 0,
                isAnimating: false,
                percentage: 0 /* reset the percentage */
            });
        }
    }

    render() {
        return (
            <EarningsDisplay
                {...this.props}
                amount={
                    this.state.isAnimating
                        ? this.state.animatedAmount
                        : this.amount
                }
                percentage={this.state.isAnimating ? this.state.percentage : 1}
            />
        );
    }
}

export default AnimatedEarningsDisplay;
