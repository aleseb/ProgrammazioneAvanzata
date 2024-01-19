// migrate.js
import Alimenti from '../models/Alimenti'

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Migrazione del database completata con successo.');
  } catch (error) {
    console.error('Errore durante la migrazione del database:', error);
  } finally {
    // Chiudi la connessione al termine della migrazione
    await sequelize.close();
  }
})();
/*
// migrate.ts

import sequelize from './sequelize-config.mjs';
import { someFunction } from '../models/Alimenti.ts';

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Migrazione del database completata con successo.');
  } catch (error) {
    console.error('Errore durante la migrazione del database:', error);
  } finally {
    // Chiudi la connessione al termine della migrazione
    await sequelize.close();
  }
})();
*/