import { readExpenses, saveExpenses } from "../storage/file-storage.js";
import { help } from "../utils/helps.js";

export function addExpenses(flags) {
    const description = flags.description?.trim();
    const amountRaw = flags.amount;

    if (!description) {
        console.log('Description is required.');
        console.log('Usage: add --description "Lunch" --amount 20');
        help();
        return;
    }

    const amount = Number(amountRaw)

    if (!amountRaw) {
        console.log('Amount is required.');
        console.log('Usage: add --description "Lunch" --amount 20');
        help();
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        console.log('Amount must be a valid number greater than 0.');
        return;
    }

    const expenses = readExpenses();

    const maxId = expenses.reduce((max, expense) => Math.max(max, expense.id || 0), 0);
    const newId = maxId + 1;

    const newExpense = {
        id: newId,
        description,
        amount,
        createdAt: new Date().toISOString()
    }

    expenses.push(newExpense);
    saveExpenses(expenses);

    console.log(`Expense added successfully (ID: ${newExpense.id})`);
}

export function update(flags) {
    const id = parseInt(flags.id, 10);
    const description = flags.description?.trim();
    const amountRaw = flags.amount;

    if (isNaN(id)) {
        console.log('Usage: update <id> "new description" "new amount"');
        help();
        return;
    }

    if (!description && !amountRaw) {
        console.log('Nothing to update. Provide --description and/or --amount.');
        console.log('Usage: update --id <id> [--description "new description"] [--amount <amount>]');
        help();
        return;
    }

    let amount;
    if (amountRaw !== undefined) {
        amount = Number(amountRaw);
        if (!Number.isFinite(amount) || amount <= 0) {
        console.log('Amount must be a valid number greater than 0.');
        return;
        }
    }

    const expenses = readExpenses();
    const expense = expenses.find(expense => expense.id === id);

    if (!expense) {
        console.log(`Expense with ID ${id} not found.`);
        return;
    }

    if (description) expense.description = description;
    if (amountRaw !== undefined) expense.amount = amount;

    expense.updatedAt = new Date().toISOString();

    saveExpenses(expenses);
    console.log(`Expense ${id} updated successfully.`);
}

export function listExpenses() {
    const expenses = readExpenses();

    if (expenses.length === 0) {
        console.log("Not expenses found");
        return;
    }

    console.log("ID    Date       Description   Amount");

  for (const expense of expenses) {
    const date = (expense.createdAt || "").slice(0, 10);
    console.log(`${expense.id} |  ${date} | ${expense.description} |    R$ ${expense.amount}`);
  }
}

export function summaryExpenses(flags) {
  const expenses = readExpenses();

  if (!flags.month) {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    console.log(`Total expenses: $${total}`);
    return;
  }

  const month = parseInt(flags.month, 10);

  if (Number.isNaN(month) || month < 1 || month > 12) {
    console.log('Usage: summary [--month <1-12>]');
    help();
    return;
  }

  const currentYear = new Date().getFullYear();

  const filtered = expenses.filter(e => {
    if (!e.createdAt) return false;
    const date = new Date(e.createdAt);
    const expenseMonth = date.getMonth() + 1; 
    const expenseYear = date.getFullYear();
    return expenseMonth === month && expenseYear === currentYear;
  });

  const totalMonth = filtered.reduce((sum, e) => sum + e.amount, 0);

  console.log(`Total expenses for month ${month}: $${totalMonth}`);
}