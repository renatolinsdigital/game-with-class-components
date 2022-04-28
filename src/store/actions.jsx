import store from "../store/store";
import {
  CUSTOM_MESSAGES,
  NOT_PLAYING,
  UPDATE_DWEEBS
} from "../store/actionTypes";
import _ from "lodash";

export const gameStateUpdate = action => dispatch => {
  dispatch(action);
};

export const messagesUpdate = messages => dispatch => {
  dispatch(messages);
};

export const dweebUpdate = (action, dweeb) => dispatch => {
  dispatch({
    type: action.type,
    dweeb: dweeb
  });
};

export const fight = (action, dweebs) => async dispatch => {
  if (!store.getState().gameState.playing) {
    return false;
  }
  await dispatch({
    type: action.type,
    dweebs: dweebs
  });

  let dweebsAfterAction = _.values(store.getState().dweebs);
  const dweeb1 = dweebsAfterAction[0];
  const dweeb2 = dweebsAfterAction[1];

  let gameMessages = [`Dweeb 1 damage: ${dweeb1.lastHit}`,  `Dweeb 2 damage: ${dweeb2.lastHit}`];

  if (dweeb1.life === 0 || dweeb2.life === 0) {
    store.dispatch(NOT_PLAYING);
    gameMessages.push(
      dweeb1.life > dweeb2.life
        ? `Dweeb 1 Won`
        : dweeb2.life > dweeb1.life
        ? `Dweeb 2 Won`
        : `Draw`);
  }

  dweebsAfterAction = dweebsAfterAction.map(dweeb => {
    const dweebWithoutHurt = { ...dweeb, hurted: false };
    return dweebWithoutHurt;
  });
  setTimeout(() => {
    store.dispatch({
      type: UPDATE_DWEEBS.type,
      dweebs: dweebsAfterAction
    });
  }, 70);

  store.dispatch({
    type: CUSTOM_MESSAGES.type,
    messages: gameMessages
  });
};
