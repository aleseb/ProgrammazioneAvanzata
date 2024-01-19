enum OrdineStato {
    CREATO = 'CREATO',
    FALLITO = 'FALLITO',
    IN_ESECUZIONE = 'IN_ESECUZIONE',
    COMPLETATO = 'COMPLETATO',
  }
  
  class StateMachine {
    private statoCorrente: OrdineStato;
  
    constructor() {
      this.statoCorrente = OrdineStato.CREATO;
    }
  
    public transizioneVerso(statoDestinazione: OrdineStato): boolean {
      switch (this.statoCorrente) {
        case OrdineStato.CREATO:
          if (statoDestinazione === OrdineStato.FALLITO || statoDestinazione === OrdineStato.IN_ESECUZIONE) {
            this.statoCorrente = statoDestinazione;
            return true;
          }
          break;
  
        case OrdineStato.IN_ESECUZIONE:
          if (statoDestinazione === OrdineStato.COMPLETATO || statoDestinazione === OrdineStato.FALLITO) {
            this.statoCorrente = statoDestinazione;
            return true;
          }
          break;
           
        default:
          return false;
      }
  
      return false;
    }
  
    public getStatoCorrente(): OrdineStato {
      return this.statoCorrente;
    }
  }
  
  export { OrdineStato, StateMachine };
  