import AppTypes from "../types";
import _ from "lodash";

function evaluateDweebUpdate(dweebForEvaluation) {
  const dweeb = _.cloneDeep(dweebForEvaluation);
  dweeb.strength = 10 + ((dweeb.level / 20) * 40);
  dweeb.baseLife = Math.floor(Math.pow(2, 8 + dweeb.level / 50)) - 99; // Just because ;)
  dweeb.totalLife = dweeb.baseLife + dweeb.hpPlus;
  dweeb.life = dweeb.totalLife;
  return dweeb;
}

evaluateDweebUpdate.propTypes = {
  dweeb: AppTypes.dweebType.isRequired
};

export default evaluateDweebUpdate;

