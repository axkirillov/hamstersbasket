import {List} from "./modules/list.js";
import {Add} from "./modules/add.js";
import {Save} from "./modules/save.js";
import {Clear} from "./modules/clear.js";

const list = new List();

new Add(list);
new Save(list);
new Clear(list)
