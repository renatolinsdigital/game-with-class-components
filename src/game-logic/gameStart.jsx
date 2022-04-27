import dweebs from "../data/dweebs";
import store from "../store/store";
import _ from "lodash";
import {
  PLAYING,
  GAME_STARTED_MESSAGE,
  EVALUATE_DWEEB_UPDATE
} from "../store/actionTypes";

function dispatchUpdates(dweebs) {
  for (let i = 0; i < dweebs.length; i++) {
    store.dispatch({
      type: EVALUATE_DWEEB_UPDATE.type,
      dweeb: dweebs[i]
    });
  }
}

function gameStart(gameReset) {
  const initialDweebList = { ...dweebs };

  if (gameReset) {
    dispatchUpdates(initialDweebList);
  } else {
    const storeDweebs = _.values(store.getState().dweebs);

    const currentDweebs = storeDweebs.map(dweeb => {
      const fullLifeDweeb = { ...dweeb };
      fullLifeDweeb.life = fullLifeDweeb.totalLife;
      return fullLifeDweeb;
    });

    dispatchUpdates(currentDweebs);
  }

  store.dispatch(PLAYING);
  store.dispatch(GAME_STARTED_MESSAGE);
}

export default gameStart;
