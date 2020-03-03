import { Player } from "../../types";
import { v4 as uuid } from "uuid";

/**
 * For MVP, two static players with no internal state
 */

const p1: Player = {
  id: uuid(),
  name: "You",
  cpu: false,
};

const p2: Player = {
  id: uuid(),
  name: "Computer",
  cpu: true,
};

export { p1, p2 };
