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

    let raw = "";

    try {
        raw = fs.readFileSync(DB_PATH, "utf8").trim();

        if (!raw) return [];

        const data = JSON.parse(raw);

        return Array.isArray(data) ? data : [];
    } catch (error) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.resolve(process.cwd(), `expenses.backup.${timestamp}.json`);

        if (raw) {
            fs.writeFileSync(backupPath, raw, "utf8");
        }

        console.log("Warning: expenses.json is invalid or unreadable.");
        console.log(`A backup was created at: ${backupPath}`);
        console.log("The original file was not silently discarded.");
        console.log(error instanceof Error ? error.message : error);

        return [];
    }
}

export function saveExpenses(expenses) {
    ensureExpenseFileExists();

    const safeExpenses = Array.isArray(expenses) ? expenses : [];

    fs.writeFileSync(DB_PATH, JSON.stringify(safeExpenses, null, 2), "utf8");
}