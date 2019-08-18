<template>

    <div class="out">
        <h1>On Hand Value</h1>
        <form @submit.prevent="submitForm">
            <input type="radio" id="day" value="day" v-model="picked" v-on:change="rerender" checked>
            <label for="day">summed by day</label>
            <br>
            <input type="radio" id="week" value="week" v-model="picked" v-on:change="rerender">
            <label for="week">summed by week</label>
            <br>
        </form>

        <svg id="barChart"></svg>
    </div>

</template>

<script>
    const axios = require('axios');
    const d3 = require('d3');

    export default  {
        data: function () {
                    return {
                        picked: 'day',
                        dayData: {},
                        weekData: {},
                        chart: null
                    }
        },
        mounted() {
            axios
                .get('http://localhost:8000/inventory/vue?type=day')
                .then(response => {
                    this.dayData = response.data.data;
                    this.render(this.dayData);
                });

            axios
                .get('http://localhost:8000/inventory/vue?type=week')
                .then(response => {
                    this.weekData = response.data.data;
                });

        },
        methods: {
            rerender: function(){
                let data = this.picked == "day" ? this.dayData : this.weekData;
                this.chart.remove();
                this.render(data);
            },
            render: function(data){
                let margin = {top: 50, right: 20, bottom: 70, left: 60},
                    width = 800 - margin.left - margin.right,
                    height = 400 - margin.top - margin.bottom;

                // set the ranges
                let x = d3.scaleBand().rangeRound([0, width]).padding(0.3);
                let y = d3.scaleLinear().range([height, 0]);

                //convert a string to a date
                let date;
                data.forEach(function(d, i) {
                    date = new Date(d.period); //d3.timeParse("%Y-%m");
                    d.period = date;
                });

                let xAxis = d3.axisBottom(x)
                    .tickFormat(d3.timeFormat("%d"));
                let yAxis = d3.axisLeft(y)
                    .tickFormat(d3.format("~s"));

                let chartDiv = document.getElementById("barChart");
                this.chart = d3.select(chartDiv)
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

                // Scale the range of the data
                x.domain(data.map(function(d) { return d.period; }));
                y.domain([0, d3.max(data, function(d) { return d.onHandValue; })]);

                this.chart.selectAll(".bar")
                    .data(data)
                    .enter().append("rect")
                    .style("fill", "steelblue")
                    .attr("class", "bar")
                    .attr("x", function(d) { return x(d.period); })
                    .attr("width", x.bandwidth())
                    .attr("y", function(d) { return y(d.onHandValue); })
                    .attr("height", function(d) { return height - y(d.onHandValue); });

                // add the x Axis
                this.chart.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                // add the y Axis
                this.chart.append("g")
                    .call(yAxis);

                // Title
                this.chart.append("text")
                    .text(
                        d3.timeFormat("%Y")(data[0].period) + ' ' + d3.timeFormat("%B")(data[0].period)
                    )
                    .attr("text-anchor", "middle")
                    .attr("class", "graph-title")
                    .attr("y", -10)
                    .attr("x", width / 2.0);

                this.chart.append("text")
                    .text("Date")
                    .attr("text-anchor", "middle")
                    .attr("class", "graph-title")
                    .attr("y", -30)
                    .attr("x", width / 2.0);

                // text label for the y axis
                this.chart.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin.left)
                    .attr("x",0 - (height / 2))
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .text("on Hand Value");
            }
        }
    }

</script>


<style scoped>
    p {
        font-size: 2em;
        text-align: center;
    }
    .out {
        margin: 30px;
    }
</style>