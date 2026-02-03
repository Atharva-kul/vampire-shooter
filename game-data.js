const gameDataJSON = {
    "player": {
        "speed": 250,
        "hp": 100,
        "maxHp": 100,
        "maxXp": 100,
        "shootInterval": 0.5,
        "damage": 30,
        "bulletSpeed": 500,
        "multiShot": 1
    },
    "enemies": {
        "NORMAL": {
            "speed": 50,
            "hp": 50,
            "radius": 20,
            "color": "#00ff00",
            "xp": 10,
            "damage": 5
        },
        "FAST": {
            "speed": 100,
            "hp": 30,
            "radius": 15,
            "color": "#ffff00",
            "xp": 15,
            "damage": 1
        },
        "TANK": {
            "speed": 10,
            "hp": 200,
            "radius": 30,
            "color": "#ff00ff",
            "xp": 30,
            "damage": 20
        },
        "BOSS": {
            "speed": 30,
            "hp": 500,
            "radius": 40,
            "color": "#ff6600",
            "xp": 100,
            "damage": 25
        },
        "SHOOTER": {
            "speed": 60,
            "hp": 70,
            "radius": 22,
            "color": "#00ffff",
            "xp": 50,
            "damage": 5,
            "shootInterval": 3,
            "projectileDamage": 10
        },
        "MEGA_BOSS": {
            "speed": 20,
            "hp": 2000,
            "radius": 60,
            "color": "#ff3399",
            "xp": 500,
            "damage": 30
        }
    }
};
