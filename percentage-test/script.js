

	function getIndexByKey(list, keyName)
	{
		for(let i = 0; i < list.length; ++i)
		{
			if(list[i].key === keyName)
			{
				/*
				// Swap 1 and 0 to make F red and M blue. 
				// Should probably be implemented with a more exact solution.
				if(i === 1)
				{
					return 0;
				}
				if(i === 0)
				{
					return 1;
				}
				*/

				return i;
			}
		}
		console.log("ERROR: could not find index!");
		console.log("keyName: " + keyName)
		console.log("list")
		console.log(list)
		return -1;
	}

			let bad_grade = 10;
			let medium_grade = 15;
	function bucketfyData(data, bucketSpan)
	{
		//console.log(data[dimension]);
		data.forEach(function(point){
			let numberfy = parseInt(point.absences);

			if(numberfy === 0)
			{
				point.absences = "a_absences";
			}
			else if(numberfy < 5)
			{
				point.absences = "b_absences"
			}
			else
			{
				point.absences = "c_absences"
			}


			 numberfy = parseInt(point.G1);

			if(numberfy < bad_grade)
			{
				point.G1 = "a_G";
			}
			else if(numberfy < 13)
			{
				point.G1 = "b_G";
			}
			else
			{
				point.G1 = "c_G";
			} 
			numberfy = parseInt(point.G2);

			if(numberfy < bad_grade)
			{
				point.G2 = "a_G";
			}
			else if(numberfy < medium_grade)
			{
				point.G2 = "b_G";
			}
			else
			{
				point.G2 = "c_G";
			} 
			numberfy = parseInt(point.G3);

			if(numberfy < bad_grade)
			{
				point.G3 = "a_G";
			}
			else if(numberfy < medium_grade)
			{
				point.G3 = "b_G";
			}
			else
			{
				point.G3 = "c_G";
			}
		})
	}



	//----------------------------------------------------------
	// 							Constants
	//----------------------------------------------------------
    // set the dimensions and margins of the graph
    const margin = {top: 100, right: 100, bottom: 10, left: 10},
    width = window.innerWidth - margin.left - margin.right,
    height = 6000 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width/2 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

	var rightsvg = d3.select("#infobar")
    .append("svg")
    .attr("width", width/2 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

	var y = d3.scaleLinear()
		.domain([0,1])
		.range([width/2, 0])
	const barWidth = 50;
	const sideBarWidth = 20;
	const barSpace = 70;
	const barTextSize = "26px";
	const MAXTEXT = 6;


	//----------------------------------------------------------
	// 						Titels
	//----------------------------------------------------------
	let titleLookUp = [];
	//school,sex,age,address,famsize,Pstatus,Medu,Fedu,Mjob,Fjob,reason,guardian,traveltime,studytime,failures,schoolsup,famsup,paid,activities,nursery,
	// higher,internet,romantic,famrel,freetime,goout,Dalc,Walc,health,absences,G1,G2,G3
			
	titleLookUp["school"] = "School";
	titleLookUp["sex"] = "Sex";
	titleLookUp["age"] = "Age";
	titleLookUp["address"] = "Rural or Urban adress";
	titleLookUp["famsize"] = "Size of family(more or less than 3)";
	titleLookUp["Pstatus"] = "Parents together or apart";
	titleLookUp["Medu"] = "Mother's education";
	titleLookUp["Fedu"] = "Father's education";
	titleLookUp["Mjob"] = "Mother's job";
	titleLookUp["Fjob"] = "Father's job";
	titleLookUp["reason"] = "Reason for school choice";
	titleLookUp["guardian"] = "Primary guardian";
	titleLookUp["traveltime"] = "Traveltime to school (hours)";
	titleLookUp["studytime"] = "Weekly studytime (hours)";
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
	
	//----------------------------------------------------------
	// 						Titels
	//----------------------------------------------------------
	let keyLookUp = [];			
	keyLookUp["GP"] = "Gabriel Pereira";			
	keyLookUp["MS"] = "Mousinho da Silveira";			
	keyLookUp["F"] = "Female";			
	keyLookUp["M"] = "Male";			
	keyLookUp["U"] = "Urban";			
	keyLookUp["R"] = "Rural";			
	keyLookUp["LE3"] = "<=3";			
	keyLookUp["GT3"] = ">3";			
	keyLookUp["T"] = "Together";			
	keyLookUp["A"] = "Apart";			
	keyLookUp["yes"] = "Yes";			
	keyLookUp["no"] = "No";			
	keyLookUp["teacher"] = "Teacher";			
	keyLookUp["health"] = "Health-care";			
	keyLookUp["services"] = "Civil-services";			
	keyLookUp["at_home"] = "Stay-at-home";		
	keyLookUp["other"] = "Other";		
	keyLookUp["home"] = "Close to home";		
	keyLookUp["reputation"] = "Reputation";		
	keyLookUp["mother"] = "Mother";	
	keyLookUp["father"] = "Father";	
	keyLookUp["course"] = "School courses";

	keyLookUp["a_absences"] = "[0]";		
	keyLookUp["b_absences"] = "]0, 5[";		
	keyLookUp["c_absences"] = "[5, 32[";

	keyLookUp["a_G"] = "[0, " + bad_grade + "]";		
	keyLookUp["b_G"] = "]" + bad_grade+ ", "+ medium_grade +"[";		
	keyLookUp["c_G"] = "[" + medium_grade + " , 20[";


	function getKeyName (key)
	{
		if(isNaN(key))
		{
			return keyLookUp[key];
		}
		else
		{
			return key;
		}
	}

	//----------------------------------------------------------
	// 						Data
	//----------------------------------------------------------
	

    // Parse the Data
    d3.csv("../student-por.csv", function(data) {
    	console.log("Data:")
        console.log(data);

        bucketfyData(data, 5);

        // Extract the list of dimensions we want to keep in the plot.!isNaN(data[0][d]) 
        dimensions = d3.keys(data[0]).filter(function (d) { return true })

		var filters = [];
		dimensions.forEach(function(category){
			filters[category] = [];
		});
		
		var perEntry = 1/data.length;

		var sumDataTotal = [];
		dimensions.forEach(function(category){
			var nanCategory = isNaN(data[0][category]);
			sumDataTotal[category] = d3.nest()
				.key(function(d) { return d[category];})
				.rollup(function(d) { 
					return d3.sum(d, function(g) {return perEntry }) 
				})
				.entries(data)
				.sort(function(x, y){
					return nanCategory ? d3.descending(x.key, y.key) : d3.descending(+x.key, +y.key);
				})
		});
		console.log("sumDataTotal.absences:")
		console.log(sumDataTotal.absences);

		//sumDataTotal.absences = histofyList(sumDataTotal.absences, 5);

		console.log("sumDataTotal.absences (changed?):")
		console.log(sumDataTotal.absences);
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


		//----------------------------------------------------------
		// 						Draw
		//----------------------------------------------------------
		drawBars();

		function drawBars(){

			svg.selectAll("g").remove();


			// For each dimension, draw the following:
			var dim = -1;
			dimensions.forEach(function(category){
				dim++;

				var selecteachother = false;
				if(selecteachother || filters[category].length == 0){
					var datafiltered = data.filter(function (d) { return filterCheck(d, category) })
				} else{
					var datafiltered = data;
				}

				var perEntryFiltered = 1/datafiltered.length;
			
				var xStart = dim*(barWidth+barSpace); 

				var category = dimensions[dim];

				var nanCategory = isNaN(data[0][category]);

				var sumFilteredData = d3.nest()
					.key(function(d) { return d[category];})
					.rollup(function(d) { 
						return d3.sum(d, function(g) {return perEntryFiltered }) 
					})
					.entries(datafiltered)
					.sort(function(x, y){
						return nanCategory ? d3.descending(x.key, y.key) : d3.descending(+x.key, +y.key);
					})
					
			
				var sumData = sumDataTotal[category]

				
				

				var presum = 0;
				//----------------------------------------------------------
				// 							Titels
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
				
				function dataDiffFromKey(key )
				{
			 		let startValue = sumData[getIndexByKey(sumData, key)].value;
			 		let changedValue =  sumFilteredData[getIndexByKey(sumFilteredData, key)].value;

					let diff = changedValue/startValue; 

					return diff.toFixed(2);
				
				}
				function productToSymbol( product, margin)
				{
					if(product > 1 + margin)
					{
						return "⯅";
					}
					else if(product < 1 - margin)
					{
						return "⯆";
					}
					else
					{
						return "";
					}
				}
				
				//----------------------------------------------------------
				// 						Small bar
				//----------------------------------------------------------
				var presum = 0;

				var smallBar = svg.append("g");
				let originalValue = 0;


				smallBar.selectAll("bar")
					.data(sumData)
					.enter().append("rect")
					.style("fill", function (d, i) { 
						// categorical

							if(filters[category].length > 0 && filters[category].includes(d.key))
								return colorbrewer.Set1[9][getIndexByKey(sumData, d.key)%9];
							else
								return colorbrewer.Pastel1[9][getIndexByKey(sumData, d.key)%9];
							/*
						if(category === "Mjob")
						{
							
							if(filters[category].length > 0 && filters[category].includes(d.key))
								return colorbrewer.Set1[9][getIndexByKey(sumData, d.key)%9];
							else
								return colorbrewer.Pastel1[9][getIndexByKey(sumData, d.key)%9];
						}
						else
						{
							// numerical
							if(filters[category].length > 0 && filters[category].includes(d.key))
								return colorbrewer.YlOrRd[9][getIndexByKey(sumData, d.key)%9];
							else
								return colorbrewer.Greys[9][getIndexByKey(sumData, d.key)%9];;
						}*/

					})
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
						var tooltipText = "Unfiltered data " + titleLookUp[d.key] + ": " + num.toFixed(0) + "% ";
						tooltip.select("text").text(tooltipText);
						var widthText = tooltipText.length * 7;
						tooltip.selectAll("rect").attr("width", widthText);
						tooltip.selectAll("text").attr("x", widthText / 2);
					});

				
				//----------------------------------------------------------
				// 						Large bar
				//----------------------------------------------------------
				var bar = svg.append("g");
				var presum = 0;
				bar.selectAll("bar")
					.data(sumFilteredData)
					.enter().append("rect")
					.attr("class", "bigBar")
					.style("fill", function(d, i) {
						// categorical
						/*if(category === "Mjob")
						{
							// numerical
							if(filters[category].length > 0 && !filters[category].includes(d.key))
								return colorbrewer.Pastel1[9][getIndexByKey(sumData, d.key)%9];
							else
								return colorbrewer.Set1[9][getIndexByKey(sumData, d.key)%9];;
						}
						else
						{
							// numerical
							if(filters[category].length > 0 && !filters[category].includes(d.key))
								return colorbrewer.Greys[9][getIndexByKey(sumData, d.key)%9];
							else
								return colorbrewer.YlOrRd[9][getIndexByKey(sumData, d.key)%9];
						}*/


						if(filters[category].length > 0 && !filters[category].includes(d.key))
							return colorbrewer.Pastel1[9][getIndexByKey(sumData, d.key)%9];
						else
							return colorbrewer.Set1[9][getIndexByKey(sumData, d.key)%9];
					})
					.attr("y", xStart)
					.attr("height", barWidth)
					.attr("x", function(d, i) { return y(presum += d.value) })
					.attr("width", function(d,i) { return y(1-d.value)})
					.on('click', function(d,i){
						if(!filters[category].includes(d.key)){
							filters[category].push(d.key);
							if(filters[category].length==sumData.length) filters[category] = [];
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
						var tooltipText = getKeyName(d.key) + ": " + num.toFixed(0) + "% " + dataDiffFromKey(d.key) + " of unfiltered";
						tooltip.select("text").text(tooltipText);
						var widthText = tooltipText.length * 7;
						tooltip.selectAll("rect").attr("width", widthText);
						tooltip.selectAll("text").attr("x", widthText/2);
					});


				//----------------------------------------------------------
				// 						Text inside bars
				//----------------------------------------------------------
				presum = 0;

				bar.selectAll("text")
					.data(sumFilteredData)
					.enter()
					.append("text")
					.text(function(d){ return (d.value > 0.05 ? trim(d.key, getKeyName( d.key)) + productToSymbol(dataDiffFromKey(d.key), 0.1): "")})
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
							if(filters[category].length==sumData.length) filters[category] = [];
							
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
						var tooltipText = getKeyName(d.key) + ": " + num.toFixed(0) + "% " + dataDiffFromKey(d.key) + " of unfiltered";
						tooltip.select("text").text(tooltipText);
						var widthText = tooltipText.length * 7;
						tooltip.selectAll("rect").attr("width", widthText);
						tooltip.selectAll("text").attr("x", widthText / 2);
					});

				function trim(key, text){

					let subBarWidth = barSpace * sumFilteredData[getIndexByKey(sumFilteredData, key)].value;
					let countCharacters =  (subBarWidth).toFixed(0);
					
					return text.length > countCharacters ? text.substring(0, countCharacters -1) + "-" : text;
				}				
			});

			var selectedStudents = data.filter(function (d) { return filterCheck(d) }).length;
			var totalStudents = data.length;

			var infoBox = [];
			infoBox.x = 20;
			infoBox.y = 0;
			infoBox.width = width/2-20;
			infoBox.height = 300;
			infoBox.padding = 20;

			var psetsBox = [];
			psetsBox.x = 20;
			psetsBox.y = infoBox.y + infoBox.height+20;
			psetsBox.width = width/2-20;
			psetsBox.height = 300;

			
			
			

			
			function keyNamesOfFilters(filters)
			{
				filters.sort();
				console.log(filters);
				let outputString = "";
				for(let i = 0; i < filters.length; ++i)
				{
					console.log(getKeyName(filters[i]));
					outputString = outputString + getKeyName(filters[i]);
					if(i + 1 < filters.length)
					{
						outputString = outputString + ", "
					}
				}

				return outputString;
			}


			//----------------------------------------------------------
			// 						Parallel Sets
			//----------------------------------------------------------

			//PSETS
			var selectedDims = ["sex", "romantic", "internet"];



			var parsetsTree = [];
			recursiveDefineTree(parsetsTree, null, selectedDims);

			function recursiveDefineTree(node, prevnode, categorylist){
				if(categorylist.length == 0) return;
				var cat = categorylist[0];
				var remainingCats = categorylist.slice(1,categorylist.length);
				var sumData = sumDataTotal[cat];
				sumData.forEach(function(sd){
					node.fraction = 0;
					node.polygon = null;
					node.parent = prevnode;
					node[sd.key] = [];
					if(remainingCats.length>0){
						recursiveDefineTree(node[sd.key], node, remainingCats);
					}
					else{
						node[sd.key].parent = node;
						node[sd.key].fraction = 0;
					}
						
				});
				return;
			}


			data.forEach(function(d){
				var temp = parsetsTree;
				selectedDims.forEach(function(sd){
					temp[d[sd]].fraction += perEntry;
					temp = temp[d[sd]];
				});
			});

			console.log(parsetsTree);

			var yPset = d3.scaleLinear()
				.domain([0,1])
				.range([psetsBox.y, psetsBox.y + psetsBox.height])

			var xPset = d3.scaleLinear()
				.domain([1,0])
				.range([psetsBox.x, psetsBox.x + psetsBox.width])


		
			drawRightSvg();

			function drawRightSvg(){
				//clear
				rightsvg.selectAll("g").remove();

				//draw infoBox
				var background = rightsvg.append("g");
				background.append("rect")
					.style("fill","#FAFAFA")
					.style("stroke", "#DDDDDD")
					.style("stroke-width", 6)
					.attr("rx", 20)
					.attr("ry", 20)
					.attr("y", infoBox.y)
					.attr("height", infoBox.height)
					.attr("x", infoBox.x)
					.attr("width", infoBox.width)

				var textcontent = rightsvg.append("g")
					.append("text")
					.attr("x", infoBox.x + infoBox.padding)
					.attr("y", infoBox.y + infoBox.padding)
					.attr("dy", "0.5em")
					.style("text-anchor", "start")
					.attr("font-size", "26px")
					.attr("font-weight", "bold")
					.text("Selections: " + selectedStudents + "/" + totalStudents )

				var offset = 50;
				dimensions.forEach(function(category){
					if(filters[category].length > 0){
					
						var a = rightsvg.append("g")
							.append("text")
							.attr("x", infoBox.x + infoBox.padding)
							.attr("y", infoBox.y + infoBox.padding + offset)
							.attr("dy", "0.5em")
							.style("text-anchor", "start")
							.attr("font-size", "20px")
							.attr("font-weight", "bold")
							.text(titleLookUp[category] + " : " + keyNamesOfFilters(filters[category]));// getKeyName(filters[category].toString()))
							offset+= 20;
					}
				});

				//draw psets
				drawPSet(parsetsTree, selectedDims);
			}
	

			function drawPSet(tree, selected_dims){
				var dimstarts = [];
				selectedDims.forEach(function(cat){
					var sumData = sumDataTotal[cat];
					var presum = 0;
					dimstarts[cat] = [];
					sumData.forEach(function(sd){
						dimstarts[cat][sd.key] = presum;
						presum += sd.value;
					});
				});
				
				var cat = selected_dims[0];
				var remainingCats = selected_dims.slice(1,selected_dims.length);
				var sumData = sumDataTotal[cat];
				var xStart = 0;
				sumData.forEach(function(sd){
					var sd_tiptext =  titleLookUp[cat] + ": " + getKeyName(sd.key);
					drawRecursivePSet(parsetsTree[sd.key], xStart, 0, sd.value, remainingCats, selected_dims.length, colorbrewer.Set1[9][getIndexByKey(sumData, sd.key)%9], dimstarts, sd_tiptext);
					xStart += sd.value;
				});

				//draw "axis" for psets
				var yStart = 0;
				selectedDims.forEach(function(dim){
					var xStart = 0;
					sumDataTotal[dim].forEach(function(sd){
						var axis = rightsvg.append("g");
					
						axis.append("path")
							.attr("d", d3.line()([[xPset(xStart)-2, yPset(yStart)], [xPset(xStart+sd.value)+2, yPset(yStart)]]))
							.attr("stroke", "black")
							.style("stroke-width", 2)
							.style("opacity", 0.8)
						axis.append("text")
							.attr("x", xPset(xStart+sd.value))
							.attr("y", yPset(yStart))
							.attr("dy", "1.2em")
							.attr("font-size", "12px")
							.attr("font-weight", "bold")
						
							.text(sd.key)
						xStart += sd.value;
					});
					yStart += 1/selectedDims.length;
				});
			}

			function drawRecursivePSet(node, xStart, yStart, parentwidth, categorylist, totalcats, color, dimstarts, tooltip_text){
				if(categorylist.length == 0) return;
				var cat = categorylist[0];
				var remainingCats = categorylist.slice(1,categorylist.length);
				var sumData = sumDataTotal[cat];
				

				sumData.forEach(function(sd){
					
					var sd_tiptext = tooltip_text + " 🠒 " + titleLookUp[cat] + ": " + getKeyName(sd.key);


					var cur_width = node[sd.key].fraction;
					var xEnd = dimstarts[cat][sd.key];
					dimstarts[cat][sd.key] += node[sd.key].fraction;
					var poly = [{"x":xStart, "y":yStart},
						{"x":xStart+cur_width,"y":yStart},
						{"x":xEnd+cur_width,"y":yStart+1/totalcats},
						{"x":xEnd,"y":yStart+1/totalcats}];

					var nodepolygon = rightsvg.append("g").selectAll("polygon")
						.data([poly])
						.enter().append("polygon");

					node[sd.key].polygon = nodepolygon;

					nodepolygon
						.attr("points",function(d) { 
							return d.map(function(d) {
								return [xPset(d.x),yPset(d.y)].join(",");
							}).join(" ");
						})
						.style("fill", color)
						.style("opacity", 0.5)
						.on("mouseover", function () { 
							tooltip2.style("display", null);

							setBranchOpacity(node[sd.key], 1, remainingCats)
							
						})
						.on("mouseout", function () {
							tooltip2.style("display", "none");

							setBranchOpacity(node[sd.key], 0.5, remainingCats)
						})
						.on("mousemove", function (d) {
							var xPosition = d3.mouse(this)[0] - 15;
							var yPosition = d3.mouse(this)[1] - 25;
							tooltip2.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
							var num = 1;
							tooltip2.select("text").text(sd_tiptext);
							var widthText = sd_tiptext.length * 7;
							tooltip2.selectAll("rect").attr("width", widthText);
							tooltip2.selectAll("text").attr("x", widthText / 2);
						});

					drawRecursivePSet(node[sd.key], poly[3].x, yStart + 1/totalcats, sd.value*parentwidth, remainingCats, totalcats, color, dimstarts, sd_tiptext);

					xStart += node[sd.key].fraction;
				});
			}

			function setBranchOpacity(n, opacity, remainingCats){
				n.polygon.style("opacity", opacity)
				var par = n.parent;
				while(par.polygon != null){
					par.polygon.style("opacity", opacity);
					par = par.parent;
				}
				recChildOpacity(n, remainingCats, opacity);

				function recChildOpacity(node, catlist, opacity){
								
					if(catlist.length == 0) return;

					var cat = catlist[0];
					var remainingCats = catlist.slice(1,catlist.length);
					var sumData = sumDataTotal[cat];
								
					sumData.forEach(function(sd){
						node[sd.key].polygon.style("opacity", opacity)
						recChildOpacity(node[sd.key], remainingCats, 1);
					});
				}
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

			var tooltip2 = rightsvg.append("g")
			.attr("class", "tooltip")
			.style("display", "none");

			tooltip2.append("rect")
				.attr("width", 30)
				.attr("height", 20)
				.attr("fill", "white")
				.style("opacity", 0.7);

			tooltip2.append("text")
				.attr("x", 15)
				.attr("dy", "1.2em")
				.style("text-anchor", "middle")
				.attr("font-size", "12px")
				.attr("font-weight", "bold");
		}

    });


