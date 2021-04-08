import React, {useEffect, useState} from "react";
import * as G2 from '@antv/g2';

function Chart(props) {
    useEffect(() => {
        const chart = new G2.Chart({
            container: 'c1', // 指定图表容器 ID
            width: 500, // 指定图表宽度
            height: 300 // 指定图表高度
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

