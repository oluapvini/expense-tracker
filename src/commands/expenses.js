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

    const maxId = expenses.reduce((max, e) => Math.max(max, e.id || 0), 0);
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
    const expense = expenses.find(e => e.id === id);

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