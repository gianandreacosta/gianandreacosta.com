# Config Shadow

Questa cartella contiene le copie "shadow" dei file di configurazione della pipeline rassegna stampa.

**La pipeline V1 sul VPS NON legge da qui.** Usa i file originali in `/root/.openclaw/workspace/tools/` sul VPS.

Questi file sono gestiti dal pannello admin (`admin.lab.gianandreacosta.com`) e possono essere modificati via UI.

Al momento del cutover futuro, verranno promossi a produzione con backup e operazione esplicita.

## File

- `rassegna_fonti.json` — fonti RSS per categoria
- `rassegna_analisi_config.json` — parametri analisi AI + chain modelli
- `rassegna_analisi_prompt.txt` — prompt versionato per il modello
