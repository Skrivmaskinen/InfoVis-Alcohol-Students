
    // set the dimensions and margins of the graph
    var margin = {top: 100, right: 100, bottom: 10, left: 10},
    width = 4000 - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");


	var barWidth = 80;
	var sideBarWidth = 10;
	var barSpace = 30;
	var barTextSize = "26px";
	var MAXTEXT = 6;

	var filters = [];

    // Parse the Data
    d3.csv("../student-por.csv", function(data) {
        console.log(data);
        // Extract the list of dimensions we want to keep in the plot.!isNaN(data[0][d]) Here I keep all except the column called Species
        dimensions = d3.keys(data[0]).filter(function (d) { return true })

		
		// FILTER
		datafiltered = data.filter(function (d) { return d.health==1 })

		console.log(datafiltered);
		var colors = ['#225ea8','#253494','#081d58', '#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#bd0026','#800026'].reverse();
		// var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574","b33040", "#d25c4d", "#f2b447", "#d9d574","b33040", "#d25c4d", "#f2b447", "#d9d574"];

		var perEntryFiltered = 1/datafiltered.length;
		var perEntry = 1/data.length;


		for(var dim = 0; dim < dimensions.length; dim++){

			
			var xStart = dim*(barWidth+barSpace); 

			var category = dimensions[dim];

			var nanCategory = isNaN(datafiltered[0][category]);

			var sumFilteredData = d3.nest()
				.key(function(d) { return d[category];})
				.rollup(function(d) { 
					return d3.sum(d, function(g) {return perEntryFiltered }) 
				})
				.entries(datafiltered)
				.sort(function(x, y){
					return nanCategory ? d3.ascending(x.key, y.key) : d3.ascending(+x.key, +y.key);
				})
			
			var sumData = d3.nest()
				.key(function(d) { return d[category];})
				.rollup(function(d) { 
					return d3.sum(d, function(g) {return perEntry }) 
				})
				.entries(data)
				.sort(function(x, y){
					return nanCategory ? d3.ascending(x.key, y.key) : d3.ascending(+x.key, +y.key);
				})

			console.log(sumData);
			console.log(sumFilteredData);


			var y = d3.scaleLinear()
				.domain([0,1])
				.range([height, 0])
		


			var presum = 0;
	
			var bar = svg.append("g");

			function blubb() {
				console.log("blubb");
			}

			bar.selectAll("bar")
				.data(sumFilteredData)
				.enter().append("rect")
				.style("fill", function(d, i) { return colors[i] })
				.attr("x", xStart)
				.attr("width", barWidth)
				.attr("y", function(d, i) { return y(presum += d.value) })
				.attr("height", function(d,i) { return y(1-d.value)});



			presum = 0;

			var smallBar = svg.append("g");

			smallBar.selectAll("bar")
				.data(sumData)
				.enter().append("rect")
				.style("fill", function(d, i) { return colors[i] })
				.attr("x", xStart + barWidth)
				.attr("width", sideBarWidth)
				.attr("y", function(d, i) { return y(presum += d.value) })
				.attr("height", function(d,i) { return y(1-d.value)});

			presum = 0;

			bar.selectAll("text")
				.data(sumFilteredData)
				.enter()
				.append("text")
				.text(function(d){ return d.value > 0.05 ? trim(d.key) : ""})
				.attr("x", xStart + barWidth/2)
				.attr("y", function(d, i) { presum += d.value; return y(presum - d.value/2)+5 })
				.attr("text-anchor", "middle")
				.style("font-size", barTextSize)
				.style("max-width", "20px")
    			.style("fill", "white")

		
			function trim(text){
				return text.length > MAXTEXT ? text.substring(0, MAXTEXT-1) + "-" : text;
			}
		}
		
    });