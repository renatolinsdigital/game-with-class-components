import _ from "lodash";

function randomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function buildHitValue(hittingDweeb, beeatenDweeb) {
  const HIT_FORCE_ADJUSTMENT = 10;
  const blockingFactor = randomNumber() <= beeatenDweeb.blockChance ? 0 : 1;
  const criticalHitFactor = randomNumber() <= hittingDweeb.criticalChance ? 2 : 1;
  const hitFactor = (Math.random() * hittingDweeb.strength + hittingDweeb.level * HIT_FORCE_ADJUSTMENT) / beeatenDweeb.level;
  const hitValue = Math.round(blockingFactor * criticalHitFactor * hitFactor);
  return hitValue;
}

function handleFight(dweeb1, dweeb2) {
  const dweeb1Clone = _.cloneDeep(dweeb1);
  const dweeb2Clone = _.cloneDeep(dweeb2);
  dweeb1Clone.life -= dweeb2.lastHit;
  dweeb2Clone.life -= dweeb1.lastHit;
  if (dweeb1Clone.life < 0) dweeb1Clone.life = 0;
  if (dweeb2Clone.life < 0) dweeb2Clone.life = 0;
  if (dweeb2.lastHit > 0) dweeb1Clone.hurted = true;
  if (dweeb1.lastHit > 0) dweeb2Clone.hurted = true;
  return _.concat(dweeb1Clone, dweeb2Clone);
}

function fight(dweebs) {
  const dweeb1 = _.cloneDeep(dweebs[0]);
  const dweeb2 = _.cloneDeep(dweebs[1]);
  dweeb1.lastHit = buildHitValue(dweeb1, dweeb2);
  dweeb2.lastHit = buildHitValue(dweeb2, dweeb1);
  const dweebsAfterFight = handleFight(dweeb1, dweeb2);
  return dweebsAfterFight;
}

export default fight;
