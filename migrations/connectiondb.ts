const { Sequelize } = require('sequelize');

async function test() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

}

const sequelize = new Sequelize('programmazione_avanzata', 'root', 'AvanzataProgram2024?', {
    host: 'localhost',
    dialect: 'mysql',
  });

test();
