const is = require('is2');
const MongoClient = require("mongodb").MongoClient;
const emitter = require('../service/Emitter');

let nextPlayerId = 1;
const COMPLETE = 3;

// on cree la bdd
MongoClient.connect("mongodb://localhost/Blackjackdb", function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.createCollection("users", function (err, res) {
    if (err) throw err;
    console.log("Collection Users created!");
    db.close();
  });
});

class Player {
  constructor(name, credits) {
    this.id = nextPlayerId++;
    this.name = name;
    this.credits = credits;
    this.tableId = -1;      // lobby
    this.bet = -1;          // not playing hand
    this.hand = [];
    this.busted = false;
    this.done = false;
  }

  view(state) {
    const data = {
      name: this.name,
      bet: this.bet,
      hand: this.hand,
      done: this.done,
      busted: this.busted
    };
    if (this.hand2) data.hand2 = this.hand2;

    if (state === COMPLETE) {
      if (this.push) data.push = this.push;

      data.win = this.win;
    }
    return data;
  }

  startHandState() {
    delete this.won;
    delete this.result;
    delete this.push;

    this.openingMove = true;
    this.done = false;
    this.hand = [];
    this.bet = -1;
  };
}

class PlayerList {
  constructor() {
    this.all = {};              // all players
    this.nameToId = {};    // map name to id
  }

  checkAccountExist(name, pwd = false) {
    return new Promise((resolve, reject) => {
      MongoClient.connect("mongodb://localhost/Blackjackdb", function (err, db) {
        if (err) throw err;
        const user = {
          name,
        };

        if (pwd) user.pwd = pwd;

        db.collection("users").findOne(user, (err, results) => {
          if (err) reject(err);

          resolve(results);
        });
      });
    });
  }

  createAccount(name, pwd) {
    return new Promise((resolve, reject) => {
      MongoClient.connect("mongodb://localhost/Blackjackdb", function (err, db) {
        if (err) throw err;
        db.collection("users").insertOne({
          pwd,
          name: name,
          credits: 1000,
        }, null, (err, results) => {
          if (err) reject(err);
          resolve();
          db.close();
        });
      });
    });
  }

  addPlayer(name, credit = 1000) {
    // we must create the player
    var player = new Player(name, credit);
    this.nameToId[name] = player.id;
    this.all[player.id] = player;
    return player.id;
  };

  login(name, pwd) {
    if (this.getByName(name)) throw new Error('This account is already connected');

    return this.checkAccountExist(name, pwd)
      .then((result) => {
        if (!result) throw new Error('This account does\'t exist');

        const playerId = this.addPlayer(name, result.credits);

        emitter.emit('login', playerId);

        return playerId;
      });
  };

  logout(id) {
    const player = this.all[id];
    delete this.all[id];
    return player.credits;
  };

  getByName(name) {
    const playerId = this.nameToId[name];
    if (is.undef(playerId)) return false;

    return this.all[playerId];
  };

  getById(playerId) {
    if (is.undef(this.all[playerId])) return false;

    return this.all[playerId];
  }

}

module.exports = new PlayerList();