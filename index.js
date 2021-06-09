const readLineSync = require("readline-sync");
const mongoose = require("mongoose");
const {
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
} = require("./cases");
const { showAlert, delay } = require("./cases/utilities");

mongoose.connect("mongodb://127.0.0.1:27017/library", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on("open", async () => {
  showMenu();
});

async function showMenu() {
  console.log(
    "------------------------------CHOOSE AN OPTION--------------------------------"
  );
  console.log(
    "------------------------------Category Options--------------------------------"
  );
  console.log(
    "1-Show all categories     2-Add a category                3-Remove a category"
  );
  console.log(
    "------------------------------Book Options------------------------------------"
  );
  console.log(
    "4-Show all books          5-Add book                      6-Remove a book"
  );
  console.log("7-Search a book           8-Get All books of a category   ");
  console.log(
    "------------------------------Member Options----------------------------------"
  );
  console.log(
    "9-See all members         10-Add a member                 11-Remove a member"
  );
  console.log(
    "------------------------------Issue Options-----------------------------------"
  );
  console.log(
    "12-Issue a new book       13-Return a book                14-See active issues"
  );
  console.log("15-Get issue history of a book");
  console.log(
    "------------------------------------------------------------------------------"
  );
  console.log("X-Exit App\n");

  let question = readLineSync.question("Choice: ");

  switch (question) {
    case "1":
      await one();
      break;

    case "2":
      await two();
      break;

    case "3":
      await three();
      break;

    case "4":
      await four();
      break;

    case "5":
      await five();
      break;

    case "6":
      await six();
      break;

    case "7":
      await seven();
      break;

    case "8":
      await eight();
      break;

    case "9":
      break;

    case "x" || "X":
      process.exit(0);
    default:
      showAlert("INVALID INPUT");
      break;
  }

  console.log("\nHit enter to continue");
  readLineSync.question("");
  showMenu();
}
