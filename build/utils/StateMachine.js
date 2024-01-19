"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachine = exports.OrdineStato = void 0;
var OrdineStato;
(function (OrdineStato) {
    OrdineStato["CREATO"] = "CREATO";
    OrdineStato["FALLITO"] = "FALLITO";
    OrdineStato["IN_ESECUZIONE"] = "IN_ESECUZIONE";
    OrdineStato["COMPLETATO"] = "COMPLETATO";
})(OrdineStato || (exports.OrdineStato = OrdineStato = {}));
class StateMachine {
    constructor() {
        this.statoCorrente = OrdineStato.CREATO;
    }
    transizioneVerso(statoDestinazione) {
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
    getStatoCorrente() {
        return this.statoCorrente;
    }
}
exports.StateMachine = StateMachine;
