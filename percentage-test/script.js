
    // set the dimensions and margins of the graph
    var margin = {top: 100, right: 100, bottom: 10, left: 10},
    width = window.innerWidth - margin.left - margin.right,
    height = 6000 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");


	var barWidth = 50;
	var sideBarWidth = 20;
	var barSpace = 70;
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
		
		

		drawBars();

		function drawBars(){

			var perEntryFiltered = 1/datafiltered.length;
			var perEntry = 1/data.length;

			var dim = -1;
			dimensions.forEach(function(category){
				dim++;
			
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
					sumData = sumData.reverse();
					sumFilteredData = sumFilteredData.reverse();
				console.log("sumdata: ");
				console.log(sumData);
				console.log("sumFilteredData: ");
				console.log(sumFilteredData);


				var y = d3.scaleLinear()
					.domain([0,1])
					.range([width/2, 0])
		


				function getIndexByKey(list, keyName)
				{
					for(let i = 0; i < list.length; ++i)
					{
						if(list[i].key === keyName)
						{
							return i;
						}
					}
					console.log("ERROR: could not find index!");
					return -1;
				}

				var presum = 0;
	
				var bar = svg.append("g");

				function blubb() {
					console.log("blubb");
				}

				bar.selectAll("bar")
					.data(sumFilteredData)
					.enter().append("rect")
					.attr("class", "bigBar")
					.style("fill", function(d, i) { return colorbrewer.Set1[Math.max(3, Math.min(9, sumData.length))][getIndexByKey(sumData, d.key)%9] })
					.attr("y", xStart)
					.attr("height", barWidth)
					.attr("x", function(d, i) { return y(presum += d.value) })
					.attr("width", function(d,i) { return y(1-d.value)})
					.on('click', function(d,i){
						console.log(category);
						datafiltered = data.filter(function (d2) { return d2[category] == d.key })
						console.log(datafiltered)
						drawBars();
					})
					.on("mouseover", function () { tooltip.style("display", null); })
					.on("mouseout", function () { tooltip.style("display", "none"); })
					.on("mousemove", function (d) {
						var xPosition = d3.mouse(this)[0] - 15;
						var yPosition = d3.mouse(this)[1] - 25;
						tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
						var num = d.value * 100;
						var tooltipText = d.key + ": " + num.toFixed(0) + "%";
						tooltip.select("text").text(tooltipText);
						var widthText = tooltipText.length * 7;
						tooltip.selectAll("rect").attr("width", widthText);
						tooltip.selectAll("text").attr("x", widthText/2);
					});


				presum = 0;

				var smallBar = svg.append("g");

				smallBar.selectAll("bar")
					.data(sumData)
					.enter().append("rect")
					.style("fill", function (d, i) { return colorbrewer.Pastel1[Math.max(3, Math.min(9, sumData.length))][i % 9] })
					.attr("y", xStart + barWidth)
					.attr("height", sideBarWidth)
					.attr("x", function (d, i) { return y(presum += d.value) })
					.attr("width", function (d, i) { return y(1 - d.value) })
					.on("mouseover", function () { tooltip.style("display", null); })
					.on("mouseout", function () { tooltip.style("display", "none"); })
					.on("mousemove", function (d) {
						var xPosition = d3.mouse(this)[0] - 15;
						var yPosition = d3.mouse(this)[1] - 25;
						tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
						var num = d.value * 100;
						var tooltipText = "Unfiltered data " + d.key + ": " + num.toFixed(0) + "%";
						tooltip.select("text").text(tooltipText);
						var widthText = tooltipText.length * 7;
						tooltip.selectAll("rect").attr("width", widthText);
						tooltip.selectAll("text").attr("x", widthText / 2);
					});

				presum = 0;

				bar.selectAll("text")
					.data(sumFilteredData)
					.enter()
					.append("text")
					.text(function(d){ return d.value > 0.05 ? trim(d.key) : ""})
					.attr("y", xStart + barWidth/2)
					.attr("x", function(d, i) { presum += d.value; return y(presum - d.value/2)+5 })
					.attr("text-anchor", "middle")
					.style("font-size", barTextSize)
					.style("max-width", "20px")
    				.style("fill", "white")

				bar.selectAll("text")
					.data(sumFilteredData)
					.enter()
					.append("text")
					.text(function(d){ return "banan"})
					.attr("y", xStart + barWidth/2)
					.attr("x", function(d, i) { presum += d.value; return y(presum - d.value/2)+5 })
					.attr("text-anchor", "middle")
					.style("font-size", barTextSize)
					.style("max-width", "20px")
    				.style("fill", "black")

		
				function trim(text){
					return text.length > MAXTEXT ? text.substring(0, MAXTEXT-1) + "-" : text;
				}


				// Prep the tooltip bits, initial display is hidden
				var tooltip = svg.append("g")
					.attr("class", "tooltip")
					.style("display", "none");

				tooltip.append("rect")
					.attr("width", 30)
					.attr("height", 20)
					.attr("fill", "white")
					.style("opacity", 0.7);

				tooltip.append("text")
					.attr("x", 15)
					.attr("dy", "1.2em")
					.style("text-anchor", "middle")
					.attr("font-size", "12px")
					.attr("font-weight", "bold");
			});
		}

    });