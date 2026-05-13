import { help } from "./utils/helps.js";
import { parseFlags } from "./utils/args.js";

import { addExpenses, update } from "./commands/expenses.js";
// depois você vai adicionar: deleteExpense, listExpenses, summaryExpenses

const [, , command, ...rest] = process.argv;

if (!command) {
  help();
  process.exit(0);
}

const flags = parseFlags(rest);

switch (command) {
  case "add":
    addExpenses(flags);
    break;

  case "update":
    update(flags);
    break;

  case "list":
    // listExpenses();
    console.log("list not implemented yet");
    break;

  case "delete":
    // deleteExpense(flags);
    console.log("delete not implemented yet");
    break;

  case "summary":
    // summaryExpenses(flags);
    console.log("summary not implemented yet");
    break;

  default:
    console.log(`Unknown command: ${command}`);
    help();
    process.exit(1);
}