const connection = require('./modules/database');

const fs = require('fs');
const sqlMigrationFile = fs.readFileSync('./planty_of_food.sql', 'utf8');

async function resetDatabase() {
  try {

    const fs = require('fs');
    const sqlMigrationFile = fs.readFileSync('./planty_of_food.sql', 'utf8');

    connection.query(sqlMigrationFile, (error, result) => {
      if (error) throw error
      console.log(result);
    });
    connection.end();

    console.log('Database reset to initial state successfully.');

  } catch (error) {
    console.error('Error resetting database:', error);
  }
}

resetDatabase();