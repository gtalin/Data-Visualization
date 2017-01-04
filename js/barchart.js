d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(json) {
  var gdp = json.data.map(function(data){return data[1]});
  var year = json.data.map(function(data){return data[0]});
  console.log(gdp, year);
  drawGraph(gdp,year);
});
    	function drawGraph(gdp,year){
    		var w = 900;
			var h = 700;
			var barPadding = 0;
      var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#fff")
    .text("a simple tooltip");

			svg = d3.select("body")
					.append("svg")
					.attr("width",w)
					.attr("height",h);
			var rect = svg.selectAll("rect")
			   .data(gdp)
			   .enter()
			   .append("rect")
         .attr("class", "tile")
			   .attr("x", function(d, i) {
			   		return i * (w / gdp.length);
			   })
			   .attr("y", function(d) {
			   		return h - (d/40);
			   })
			   .attr("width", w / gdp.length - barPadding)
			   .attr("height", function(d) {
			   		return d/40;
			   })
               .attr("fill", "teal");
            var label = svg.selectAll("text")
            			   .data(gdp)
            			   .enter()
            			   .append("text");
               /*rect.on("mouseover", function(d) { 
               	console.log(d);
  d3.select(this).select("text").style("visibility", "visible") 
});*/
rect.on("mouseover", function(d){tooltip.text(d); return tooltip.style("visibility", "visible");})
      .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
/*var labels = rect.append("text")
  .text(function(d) { return d.name; })
  .style("visibility", "hidden");
rect.on("mouseover", function(d)
 {   console.log(d);
     d3.select(d).style("visibility","visible")
 })
.on("mouseout", function(d)
 {
     d3.select(d).style("visibility","hidden")
 });*/
			

    	}