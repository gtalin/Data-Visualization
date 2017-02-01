d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(json) {
 var data = json.monthlyVariance;
  var baseTemp = json.baseTemperature;
  console.log(json);
  
  
  drawGraph(data,baseTemp);
});


function drawGraph(data,baseTemp) {
  var margin = {top: 80, right: 30, bottom: 80, left: 50};
  var w = 1300;
  var h = 700;
  var w = w - margin.right - margin.left;
  var h = h - margin.top - margin.bottom;
  //var colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"];// alternatively colorbrewer.YlGnBu[9]
  var colors = ["#bd0026","#f03b20","#fd8d3c","#feb24c","#fed976","#ffffb2","#c7e9b4","#7fcdbb","#41b6c4","#2c7fb8","#253494"];
  colors = colors.reverse()
  var buckets = 11;//there will be 9 distinct colors. WIll help in colorScale. WHich in turn helps mapping colors values
  var days = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var baseYear = data[0].year
  var maxYear = data[data.length-1].year;
  var yearRange = maxYear-baseYear;
  var gridWidth = Math.floor(w/yearRange);
  var gridHeight = Math.floor(h/12);//12 months
  var legendElementWidth = 10;
  var height=5;

  
  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "grey")
    .style("color", "white")
    .style("text-align", "center")
    .style("padding", "5px")
    .style("border-radius", "5px")
    .style("text", "bold")
    .text("a simple tooltip");
  
  
  var colorScale = d3.scale.quantile()
      .domain([d3.min(data, function(d){return d.variance}), d3.max(data, function(d){return d.variance})])
      .range(colors);

  console.log(d3.min(data, function(d){return d.variance}));
  console.log(d3.max(data, function(d){return d.variance}));
  var grid = d3.select("#container")
      .append("svg")
      .attr("width",w + margin.left + margin.right)
      .attr("height",h + margin.top + margin.bottom)
      .attr("transform", "translate(" + margin.left + "," + margin.top +")")
      .attr("class","container");
  
  var tiles = grid.selectAll("rect")
                  .data(data);
  //console.log("row is",tiles);
  tiles.enter().append("rect")
       .attr("x", function(d) { return (d.year - baseYear) * gridWidth; })
       .attr("y", function(d) { return (d.month - 1) * gridHeight; })
       .attr("width", gridWidth)
       .attr("height", gridHeight)
       .style("fill", '#FFF')
       //.style("stroke", '#555')
       .on('mouseover', function(d) {
            //console.log(d);
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var temp = baseTemp + d.variance;
            var dataTooltip = d.year.toString()+" - "+months[d.month-1];
            dataTooltip += "<br/>" + temp.toFixed(3) + "&deg;C";
            dataTooltip += "<br/>" + d.variance + "&deg;C";
            d3.select(this).style("cursor", "pointer");
            d3.select(this)
            tooltip.html(dataTooltip); 
            //tooltip.html() instead of tooltip.text()
            return tooltip.style("visibility", "visible");})
       .on("mousemove", function(){
        return tooltip.style("top", (d3.event.pageY-10)+"px")
               .style("left",(d3.event.pageX+10)+"px");})
       .on('mouseout', function() {
          return tooltip.style("visibility", "hidden");})
       .on('click', function(d) {
           console.log(d,d3.select(this));});

  tiles.transition().duration(1000)
       .style("fill", function(d) {return colorScale(d.variance);});
  
  var legend = grid.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; });
              //.data(colorScale.quantiles(), function(d) { return d; });

          legend.enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return gridHeight * i; })
            .attr("y", h+40)
            .attr("width", gridHeight)
            .attr("height", gridWidth*4)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .text(function(d) { if (d==0) return 0.0;
              else return (baseTemp+d).toFixed(1); })
            .attr("x", function(d, i) { return gridHeight * i; })
            .attr("y", h + 80);

          //legend.exit().remove();

  var titleText = ["Monthly Global Land-Surface Temperature",
       "1753 - 2015", "Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average.",
"Estimated Jan 1951-Dec 1980 absolute temperature "+"&deg;C"+": 8.66 +/- 0.07"];
  
  /*var titleT = "<tspan dx='10' dy='-60'>Monthly Global Land-Surface Temperature</tspan>";
  titleT+="<tspan dy='-50'>1753 - 2015</tspan> <tspan dy='20'>Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average.</tspan>";
titleT+="<tspan>Estimated Jan 1951-Dec 1980 absolute temperature "+"&deg;C"+": 8.66 +/- 0.07</tspan>";*/
  
  /*grid.append("svg:title")
      .text(titleText);
  grid.append("text")
      .attr("x", w/3)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px") 
      //.style("text-decoration", "underline")  
      .html(titleText);*/

  /*grid.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  grid.append("g")
      .attr("class", "y axis")
      .call(yAxis);
      */

   grid.append("text")
      .attr("class", "title")
      .attr("x", w/3)
      .attr("y", -60)
      .attr("text-anchor", "middle")
      .html(titleText[0]);

  grid.append("text")
      .attr("class", "title")
      .attr("x", w/3)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .html(titleText[1]);
grid.append("text")
      .attr("class", "title")
      .attr("x", w/3)
      .attr("y", -30)
      .attr("text-anchor", "middle")
      .style("font-size", "10px") 
      .html(titleText[2]);
grid.append("text")
      .attr("class", "title")
      .attr("x", w/3)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", "10px") 
      .html(titleText[3]);


   /*grid.append("div")
      .style("position", "absolute")
      .style("z-index", "5")
      .style("background", "grey")
      .style("color", "white")
      .style("text-align", "center")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("text", "bold")
      .text("a simple tooltip")
      .style("top", -50+"px")
      .style("left", 200+"px");
     */ 

}

