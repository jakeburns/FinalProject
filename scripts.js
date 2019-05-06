var geoP = d3.json("real.json")
var stateP = d3.json("stateStuff.json")
var headquarters = d3.csv("Fortune_Headquarter_Locations.csv")
var starbucksP = d3.csv("new_Starbucks_Locations.csv")


Promise.all([geoP, stateP, headquarters, starbucksP]).then(function(values){
  var geoData = values[0]
  var stateData = values[1]
  var headData = values[2]
  var starData = values[3]
   drawMap(geoData, stateData, headData, starData)
})
// geoP.then(function(d){
//
// })


var drawMap = function(geo, state, head, star){
  var screen = {width:1000, height: 800};
  var tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

  var projection = d3.geoAlbersUsa().scale(1300).translate([500, 350]);
var svg = d3.select("svg")
            .attr("width", screen.width)
            .attr("height", screen.height);

              var g = svg.append('g');

            var zoom = d3.zoom()
                  .scaleExtent([1, 8])
                  .on('zoom', zoomed);

 svg.call(zoom);

        var states = svg.append("g")
                      .attr("id", "states")
                      .selectAll("g")
                      .data(geo.features)
                      .enter()
                      .append("g")
                      .classed("state", true)
                      .on("click", function(d){
                        var header = d3.select("h2")
                        return header.text("State clicked: " + d.properties.NAME)
                        console.log("State clicked", d.properties.NAME)

                      })





      // states.forEach(function(d,i){
      //   console.log(d[i].NAME)
      // })

                      var stateDict = []

                      state.forEach(function(state){
                        stateDict[state.name.trim()] = state;
                      })

                      //console.log(stateDict)

        var stateGenerator = d3.geoPath()
          .projection(projection)

          states.append("path")
          .attr("fill", "gray")
          .attr("stroke", "black")
          .text(function(state){
            return stateDict[state.name]
          })
          //.attr("fill", "yellow")
          .attr("d", function(d){
            return stateGenerator(d)
          });
               // .projection(projection);
               var starLocks = svg.append("g")
                 var filteredStar = star.filter(grabUSA)
                // console.log("Filtered Data: ",  filteredStar)
                     starLocks.selectAll("circle")
                      .data(filteredStar)
                      .enter()
                      .append("circle")
                      .attr("cx",function(d) {return projection([d["Longitude"],d["Latitude"]])[0];})
      .attr("cy",function(d) { return projection([d["Longitude"],d["Latitude"]])[1];})
                      .attr("r", "2.75px")
                        .attr("fill", "blue")
                         .attr("opacity", ".1");



              var bus = svg.append("g")
               bus.selectAll("circle")
               	.data(head)
               	.enter()
               	.append("circle")
                .attr("cx",function(d) { return projection([d["LONGITUDE"],d["LATITUDE"]])[0];})
                .attr("cy",function(d) { return projection([d["LONGITUDE"],d["LATITUDE"]])[1];})
                  .attr("r", function(d){
                    var revSize = d["REVENUES"]/48000
                    return revSize
                  })
               		.attr("fill", "yellow")
                  .attr("opacity", ".8")
                  .on("mouseover", function(d) {
            tooltip.transition()
            .duration(200)
            .style("opacity", .9);
            tooltip.html("Company: " + d["NAME"] + "       Revenue (in millions): " + d["REVENUES"])
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          })
                  function grabUSA(star){
                    return star["Country"] == "US";
                  }
                  var r =  2.75

                  function zoomed() {

                      states
                        .selectAll('path')
                        .attr('transform', d3.event.transform);
                      bus.selectAll("circle")
                        .attr("transform", d3.event.transform)
                      starLocks.selectAll("circle")
                      .attr("transform", d3.event.transform)


                    }

          var legend = d3.select("#legend")
          .attr("width", "350")

          var busLegend = legend.append("g").append("circle")
          .attr("cx", "50")
          .attr("cy", "50")
          .attr("r", "8px")
          .attr("fill", "yellow")

          legend.append("text")
          .attr("fill", "black")
          .text("Fortune 500 Headquarter Locations")
          .attr("x", "65")
          .attr("y", "55")

          legend.append("text")
          .attr("fill", "black")
          .text("Starbucks Locations")
          .attr("x", "65")
          .attr("y", "91")


          legend.append("circle")
          .attr("cx", "50")
          .attr("cy", "85")
          .attr("r", "8px")
          .attr("fill", "blue")

          var button1 = d3.select("body").append("button")
          .attr("id", "b1")
          .on("click", function(d){
            starLocks.attr("opacity", "0")
            bus.attr("opacity", "1")

          })
          .text("Show only headquarter locations")
          var button2 = d3.select("body").append("button")
          .attr("id", "b2")
          .on("click", function(d){
            starLocks.attr("opacity", "1")
            bus.attr("opacity", "0")
          })
          .text("Show only starbucks locations")
          var button3 = d3.select("body").append("button")
          .attr("id", "b3")
          .on("click", function(d){
            bus.attr("opacity", ".9")
            starLocks.attr("opacity", ".85")
          })
          .text("Show both")




          // var buttonHolder = d3.select("#buttonHolder")
          // buttonHolder.append("input")
          // .attr("type","button")
          // .attr("x", "20")
          // .attr("y", "50")
          // .attr("height","100px")
          // .attr("width","100px")
          // .attr("fill","black")
          // .text("TESTING")


    //   var g = svg.append( "g" );
    //
    //   g.selectAll( "path" )
    // .data(data)
    // .enter()
    // .append("path")
    // .attr( "fill", "black" )
    // .attr( "stroke", "black")
    // .attr( "d", geoPath);
  function onlyHeadquarters(head){
      svg = d3.select("svg")

      var bus2 = svg.append("g")
       bus2.selectAll("circle")
        .data(head)
        .enter()
        .append("circle")
        .attr("cx",function(d) { return projection([d["LONGITUDE"],d["LATITUDE"]])[0];})
        .attr("cy",function(d) { return projection([d["LONGITUDE"],d["LATITUDE"]])[1];})
          .attr("r", function(d){
            return d["REVENUES"]/65000
          })
          .attr("fill", "yellow")
          .attr("opacity", ".8")
          .on("mouseover", function(d) {
      tooltip.transition()
      .duration(200)
      .style("opacity", .9);
      tooltip.html("Company: " + d["NAME"] + "       Revenue (in millions): " + d["REVENUES"])
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
      })
    }

}
