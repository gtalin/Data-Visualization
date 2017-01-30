d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(json) {
  var data = json.monthlyVariance;
  console.log(data);
  /*Don't is an array of objects. We don't need further processing. I thought we had to separate data so that we had 12 rows corresponding to each month (each with all years for that month). In reality we don't have to do any of that complicated stuff*/
  
  /*var months={};
  for (var i=0;i<data.length;i++) {
    if (months.hasOwnProperty(data[i].month)) {
      months[data[i].month].push([data[i].year,data[i].variance]);
    }
    else {months[data[i].month]=[];
          months[data[i].month].push([data[i].year,data[i].variance]);
         }
  }
  var years = Object.keys(months).length;*/
  
  drawGraph(data);
});


function drawGraph(data) {
  var margin = {top: 80, right: 30, bottom: 80, left: 50};
  var w = 1300;
  var h = 700;
  var w = w - margin.right - margin.left;
  var h = h - margin.top - margin.bottom;
  var colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"];// alternatively colorbrewer.YlGnBu[9]
  var days = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var baseYear = data[0].year
  var maxYear = data[data.length-1].year;
  var yearRange = maxYear-baseYear;
  var gridWidth = Math.floor(w/yearRange);
  var gridHeight = Math.floor(h/12);//12 months
  
  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#fff")
    .text("a simple tooltip");
  
  /*
  //Transform data
  var variances = [];
  var months = [];
  var years =[];
  //Separatng variances and months data
  console.log("data", data);
  for (var key in data) {
    var rows=[];
    for (var i=0;i<data[key].length;i++) {
      rows.push(data[key][i][1]);//data[key][i][0] is year
      if (years.indexOf(data[key][i][0])===-1)
      {years.push(data[key][i][0]);}
  }
    //for oct,nove and dec last year data missing
    if (rows.length===263)
      variances.push(rows);
    else {rows.push(NaN);variances.push(rows);}
    months.push(key);
  }
  
  console.log(variances);
  console.log(months);
  console.log(years);
  */
  
  /*svg = d3.select("#container")
      .append("svg")
      .attr("width",w + margin.left + margin.right)
      .attr("height",h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top +")");*/
  
  var grid = d3.select("#container")
      .append("svg")
      .attr("width",w + margin.left + margin.right)
      .attr("height",h + margin.top + margin.bottom)
      .attr("transform", "translate(" + margin.left + "," + margin.top +")")
  .attr("class","container");
  
  var tiles = grid.selectAll("rect")
                  .data(data);
  /*console.log("row is",tiles);*/
  tiles.enter().append("rect")
       .attr("x", function(d) { return (d.year - baseYear) * gridWidth; })
       .attr("y", function(d) { return (d.month - 1) * gridHeight; })
       .attr("width", gridWidth)
       .attr("height", gridHeight)
       .style("fill", '#FFF')
       .style("stroke", '#555')
       .on('mouseover', function(d) {
            console.log(d);
            d3.select(this)
            .style('fill', '#0F0');
            tooltip.text(d); 
            return tooltip.style("visibility", "visible");})
       .on("mousemove", function(){
        return tooltip.style("top", (d3.event.pageY-10)+"px")
               .style("left",(d3.event.pageX+10)+"px");})
       .on('mouseout', function() {
          d3.select(this)
          .style('fill', '#FFF');
          return tooltip.style("visibility", "hidden");})
       .on('click', function() {
           console.log(d3.select(this));})
  
  /*tiles.selectAll().on('mouseover', function() {
                    d3.select(this)
                        .style('fill', '#0F0');
                 });*/
  
  /*tiles.on("mouseover", function(d){tooltip.text(d); 
  return tooltip.style("visibility", "visible");})
      .on("mousemove", function(){
        return tooltip.style("top", (d3.event.pageY-10)+"px")
               .style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function(){
        return tooltip.style("visibility", "hidden");});*/

       /*.style("fill", colors[0]);*/
  
  /*var col = row.selectAll(".cell")
                 .data(function (d) {return d; })
                .enter().append("svg:rect")
                 .attr("class", "cell");*/
                 
}
