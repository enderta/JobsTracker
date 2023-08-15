import React from "react";

export default function SelectOptions({jobNumber}) {
    const options = [];

    for (let i = 3; i <= jobNumber.length && i <= 12; i += 3) {
        options.push(<option value={i.toString()} key={i}>{i}</option>);
    }

    if (jobNumber.length > 12 || jobNumber.length % 3 !== 0) {
        options.push(<option value="0" key="all">All</option>);
    }

    return options;
}