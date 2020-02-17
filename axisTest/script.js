
    // set the dimensions and margins of the graph
    var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var axisMargin = 15;
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("../student-mat.csv", function(data) {
        console.log(data);
        // Extract the list of dimensions we want to keep in the plot. Here I keep all except the column called Species
              
        var x = d3.scaleLinear()
            .domain([1, 5])
            .range([axisMargin, width])

        var y = d3.scaleLinear()
            .domain([0, 100])
            .range([height-axisMargin, 0])

        console.log(d3.extent(data, function(d) {return d.absences}));

        svg.append('g')
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(x).ticks(5))
        svg.append('g')
            .call(d3.axisLeft(y))

        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", function (d){return x(d.Dalc)})
                .attr("cy", function (d){return y(d.absences)})
                .attr("r", 5)
                .style("fill", "#00000055")

    });