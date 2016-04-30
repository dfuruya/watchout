// start slingin' some d3 here.


var svg = d3.select('.board')
  .append('svg')
  .attr({
    width: window.innerWidth,
    height: window.innerHeight
  })
  .style("background-color","#32354A");

var rand = function() {
  var something = 30;
  return Math.random() * something;
};

var enemies = svg.selectAll('circle')
  .data([rand(), rand(), rand(), rand()])
  .enter()
  .append('circle')
  .attr('cx', function(d) {
    return rand() * d;
  })
  .attr('cy', function(d) {
    return rand() * d;
  })
  .attr({
    r: '10',
    stroke: '#CEFF1C',
    'stroke-width': '4',
    fill: 'none',
  });

var move = function() {
  enemies.transition()
  .duration(2000)
  .ease('cubic')
  .attr('cx', function() {
    return rand() * 30;
  })
  .attr('cy', function() {
    return rand() * 30;
  })
  .each('end', move);

};

var drag = d3.behavior.drag()
  .on('drag', function() {
    var coordinates = d3.mouse(this);
    console.log('I\'m being dragged');
    d3.select(this).attr({
      y: coordinates[1],
      x: coordinates[0]
    });
  });
  

var player = svg.append('svg:text')
  .attr({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    'fill': '#FF1C5C'
  })
  .text('*')
  .style({
    'font-size': '70',
    'text-shadow': '0px 0px 30px #FF1C5C'
  })
  .call(drag);
  
move();