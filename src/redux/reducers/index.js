import { combineReducers } from "redux";

import player from "./player";
import cards from "./cards";
import monsters from "./monsters";

export default combineReducers({ player, cards, monsters });
