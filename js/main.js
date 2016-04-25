//size of the map
var width = 960,
    height = 800,
    centered;

//disposition of the map (what part of the loaded world appears in the rectangle)
var projection = d3.geo.albers()
    .center([14,52.4])
    .rotate([0,0])
    .parallels([60,60])
    .translate([width / 2, height / 2])
    .scale(180 * 8);

var path = d3.geo.path()
    .projection(projection);


//Voronoi
var voronoi = d3.geom.voronoi()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .clipExtent([[0, 0], [width, height]]);

//map-container is the frame within which the map appears.
var svg = d3.select("#map-container").append("svg")
    .attr("width", width)
    .attr("height", height);


//load the data. world.json is the data of the countries used by topojson, universities is the list of the universities and their location,
//links.csv is the list of the different links between universities.
queue()
    .defer(d3.json, "json/world-50m.json")
    .defer(d3.csv, "csv/universities.csv")
    .defer(d3.csv, "csv/links.csv")
    .await(ready);

function ready(error, world, universities, links) {
  if (error) throw error;

  var UnivById = d3.map(),
      positions = [];



  universities.forEach(function(d) {
    UnivById.set(d.codeuniv, d);
    d.outgoing = [];
    d.incoming = [];
  });

  links.forEach(function(link) {
    var source = UnivById.get(link.origin),
        target = UnivById.get(link.destination),
        link = {source: source, target: target};
    source.outgoing.push(link);
    target.incoming.push(link);
  });

  universities = universities.filter(function(d) {
    if (d.count = Math.max(d.incoming.length, d.outgoing.length)) {
      d[0] = +d.longitude;
      d[1] = +d.latitude;
      var position = projection(d);
      d.x = position[0];
      d.y = position[1];
      return true;

    }
  });

  voronoi(universities)
      .forEach(function(d) { d.point.cell = d; });

svg.selectAll(".subunit")
      .data(topojson.feature(world, world.objects.countries).features)
    .enter().append("path")
      .attr("class", function(d) { return "subunit " + d.id; })
      .attr("d", path);


  svg.append("path")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr("class", "state-borders")
      .attr("d", path);


  var university = svg.append("g")
      .attr("class", "universities")
    .selectAll("g")
      .data(universities.sort(function(a, b) { return b.count - a.count; }))
    .enter().append("g")
      .attr("class", "university");



  university.append("path")
      .attr("class", "university-cell")
      .attr("d", function(d) { return d.cell.length ? "M" + d.cell.join("L") + "Z" : null; });


  university.append("g")
      .attr("class", "university-arcs")
    .selectAll("path")
      .data(function(d) { return d.outgoing; })
    .enter().append("path")
      .attr("d", function(d) { return path({type: "LineString", coordinates: [d.source, d.target]}); });

  university.append("circle")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("r", function(d, i) { return Math.sqrt(d.count); });}
