// start slingin' some d3 here.

var collisionCount = 0;
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

// invoke enemy movement
move();


// collision detection

var checkCollision = function() {
  // get player's position
  var playerX = player.attr('x');
  var playerY = player.attr('y');
  // get ALL of the enemy's positions
  enemies.each(function(d, i) {
    var enemyX = d3.select(this).attr('cx');
    var enemyY = d3.select(this).attr('cy');
    // if player's position - range <= enemy's position
    var distX = Math.abs(playerX - enemyX);
    var distY = Math.abs(playerY - enemyY);
    if (distX < 20 && distY < 20) {
      // change color of player
      player.attr({
        'fill': '#FF911C'
      })
      .transition()
      .duration(1000)
      .attr({
        'fill': '#FF1C5C'
      });
      // increment collision count
      d3.select('.collisions')
        .select('span')
        .text(++collisionCount);
    }
  });

};

d3.timer(checkCollision);
