
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

	let titleLookUp = [];
	//school,sex,age,address,famsize,Pstatus,Medu,Fedu,Mjob,Fjob,reason,guardian,traveltime,studytime,failures,schoolsup,famsup,paid,activities,nursery,
	// higher,internet,romantic,famrel,freetime,goout,Dalc,Walc,health,absences,G1,G2,G3
			
	titleLookUp["school"] = "School";
	titleLookUp["sex"] = "Sex";
	titleLookUp["age"] = "Age";
	titleLookUp["address"] = "Rural or Urban adress";
	titleLookUp["famsize"] = "Size of family";
	titleLookUp["Pstatus"] = "Parents together or apart";
	titleLookUp["Medu"] = "Mother's education";
	titleLookUp["Fedu"] = "Father's education";
	titleLookUp["Mjob"] = "Mother's job";
	titleLookUp["Fjob"] = "Father's job";
	titleLookUp["reason"] = "Reason for school choice";
	titleLookUp["guardian"] = "Primary guardian";
	titleLookUp["traveltime"] = "Traveltime to school";
	titleLookUp["studytime"] = "Weekly studytime";
	titleLookUp["failures"] = "Number of failed classes";
	titleLookUp["schoolsup"] = "Extra educational support";
	titleLookUp["famsup"] = "Family educational support";
	titleLookUp["paid"] = "Extra paid classes";
	titleLookUp["activities"] = "Extra-corricular activities";
	titleLookUp["nursery"] = "Attended nursery school";
	titleLookUp["higher"] = "Wants higher education";
	titleLookUp["internet"] = "Internet acces at home";
	titleLookUp["romantic"] = "In a romantic relationship";
	titleLookUp["famrel"] = "Family relationship quality";
	titleLookUp["freetime"] = "Freetime amount";
	titleLookUp["goout"] = "Going out with friends";
	titleLookUp["Dalc"] = "Workday alcohol consumption";
	titleLookUp["Walc"] = "Weekend alcohol consumption";
	titleLookUp["health"] = "Health status";
	titleLookUp["absences"] = "Number of abscences from school";
	titleLookUp["G1"] = "Grade first period";
	titleLookUp["G2"] = "Grade second period";
	titleLookUp["G3"] = "Final grade";
	
			

	

    // Parse the Data
    d3.csv("../student-por.csv", function(data) {
        console.log(data);
        // Extract the list of dimensions we want to keep in the plot.!isNaN(data[0][d]) Here I keep all except the column called Species
        dimensions = d3.keys(data[0]).filter(function (d) { return true })

		var filters = [];
		dimensions.forEach(function(category){
			filters[category] = [];
		});
		




		function filterCheck(d, cat = null){
			var include = true;
			dimensions.forEach(function(category){
				var cat_filters = filters[category];
				
				if(cat_filters.length > 0 && cat != category){
					var truecurrent = false;
					cat_filters.forEach(function(filterkey){
						if(d[category] == filterkey) truecurrent = true;
					});
					if(truecurrent == false){
						include = false;
						return false;
					}
				}
			});
			return include;
		}



		

		drawBars();

		function drawBars(){

			svg.selectAll("g").remove();

			console.log(data.filter(function (d) { return filterCheck(d) }));
			console.log(filters);

			var dim = -1;
			dimensions.forEach(function(category){
				dim++;

				var selecteachother = true;
				if(selecteachother || filters[category].length == 0){
					var datafiltered = data.filter(function (d) { return filterCheck(d, category) })
				} else{
					var datafiltered = data;
				}

				var perEntryFiltered = 1/datafiltered.length;
				var perEntry = 1/data.length;
			
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
				//----------------------------------------------------------
				// 							Create titels
				//----------------------------------------------------------
				var titels = svg.append("g")
					.append("text")
					.text(function(d){ return titleLookUp[category]})
					.attr("y", xStart-10)
					.attr("x", 15)
					.style("font-size", "34px")
	

				if(filters[category].length > 0){
					var backborderwidth = 6;
					var selectedbackcolor = "#444444";
					var background = svg.append("g");
					background.append("rect")
						.style("fill",selectedbackcolor)
						.attr("y", xStart - backborderwidth)
						.attr("height", barWidth + sideBarWidth + backborderwidth*2)
						.attr("x", -backborderwidth)
						.attr("width", width/2 + backborderwidth*2)
				}
				
				
				
				var bar = svg.append("g");

				bar.selectAll("bar")
					.data(sumFilteredData)
					.enter().append("rect")
					.attr("class", "bigBar")
					.style("fill", function(d, i) {
						if(filters[category].length > 0 && !filters[category].includes(d.key))
							return colorbrewer.Pastel1[Math.max(3, Math.min(9, sumData.length))][getIndexByKey(sumData, d.key)%9];
						else
							return colorbrewer.Set1[Math.max(3, Math.min(9, sumData.length))][getIndexByKey(sumData, d.key)%9];
					})
					.attr("y", xStart)
					.attr("height", barWidth)
					.attr("x", function(d, i) { return y(presum += d.value) })
					.attr("width", function(d,i) { return y(1-d.value)})
					.on('click', function(d,i){
						if(!filters[category].includes(d.key)){
							filters[category].push(d.key);
						} else {
							filters[category].pop(d.key);
						}
						
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
					.style("user-select", "none")
					.on('click', function(d,i){
						if(!filters[category].includes(d.key)){
							filters[category].push(d.key);
						} else {
							filters[category].pop(d.key);
						}
						
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
						tooltip.selectAll("text").attr("x", widthText / 2);
					});

		
				function trim(text){
					return text.length > MAXTEXT ? text.substring(0, MAXTEXT-1) + "-" : text;
				}


				
			});

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
		}

    });