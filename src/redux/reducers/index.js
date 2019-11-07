import { combineReducers } from "redux";

import player from "./player";
import cards from "./cards";
import monsters from "./monsters";
import battle from "./battle";

export default combineReducers({ player, cards, monsters, battle });
