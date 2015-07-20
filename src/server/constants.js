function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define('BATTLE_MODE_1_ON_1', 0);
define('BATTLE_MODE_2_ON_2', 1);
define('BATTLE_MODE_3_ON_3', 2);
define('BATTLE_MODE_3_ON_3_ROTATORY', 3);