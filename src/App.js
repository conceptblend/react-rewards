import React from "react";
import Layout from "./Layout";
import ContentRow from "./ContentRow";
import AnimatedEarningsDisplay from "./AnimatedEarningsDisplay";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.rewardsPercentage = 0.5;
        this.rewardsTypeEnum = {
            cashback: "dollars",
            points: "points"
        };

        this.state = {
            rewardsType: this.rewardsTypeEnum.cashback,
            amount: 0,
            earnedRewards: 0
        };

        this.changeValue = this.changeValue.bind(this);
    }

    getRewardsTypeDescription(rewardsType) {
        let rewardsTypeDesription = "";
        switch (this.state.rewardsType) {
            case this.rewardsTypeEnum.cashback:
                rewardsTypeDesription = "cash back";
                break;
            case this.rewardsTypeEnum.points:
                rewardsTypeDesription = "points";
                break;
            default:
                rewardsTypeDesription = "";
                break;
        }
        return rewardsTypeDesription;
    }

    getEarnedRewards() {
        let amount = this.state.amount || 0,
            earnedRewards;

        switch (this.state.rewardsType) {
            case this.rewardsTypeEnum.cashback:
                earnedRewards = (amount * this.rewardsPercentage) / 100;
                break;
            case this.rewardsTypeEnum.points:
                earnedRewards = amount * this.rewardsPercentage;
                break;
            default:
                break;
        }
        return earnedRewards
    }

    changeValue(event) {
        this.setState({
            amount: parseFloat(event.target.value)
        });
    }

    render() {
        const rewardsTypeDescription = this.getRewardsTypeDescription(
            this.state.rewardsType
        );

        return (
            <Layout>
                <ContentRow>
                    <AnimatedEarningsDisplay
                        amount={this.getEarnedRewards()}
                        rewardsTypeDescription={rewardsTypeDescription}
                        format={this.state.rewardsType}
                    />
                    <hr />
                </ContentRow>
                <ContentRow>
                    <label htmlFor="amount">
                        How much do you spend each month?
                    </label>
                    <form className="form" onSubmit={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}>
                        <div className="form-group mr-1">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input
                                    type="number"
                                    step="1"
                                    className="form-control"
                                    id="amount"
                                    aria-describedby="How much do you spend each month?"
                                    placeholder="Enter amount..."
                                    onChange={this.changeValue}
                                />
                            </div>
                            <small className="text-muted">
                                Don't be too specific. An estimate will do.
                            </small>
                        </div>
                    </form>
                </ContentRow>
                <ContentRow>
                    <div
                        id="method"
                        className="btn-group btn-group-toggle btn-group-sm"
                        style={{ display: 'flex' }}
                        data-toggle="buttons"
                    >
                        <label
                            className={"btn btn-outline-success " + (this.state.rewardsType === this.rewardsTypeEnum.cashback ? 'active' : '')}
                            tabIndex="0"
                            onChange={(e) =>
                                this.setState({
                                    rewardsType: this.rewardsTypeEnum.cashback
                                })
                            }
                        >
                            <input
                                type="radio"
                                name="options"
                                id="option1"
                                value="rewardsTypeEnum.cashback"
                                defaultChecked={this.state.rewardsType === this.rewardsTypeEnum.cashback}
                                autoComplete="off"
                            />
                            Cash back
                        </label>
                        <label
                            className={"btn btn-outline-success " + (this.state.rewardsType === this.rewardsTypeEnum.points ? 'active' : '')}
                            tabIndex="0"
                            onChange={(e) => {
                                this.setState({
                                    rewardsType: this.rewardsTypeEnum.points
                                });
                            }}
                        >
                            <input
                                type="radio"
                                name="options"
                                id="option2"
                                value="rewardsTypeEnum.points"
                                defaultChecked={this.state.rewardsType === this.rewardsTypeEnum.points}
                                autoComplete="off"
                            />
                            Points
                        </label>
                    </div>
                </ContentRow>
            </Layout>
        );
    }
}

export default App;
