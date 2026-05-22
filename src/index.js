import { help } from "./utils/helps.js";
import { parseFlags } from "./utils/args.js";

import {
  addExpenses,
  update,
  listExpenses,
  deleteExpenses,
  summaryExpenses,
} from "./commands/expenses.js";

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
    listExpenses();
    break;

  case "delete":
    deleteExpenses(flags);
    break;

  case "summary":
    summaryExpenses(flags);
    break;

  default:
    console.log(`Unknown command: ${command}`);
    help();
    process.exit(1);
}