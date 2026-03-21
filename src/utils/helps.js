export function help() {
      console.log(`
    Expense Tracker CLI

    Usage:
      node src/index.js <command> [options]

    Commands:
      add --description "<description>" --amount <amount>
      update --id <id> [--description "<description>"] [--amount <amount>]
      delete --id <id>
      list
      summary
      summary --month <month>

    Options:
      --description   Description of the expense
      --amount        Amount of the expense
      --id            ID of the expense
      --month         Month number (1-12) of the current year

    Examples:
      node src/index.js add --description "Lunch" --amount 20
      node src/index.js add --description "Dinner" --amount 10.50
      node src/index.js list
      node src/index.js update --id 1 --description "Lunch with juice" --amount 25
      node src/index.js delete --id 2
      node src/index.js summary
      node src/index.js summary --month 8

    Notes:
      - Amount must be greater than 0
      - Month must be a number between 1 and 12
      - Update can change description, amount, or both
  `);
}