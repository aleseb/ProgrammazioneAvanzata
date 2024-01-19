/*
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: '3306',
  username: 'root@localhost',
  password: 'AvanzataProgram2024?',
  database: 'prova',
});


export default sequelize;
*/
import { Sequelize } from 'sequelize';

class Database {
  private static instance: Database;
  private sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize({
      database: 'prova',
      username: 'root',
      password: 'AvanzataProgram2024?',
      host: 'localhost', 
      dialect: 'mysql', 
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }
}

export default Database;