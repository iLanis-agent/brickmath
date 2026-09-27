// BrickMath engine - honest brick ordering math.
// Pure logic, no DOM. Shared by app.html and the node test harness.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BrickMath = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var JOINT_IN = 0.375;          // standard 3/8 in mortar joint
  var MORTAR_BAG_BRICKS = 35;    // one 70 lb bag of mortar lays about this many modular bricks
  var BRICKS = {
    modular: { label: 'Modular (7-5/8 x 2-1/4 in bed)', lenIn: 7.625, bedIn: 2.25 },
    queen:   { label: 'Queen (7-5/8 x 2-3/4 in bed)',   lenIn: 7.625, bedIn: 2.75 },
    king:    { label: 'King (9-5/8 x 2-5/8 in bed)',    lenIn: 9.625, bedIn: 2.625 },
    paver:   { label: 'Paver (8 x 4 in, sand-set)',     lenIn: 8.0,   bedIn: 4.0 }
  };
  var WASTE = { running: 1.10, herringbone: 1.15, soldier: 1.10 };

  function round2(x) { return Math.round(x * 100) / 100; }

  function bricksPerSqFt(brick) {
    return 144 / ((brick.lenIn + JOINT_IN) * (brick.bedIn + JOINT_IN));
  }

  function plan(opts) {
    var brick = BRICKS[opts.brickType];
    var isPatio = opts.brickType === 'paver';
    var area = round2(opts.lengthFt * (isPatio ? opts.widthFt : opts.heightFt));
    var bpsf = bricksPerSqFt(brick);
    var rawBricks = round2(area * bpsf);
    var wasteMult = WASTE[opts.bond] || 1.10;
    var orderBricks = Math.ceil(rawBricks * wasteMult);
    var mortarBags = isPatio ? 0 : Math.ceil(orderBricks / MORTAR_BAG_BRICKS);
    var brickCost = round2(orderBricks * (opts.pricePerBrick || 0));
    var mortarCost = round2(mortarBags * (opts.pricePerMortarBag || 0));
    var totalCost = round2(brickCost + mortarCost);
    return {
      brickLabel: brick.label,
      isPatio: isPatio,
      area: area,
      bricksPerSqFt: round2(bpsf),
      rawBricks: rawBricks,
      wasteMult: wasteMult,
      orderBricks: orderBricks,
      mortarBags: mortarBags,
      brickCost: brickCost,
      mortarCost: mortarCost,
      totalCost: totalCost
    };
  }

  return { plan: plan, bricksPerSqFt: bricksPerSqFt, BRICKS: BRICKS, round2: round2 };
});
