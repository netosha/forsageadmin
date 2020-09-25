import React from 'react';
import { Icon } from "flwww";
import styles from "./Statistic.module.scss";

const Statistics = (props) => {

    const { title, value, prevValue, currency, valueClassName } = props;
    const prcntChange = Math.round(((value - prevValue) / prevValue * 100) * 100) / 100;

    // Check if it's a positiveChange
    const positiveChange = prcntChange >= 0;
    let iconType = "arrowUp";
    let iconBgColor = "#23d160";
    // Change the value if it's negative
    if(!positiveChange){
        iconType = "arrowDown";
        iconBgColor = "#ff2b2b";
    }

    return(
        <div className={ styles.statWrapper }>
            <div>
                <div className={ styles.title }>{ title }</div>
            </div>

            <div className={ styles.statBottomWrapper }>

                <div className={ styles.mainVal }>
                    <div className={ `${ styles.value } ${ valueClassName }` }>{ numberWithCommas(value) }</div>
                </div>

                <div className={ styles.otherVal }>
                    <div className={ styles.prcntChangeDiv }>
                        <div className={ styles.arrow } style={{ backgroundColor: iconBgColor }}>
                            <Icon
                                type={ iconType }
                                color="#fff"
                                size={40}
                            />
                        </div>
                        <div className={ styles.prcntChange }>
                            <span>{ positiveChange && "+" }{ prcntChange }%</span>
                            <span>({ Math.abs(value - prevValue)}) {props.currency}</span>
                        </div>
                    </div>
                </div>
                <div className={ styles.otherVal }>
                    <div className={ styles.prevVal }>Пред.: { numberWithCommas(prevValue) }</div>
                </div>

            </div>
        </div>
    )
}

Statistics.defaultProps = {
    title: "",
    value: undefined,
    prevValue: undefined,
    currency: undefined,
    valueClassName: "",
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export default Statistics;