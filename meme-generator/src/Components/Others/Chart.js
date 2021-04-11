import React, {useEffect} from "react";
import * as G2 from '@antv/g2';

function Chart(props) {
    useEffect(() => {
        const chart = new G2.Chart({
            container: 'c1', // Specify chart container ID
            width: 500, // Specify chart width
            height: 300 // Specify chart height
        });
        chart.source(props.data);
        chart.interval().position('genre*sold').color('genre');
        chart.render();
    }, [props.data])
    return (
        <div id="c1" className="charts">
        </div>
    )
}

export default Chart;

