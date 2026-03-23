import { readExpenses, saveExpenses } from "../storage/file-storage.js";
import { help } from "../utils/helps.js";

export function addExpenses(args) {
    const description = args[0]?.trim();
    const amountRaw = args[1];

    if (!description) {
        console.log('Description is required.');
        console.log('Usage: add "description" <amount>');
        help();
        return;
    }

    const amount = Number(amountRaw)

    if (!amountRaw) {
        console.log('Amount is required.');
        console.log('Usage: add "description" <amount>');
        help();
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        console.log('Amount must be a valid number greater than 0.');
        return;
    }

    const expenses = readExpenses();

    const newExpense = {
        id: expenses.length + 1,
        description,
        amount,
        createdAt: new Date().toISOString()
    }

    expenses.push(newExpense);
    saveExpenses(expenses);

    console.log(`Expense added successfully (ID: ${newExpense.id})`);
}

export function update(args) {
    const id = parseInt(args[0], 10);
    const description = args[1].trim();
    const amount = Number(args[2]);

    if (isNaN(id)) {
        console.log('Usage: update <id> "new description" "new amount"');
        help();
        return;
    }

    if (!description) {
        console.log('Description is required.');
        console.log('Usage: update <id> "new description" <new amount>');
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        console.log('Amount must be a valid number greater than 0.');
        return;
    }

    const expenses = readExpenses();
    const expense = expenses.find(e => e.id === id);

    if (!expense) {
        console.log(`Expense with ID ${id} not found.`);
        return;
    }

    expense.description = description;
    expense.amount = amount;
    expense.updatedAt = new Date().toISOString();

    saveExpenses(expenses);
    console.log(`Expense ${id} updated successfully.`);
}