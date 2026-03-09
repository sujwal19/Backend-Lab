import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todos = [];

//
const showMenu = () => {
  console.log("\n 1: Add a Task");
  console.log("2: View a Task");
  console.log("3: Exit");
  rl.question("Choose an option: ", handleInput);
};

const handleInput = (option) => {
  if (option === "1") {
    rl.question("Enter a Task: ", (task) => {
      todos.push(task);
      console.log("\nTask Added: ", task);
      showMenu();
    });
  } else if (option === "2") {
    console.log("\n Your Todo Lists");
    todos.forEach((task, idx) => {
      console.log(`${idx + 1}: ${task}`);
    });
    showMenu();
  } else if (option === "3") {
    console.log("\n Good Bye");
    rl.close();
  } else {
    console.log("Invalid Option Selected. Try Again");
    showMenu();
  }
};

//

//

//

//
showMenu();
