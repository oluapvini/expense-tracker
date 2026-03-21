import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve(process.cwd(), "expenses.json");

export function ensureExpenseFileExists() {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2), "utf8");
    }
}

export function readExpenses() {
    ensureExpenseFileExists();

    try {
        const raw = fs.readFileSync(DB_PATH, "utf8").trim();

        if (!raw) return [];

        const data = JSON.parse(raw);

        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.log(
            "warning: expenses.json is invalid or unreadable. Reseting to empty list.",
            error instanceof Error ? error.message : error
        );

        fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2), "utf8");

        return [];
    }
}

export function writeExpenses(expenses) {
    ensureExpenseFileExists();

    const safeExpenses = Array.isArray(expenses) ? expenses : [];

    fs.writeFileSync(DB_PATH, JSON.stringify(safeExpenses, null, 2), "utf8");
}