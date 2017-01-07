d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(json) {
  var gdp = json.data.map(function(data){return data[1]});
  var year = json.data.map(function(data){return data[0]});
  console.log(gdp, year);
  drawGraph(gdp,year);
});

function extractYearRange(year) {
  var year1 = year[0].split("-")[0];
  var year2 = year[year.length-1].split("-")[0];
  console.log(year1,year2);
  console.log(Math.min( ...year));
  return [year1,year2];
}
function extractGdpRange(gdp) {
  var gdpMin = Math.min.apply(Math,gdp);
  var gdpMax = Math.max( ...gdp);
  console.log(gdpMin, gdpMax);
  return [gdpMin, gdpMax];
}

function drawGraph(gdp,year){
var w = 850;
var h = 600;
var barPadding = 0;
var padding = 30;
var yearRange = extractYearRange(year);
var gdpRange = extractGdpRange(gdp);

var tooltip = d3.select("body")
.append("div")
.style("position", "absolute")
.style("z-index", "10")
.style("visibility", "hidden")
.style("background", "#fff")
.text("a simple tooltip");

var margin = {top: 80, right: 30, bottom: 80, left: 50};
w = w - margin.right - margin.left;
h = h - margin.top - margin.bottom;

svg = d3.select("#container")
		.append("svg")
		.attr("width",w + margin.left + margin.right)
		.attr("height",h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top +")");
/*svg is as per old w and h. For rest, w and h has changed 
so they all appear with a nice margin on all sides*/

var widthScale = d3.scale.linear()
        .domain(yearRange)
        .range([0, w]);
            /*coz shifted bar chart from 0 to (i+10) * (w-padding) / gdp.length;*/

var heightScale = d3.scale.linear()
        .domain([0,gdpRange[1]])
        .range([h,0]);
console.log(heightScale(18,000));


var rect = svg.selectAll("rect")
   .data(gdp)
   .enter()
   .append("rect")
   .attr("class", "tile")
   .attr("x", function(d, i) {
   		return i * w / gdp.length;
   })
   .attr("y", function(d) {
   		/*return h - d/45;*/
      /*return 0;*/
      return heightScale(d);
   })
   .attr("width", w / gdp.length - barPadding)
   .attr("height", function(d) {
   		/*return d/45;*/
      /*return heightScale(d);*/
      return h - heightScale(d);
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



/*x.domain(data.map(function(d) { return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.value; })]);*/

rect.on("mouseover", function(d){tooltip.text(d); 
  return tooltip.style("visibility", "visible");})
      .on("mousemove", function(){
        return tooltip.style("top", (d3.event.pageY-10)+"px")
               .style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function(){
        return tooltip.style("visibility", "hidden");});



    
      var xAxis = d3.svg.axis()
          .scale(widthScale)
          .orient("bottom").ticks(10);


    var yAxis = d3.svg.axis()
                  .scale(heightScale)
                  .orient("left")
                  /*.ticks(5);*/



    svg.append("g")
       .attr("class","axis")
       .attr("transform", "translate(0," + (h) + ")")
       .call(xAxis);
    
    svg.append("g")
    .attr("class", "axis")
    .call(yAxis);
    /*.attr("transform", "translate(" + padding+ ",0)")
    .call(yAxis);*/

    /*coz shifted bar chart from (i+10) * (w-padding) / gdp.length;*/
    /*d3.svg in v3 not v4*/
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