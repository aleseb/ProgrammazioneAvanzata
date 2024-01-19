"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Alimenti_1 = __importDefault(require("../models/Alimenti"));
const Ordini_1 = __importDefault(require("../models/Ordini"));
const StateMachine_1 = require("../utils/StateMachine");
const router = express_1.default.Router();
// Rotta per ottenere tutti gli alimenti. sto cercando tutti gli alimenti che sono presenti nel database. ci sta appunto un findall che appunto li cerca tutti 
//
router.get('/alimenti', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alimenti = yield Alimenti_1.default.findAll();
        return res.status(200).json(alimenti);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Errore nel recupero degli alimenti.' });
    }
}));
// Rotta per creare un nuovo alimento
router.post('/alimenti', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, quantita } = req.body;
    try {
        const nuovoAlimento = yield Alimenti_1.default.create({ nome, quantita });
        return res.status(201).json(nuovoAlimento);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Errore nella creazione del nuovo alimento.' });
    }
}));
// Rotta per aggiornare un alimento esistente
router.put('/alimenti/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nome, quantita } = req.body;
    try {
        const alimento = yield Alimenti_1.default.findByPk(id);
        if (!alimento) {
            return res.status(404).json({ error: 'Alimento non trovato.' });
        }
        alimento.nome = nome;
        alimento.quantita = quantita;
        yield alimento.save();
        return res.status(200).json(alimento);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Errore nell\'aggiornamento dell\'alimento.' });
    }
}));
// Rotta per eliminare un alimento
router.delete('/alimenti/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const alimento = yield Alimenti_1.default.findByPk(id);
        if (!alimento) {
            return res.status(404).json({ error: 'Alimento non trovato.' });
        }
        yield alimento.destroy();
        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Errore nell\'eliminazione dell\'alimento.' });
    }
}));
// Rotta per creare un nuovo ordine di prelievo
router.post('/ordini', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alimenti } = req.body;
    try {
        // Controlla la disponibilità degli alimenti richiesti
        for (const { id, quantita } of alimenti) {
            const alimento = yield Alimenti_1.default.findByPk(id);
            if (!alimento || alimento.quantita_disponibile < quantita) {
                return res.status(400).json({ error: 'Quantità non disponibile per uno o più alimenti.' });
            }
        }
        // Se tutte le quantità sono disponibili, crea l'ordine
        const nuovoOrdine = yield Ordini_1.default.create();
        // Aggiorna le quantità disponibili degli alimenti nell'ordine
        for (const { id, quantita } of alimenti) {
            const alimento = yield Alimenti_1.default.findByPk(id);
            if (alimento) {
                alimento.quantita_disponibile -= quantita;
                yield alimento.save();
            }
        }
        return res.status(201).json(nuovoOrdine);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Errore nella creazione dell\'ordine.' });
    }
}));
// Rotta per aggiornare lo stato di un ordine
router.put('/ordini/:id/stato', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { statoDestinazione } = req.body;
    try {
        const ordine = yield Ordini_1.default.findByPk(id);
        if (!ordine) {
            return res.status(404).json({ error: 'Ordine non trovato.' });
        }
        const stateMachine = new StateMachine_1.StateMachine();
        if (stateMachine.transizioneVerso(statoDestinazione)) {
            ordine.stato = stateMachine.getStatoCorrente();
            yield ordine.save();
            return res.status(200).json(ordine);
        }
        else {
            return res.status(400).json({ error: 'Transizione di stato non valida.' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Errore nell\'aggiornamento dello stato dell\'ordine.' });
    }
}));
// Rotta per segnalare che un ordine è stato preso in carico
router.put('/ordini/:id/preso-in-carico', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ordine = yield Ordini_1.default.findByPk(id);
        if (!ordine) {
            return res.status(404).json({ error: 'Ordine non trovato.' });
        }
        const stateMachine = new StateMachine_1.StateMachine();
        if (stateMachine.transizioneVerso(StateMachine_1.OrdineStato.IN_ESECUZIONE)) {
            ordine.stato = stateMachine.getStatoCorrente();
            yield ordine.save();
            return res.status(200).json(ordine);
        }
        else {
            return res.status(400).json({ error: 'Transizione di stato non valida.' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Errore nell\'aggiornamento dello stato dell\'ordine.' });
    }
}));
// Rotta per segnalare il carico di un determinato peso di un alimento
router.post('/carico-alimenti', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alimentoId, peso } = req.body;
    try {
        const alimento = yield Alimenti_1.default.findByPk(alimentoId);
        if (!alimento) {
            return res.status(404).json({ error: 'Alimento non trovato.' });
        }
        // Verifica che l'ordine sia ancora in uno stato valido
        const ordine = yield Ordini_1.default.findOne({ where: { stato: StateMachine_1.OrdineStato.IN_ESECUZIONE } });
        if (!ordine) {
            return res.status(400).json({ error: 'Nessun ordine in esecuzione.' });
        }
        // Registra il timestamp
        const timestamp = new Date();
        alimento.updated_at = timestamp;
        alimento.quantita_disponibile += peso;
        yield alimento.save();
        // Verifica la sequenza di carico
        const alimentiOrdine = yield ordine.getAlimenti();
        const indiceAlimentoCorrente = alimentiOrdine.findIndex((a) => a.id === alimento.id);
        if (indiceAlimentoCorrente === -1) {
            // L'alimento non fa parte dell'ordine corrente
            yield ordine.update({ stato: StateMachine_1.OrdineStato.FALLITO });
            return res.status(400).json({ error: 'Sequenza di carico non rispettata. Ordine annullato.' });
        }
        // Verifica le quantità caricate rispetto al valore richiesto
        const percentualeDeviazionePermitita = parseFloat(process.env.PERCENTUALE_DEVIATA || '5'); // Modifica il valore di default
        const quantitaRichiesta = alimentiOrdine[indiceAlimentoCorrente].quantita;
        const quantitaCaricata = alimento.quantita_disponibile;
        const deviazionePercentuale = Math.abs(((quantitaCaricata - quantitaRichiesta) / quantitaRichiesta) * 100);
        if (deviazionePercentuale > percentualeDeviazionePermitita) {
            // Quantità caricate deviate rispetto al valore richiesto
            yield ordine.update({ stato: StateMachine_1.OrdineStato.FALLITO });
            return res.status(400).json({
                error: `Deviazione percentuale troppo elevata (${deviazionePercentuale}%). Ordine annullato.`,
            });
        }
        // Verifica se l'ordine è COMPLETATO
        const ordineCompletato = alimentiOrdine.every((a, index) => {
            return index <= indiceAlimentoCorrente ? a.quantita === a.quantita_caricata : a.quantita_caricata === a.quantita;
        });
        if (ordineCompletato) {
            yield ordine.update({ stato: StateMachine_1.OrdineStato.COMPLETATO });
            return res.status(200).json({ message: 'Ordine completato con successo.' });
        }
        return res.status(200).json({ message: 'Carico dell\'alimento registrato con successo.' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Errore nell\'aggiornamento delle quantità disponibili dell\'alimento.' });
    }
}));
exports.default = router;
