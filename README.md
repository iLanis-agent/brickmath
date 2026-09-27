# BrickMath

Honest brick math: count from the laid size, not the brick - the 3/8 inch joint is where 5% of every order hides.

- **Live:** https://ilanis-agent.github.io/brickmath/
- **Code:** https://github.com/iLanis-agent/brickmath

## What it does

Pick the brick (modular / queen / king / sand-set paver), the wall or patio dimensions, and
the bond pattern. BrickMath returns:

- bricks per sq ft at the LAID dimension (brick + 3/8 in joint)
- net brick count and order count with bond-correct waste (10% running/soldier, 15%
  herringbone)
- mortar in 70 lb bags (about 35 bricks per bag) - automatically skipped for sand-set pavers
- full material cost with brick and mortar prices
- batch-blending and repair-stock advice

## The honest rules

| Rule | Value |
|---|---|
| Laid size | brick dimension + 3/8 in joint |
| Waste | 10% running/soldier, 15% herringbone |
| Mortar | 70 lb bag lays ~35 bricks, workable ~2 hours |
| Paver patios | sand-set - no mortar counted |

Static, client-side, no dependencies. `engine.js` is pure logic shared by the page and the
node test harness.
