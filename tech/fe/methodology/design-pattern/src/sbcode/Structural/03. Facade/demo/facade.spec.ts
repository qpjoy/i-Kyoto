import GameAPI from "./gameAPI";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function facadeExample() {
  const gameAPI = new GameAPI();

  const user = { user_name: "sean" };
  const userId = gameAPI.registerUser(user);

  await sleep(500);

  gameAPI.submitEntry(userId, 5);

  await sleep(500);

  console.log(`----- GameState Snapshot -----`);
  console.log(gameAPI.gameState());

  await sleep(1000);

  const history = gameAPI.getHistory();

  console.log("----- Reports History -----");
  Object.keys(history).forEach((key) => {
    console.log(`${key} : ${history[key][0]} : ${history[key][1]}`);
  });

  await sleep(1000);

  console.log("---- User Balance ----");
  console.log(user.user_name + " : " + gameAPI.getBalance(userId));

  await sleep(1000);

  console.log("---- GameState Snapshot ----");
  console.log(gameAPI.gameState());
}

facadeExample();
