import express from 'express';
import bodyParser from 'body-parser';
import alimentiRoutes from './routes/alimentiRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/', alimentiRoutes); 

app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});



(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connessione al database stabilita con successo.');
    } catch (error) {
      console.error('Errore durante la connessione al database:', error);
    }
  })();
  


  //export { checkJwt, AdminPermission, UserPermission} 
  
  
  
