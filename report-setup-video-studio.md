# Report critico — Setup video home studio

**Da:** Claude Code
**Per:** Gian-Andrea Costa
**Data:** 6 agosto 2026
**Oggetto:** validazione critica dell'handoff del 5 agosto 2026
**Stato:** non è una conferma di cortesia. La lista finale approvata in chat **non regge**. Sotto il perché, con fonti, e cosa metterle al posto.

---

## Sintesi esecutiva — leggere prima di tutto

Tre conclusioni, in ordine di importanza.

1. **La lista finale (sezione 6 dell'handoff) è da rifare. Tutti e tre i corpi macchina proposti falliscono il requisito su cui l'intero acquisto sta in piedi.** Il requisito «registrare su scheda SD mentre si streamma via USB» era stato verificato solo sulla ZV-E10 **II**. Verificato ora sui corpi della lista finale:
   - **Sony ZV-E10 Mk I** (raccomandata): porta **USB 2.0**, quindi lo stream USB è **bloccato a 720p**, niente 4K, e la registrazione simultanea su scheda non è documentata. Non fa il workflow.
   - **Sony α6400 / α6100** (alternative): **nessun UVC nativo**. Funzionano da webcam solo tramite il software *Imaging Edge Webcam* (~qualità SD, nessuna registrazione su scheda in quella modalità). L'α6100 è pure fuori produzione.

   Era esattamente lo scenario che la sezione 8.1 dava come «se la Mk I non ha questa funzione, l'intera lista finale va rifatta». È successo.

2. **L'errore non è solo nella scelta del corpo, è nell'architettura.** Il criterio dato per decisivo — «UVC via USB» — punta nella direzione sbagliata. **La modalità webcam UVC, su quasi tutte le fotocamere, disabilita la registrazione su scheda mentre streamma.** Canon lo scrive nero su bianco nel proprio manuale. La funzione «registra mentre streamma» via UVC è una particolarità di **pochi corpi Sony recenti** (ZV-E10 II, α6700, ZV-E1, FX30), non una proprietà dell'UVC. L'architettura che soddisfa davvero il requisito è **HDMI pulito + capture card** — quella che l'handoff ha scartato senza confronto quantitativo (lo ammette la sezione 8.11) e **per cui possiedi già l'hardware** (il convertitore HDMI→USB della GoPro).

3. **La focale a f/1.4 spalancato è la seconda debolezza.** Il calcolo geometrico è corretto, ma ~20 cm di profondità di fuoco su una persona che si muove parlando è una condanna all'autofocus che «respira» di continuo. La scelta dei 23 mm (≈35 mm equivalenti) va bene; l'apertura di lavoro no: **f/2–f/2.8**, non f/1.4.

Il resto — esclusione di action cam come camera principale, ragionamento sull'illuminazione, sincronizzazione audio — **regge ed è ben fatto**. Il credito dove è dovuto è nella sezione 2.

---

## 1. Verifica punto per punto della sezione 8

### Priorità alta

**8.1 — ZV-E10 Mk I, registrazione su scheda durante lo streaming USB → FALSO / non disponibile come serve.**
La Mk I (lug. 2021) ha porta **USB 2.0 Hi-Speed**. Per la regola Sony stessa, con USB 2.0 lo streaming è **limitato a 720p**, punto: niente 4K, niente 1080p pieno. La voce «Movie Rec During Streaming» non è documentata su questo corpo, e comunque a 720p sarebbe inutile per un master in qualità piena. → *La raccomandazione principale della lista finale cade.*
Fonti: Sony Help Guide ZV-E10 (streaming USB) `helpguide.sony.net/ilc/2070/v1/en/contents/TP1000201566.html`; specifiche `.../TP1000201578.html`.

**8.2 — α6400 e α6100, stessa funzione → FALSO.**
Nessuna delle due ha UVC nativo. Diventano webcam solo con *Imaging Edge Webcam* (driver virtuale, storicamente ~1024×576, poi verso 720p, **senza registrazione su scheda** in quella modalità). Porta Micro-USB 2.0. L'α6100 è **discontinuato** (Sony ha chiuso la linea a fine 2021). L'α6400 è ancora prodotto/venduto nuovo.
Fonti: B&H Explora «How to use your Sony camera as a webcam»; PhotographyPursuits «Sony a6400 USB webcam»; PetaPixel (fine α6100).

**8.3 — Viltrox 23mm f/1.4 AF (E-mount APS-C) → CONFERMATO ESISTE.**
Esiste, è autofocus (STM), f/1.4, 23 mm → **~34,5 mm equivalenti** (centra il target). Il prezzo indicato (CHF 180) resta da verificare su fonte svizzera nella fase prezzi — ma il prodotto è reale e adatto.
Fonti: B&H `bhphotovideo.com/c/product/1577730-REG/`; Dustin Abbott review; dpreview forum.

**8.4 — Viltrox 25mm f/1.7 «Air» → CONFERMATO ESISTE.**
Autofocus, f/1.7, 25 mm → ~37,5 mm equiv, molto leggero (170 g), economico. Circa 2/3 di stop più chiuso del 23 f/1.4 → un filo meno stacco, ma alternativa valida ed economica.
Fonti: Viltrox ufficiale `viltrox.com/products/af-25mm-f1-7-e`; B&H.

### Priorità media

**8.5 — Prezzi in CHF → confermato «indicativi».** Nessuna ricerca prezzi avviata (rispetto la sezione 7). Vanno tutti riverificati nella fase successiva sui siti che indicherai. Unico dato di prodotto solido oggi: i modelli esistono e le loro capacità sono quelle descritte qui.

**8.6 — HERO4, registrazione su scheda mentre l'HDMI è attivo → CONFERMATO SÌ, con un asterisco importante.**
La HERO4 registra su microSD **e** manda HDMI simultaneamente. **Ma**: l'uscita HDMI live è 1080p60 solo *da ferma*; **mentre registra scende a 720p**. E il 4K su HDMI live non esiste (max 1080p live, il 4K esce solo in riproduzione). → Come B-cam per un piano largo va benissimo; come sorgente «4K su scheda + feed pulito» no: il feed in registrazione è 720p.
Fonti: GoPro Community «HERO4 HDMI Output Information»; seesense.eu «What resolution can my GoPro output from HDMI».

**8.7 — HERO4, risoluzione HDMI e comportamento termico.** Risoluzione: vedi sopra (1080p da ferma / 720p in registrazione; niente 4K live). Termico: le GoPro in corpo sigillato **fermo e senza flusso d'aria** — esattamente lo scenario da scrivania — vanno in protezione termica. Nessun dato ufficiale HERO4-specifico su durata/temperatura (**non confermato**). Mitigazione: girare a 1080p, tenerla ventilata, non su superfici morbide. Da testare a costo zero.
Fonti: HaveCameraWillTravel; GoPro forums.

**8.8 — Compatibilità hub/controller USB con due camere → CONFERMATO come problema reale.**
Due stream 4K su un solo controller USB 3.0 (5 Gbps) lo saturano: vanno su **controller host distinti**, non su due porte dello stesso hub. Nota pratica: quasi tutti i corpi economici cappano comunque l'UVC a 1080p, quindi il problema si pone solo se insisti sul doppio 4K via USB.

### Priorità bassa

**8.9 — Assunzione distanza camera-soggetto → punto debole reale, non risolto.**
I calcoli assumono camera a ~1,4 m. Tu hai dichiarato solo i **2 m dietro** di te. **La profondità della stanza davanti non è nota.** Se lo spazio davanti è < ~1,2 m, il 23 mm diventa troppo stretto e serve un 16–18 mm. **Va misurato prima di comprare l'ottica.** È l'unico dato che può ribaltare la scelta della focale.

**8.10 — Nessuna alternativa non-Sony valutata → lacuna vera, e pesa.**
È un bias verso l'ecosistema Sony. Fujifilm, Panasonic e Nikon hanno oggi corpi che per *questo* workflow sono uguali o migliori (dettaglio in §3). In particolare, appena si passa all'architettura HDMI+capture (quella corretta), il vincolo «deve avere il trucco Sony del Movie-Rec-During-Streaming» sparisce e il mercato dell'usato si apre enormemente.

**8.11 — UVC data per preferibile senza confronto → è l'errore centrale.**
Vedi §2.1. Il confronto quantitativo, fatto ora, dà **HDMI+capture** come architettura corretta per il requisito dichiarato. E possiedi già una capture card.

**8.12 — Modelli più recenti non verificati → diversi usciti dopo la consulenza.**
Fuji **X-M5** (nov. 2024, ~$799, UVC 4K/60 nativo), Nikon **Z50 II** (fine 2024, ~$909, N-Log 10-bit interno), Panasonic **GH7** (2024), Canon **R50 V** (2025), **DJI Osmo Pocket 4** (apr. 2026) e **Pocket 4 Pro** (lug. 2026), Nikon **ZR** cinema (2025). Alcuni cambiano il quadro (§3).

---

## 2. Valutazione critica del ragionamento (sezione 4)

### 2.1 — Il criterio architetturale UVC (4.1): sbagliato nella conclusione

Il ragionamento identifica bene **il requisito** («registrare in qualità piena mentre mando un feed pulito al computer»), poi sbaglia **la traduzione tecnica**. Assunzione implicita: «UVC = registra-mentre-streamma». È il contrario.

- **La modalità webcam UVC, di regola, disabilita la registrazione su scheda mentre streamma.** Canon lo scrive esplicitamente: *«No image is recorded to the card during streaming»* (manuale R50 V, streaming UVC/UAC). È la norma tra i brand: la fotocamera in modalità webcam *è* una webcam, non registra.
  Fonte: Canon R50 V manual, USB (UVC/UAC) Streaming `cam.start.canon/en/C021/manual/html/UG-07_Network_0260.html`.
- La funzione «registra mentre streamma via USB» esiste su **pochi corpi Sony recenti** grazie alla voce dedicata *Movie Rec During Streaming* — **ZV-E10 II, α6700, ZV-E1, FX30** — non su UVC in generale, e **non** sui corpi economici della lista finale.
  Fonte: Sony Help Guide ZV-E10 II `helpguide.sony.net/ilc/2430/v1/en/contents/211h_usb_streaming.html`; α6700 `.../ilc/2320/.../211h_usb_streaming.html`.
- L'**HDMI pulito**, invece, viene generato **mentre la camera è in normale modalità di ripresa**: registra su scheda *e* specchia il feed sull'uscita HDMI, simultaneamente. È l'architettura che soddisfa il requisito, e riusa il convertitore che già hai.

Conseguenza: il criterio «UVC» ha spinto la scelta verso i corpi sbagliati. Ha «funzionato» in chat solo perché per caso la ZV-E10 II ha quella funzione di nicchia — poi la lista finale l'ha sostituita con la Mk I che non ce l'ha, e il castello è crollato.

### 2.2 — Esclusione di action cam / webcam come camera principale (4.2): CORRETTO

Sensori piccoli + ottica grandangolare fissa non danno vera profondità di campo. Ragionamento solido, niente da eccepire.

### 2.3 — Scelta del corpo (4.3): giusta per la ZV-E10 II, ma con un errore di fatto sulla R50 V

- La **ZV-E10 II come corpo nuovo è in realtà una scelta valida**: è uno dei pochi corpi che fa davvero UVC 4K/30p + registrazione su scheda + alimentazione dal computer. Il problema non è la ZV-E10 II: è averla scartata nella lista finale per un usato che non fa il lavoro.
  Caveat confermato: con USB 2.0 il segnale scende a 720p anche impostando 4K → serve porta/cavo USB 3.2 (5 Gbps). Vero.
- **La motivazione data per scartare la Canon R50 V è FALSA (invertita).** L'handoff dice: «4K UVC non disponibile se la camera si alimenta via USB». Il manuale Canon dice **l'opposto**: il 4K UVC **richiede** che l'USB-C porti abbastanza alimentazione; se il cavo non la eroga, lo stream **scende a 1080p**. Nessuna dummy battery necessaria per il 4K: serve un cavo USB-C↔USB-C che porti insieme dati (≥10 Gbps) e potenza (≥60 W).
  Fonti: Canon R50 V manual (link sopra); Canon Community «Setting streaming size for EOS R50 V».
  *Nota*: la conclusione «la R50 V non è ideale per un fisso sempre acceso» sopravvive lo stesso, ma per **un'altra ragione**: in modalità UVC **non registra nulla su scheda**. Giusta conclusione, ragione sbagliata.

### 2.4 — Calcolo della focale (4.4): aritmetica CORRETTA, apertura di lavoro SBAGLIATA

Ho rifatto i conti in modo indipendente (sensore APS-C 23,5 mm, CoC 0,02 mm, camera a 1,4 m):
- Inquadratura orizzontale: 16 mm → 2,05 m; 23 mm → 1,43 m; 30 mm → 1,10 m. **Coincide con la tabella.**
- Profondità di campo 23 mm f/1.4 a 1,4 m: vicino ≈ 1,31 m, lontano ≈ 1,51 m → **~20 cm.** Coincide con i ~22 cm dichiarati.

Quindi la matematica tiene. Ma:
- **f/1.4 spalancato su un soggetto che si muove è un errore pratico.** ~20 cm di fuoco utile: basta che ti sporga o oscilli di 10–15 cm parlando e gli occhi escono dalla zona nitida, con l'AF che «respira» in continuo — molto più fastidioso in video che in foto. **f/2.8 raddoppia il margine (~40 cm)** e a 23 mm lo sfondo a 3,4 m resta comunque morbido. **Gira a f/2–f/2.8.** L'ottica f/1.4 va bene comprarla (serve la resa e il margine in poca luce), ma non è l'apertura di lavoro.
- **Aspettativa di bokeh da ridimensionare.** Un 23 mm, anche a f/1.4, non «spappola» lo sfondo come un 50–85 mm: la pupilla d'ingresso è piccola. In una stanza con soli 2 m dietro il soggetto, la fisica limita lo stacco. Avrai uno sfondo *pulito e morbido*, non cremoso. Chi vuole vero stacco allunga la focale e la distanza — cosa che una stanza piccola non concede. Onesto dirlo prima, non dopo l'acquisto.

### 2.5 — Seconda camera (4.5): OK, con l'asterisco 720p

HERO4 per il piano largo: scelta a costo zero corretta. Clean HDMI confermato (Setup → OSD → OFF). Registra-mentre-HDMI confermato, **ma il feed scende a 720p in registrazione** (§8.6). Per un piano largo di contesto va bene. Il mismatch di colore con la camera principale resta, come già scritto. La DJI Osmo Pocket 4 esiste davvero (annuncio apr. 2026, sensore 1"), ma è comunque irrilevante: la B-cam scelta è la GoPro.

### 2.6 — Illuminazione (4.6): SOLIDO. Il pezzo migliore dell'handoff.

Diffusione = dimensione apparente della sorgente = durezza dell'ombra: corretto. Fill con riflettore passivo per non introdurre mismatch di temperatura: corretto e furbo. Hue come accento sfondo (dove il CRI mediocre non conta) con avvertenze su flicker e blocco del bilanciamento del bianco: tutto giusto. Unica nota: se giri a f/2.8 (come consiglio) perdi ~2 stop lì, più 1–2 in diffusione — verifica che la luce «molto potente» basti ancora; probabilmente sì, ma è da provare, non da dare per scontato.

### 2.7 — Vincolo bus USB (4.7) e sync audio (4.8): CORRETTI

Doppio 4K UVC che satura il bus: reale, serve separare i controller. La sync audio via traccia scratch dall'interfaccia all'ingresso mic della camera è pratica standard e la migliore delle due proposte.

---

## 3. Alternative non considerate

### 3.1 — L'architettura HDMI pulito + capture card (la più importante)

Confronto diretto, per il *tuo* requisito (feed pulito al PC **e** file pieno su scheda insieme):

| | UVC diretto via USB | HDMI pulito + capture card |
|---|---|---|
| Registra su scheda mentre manda il feed | **No** (tranne pochi Sony recenti) | **Sì** (camera in normale ripresa) |
| Riusa hardware già tuo | No | **Sì** (convertitore GoPro) |
| Indipendenza dal firmware/brand | Bassa (funzione rara) | **Alta** (la capture card è UVC standard per OBS, qualunque camera) |
| Affidabilità enumerazione/hot-plug | Media (quirks USB) | **Alta** |
| Lunghezza cavo | USB passivo ~3 m | HDMI 5–10 m; capture card vicino al PC |
| Costo | Più basso (niente capture) | Una capture card **per camera** |
| Due camere | Due stream USB, rischio saturazione bus | Due capture card (una già la hai) |

**Verdetto: per il requisito dichiarato, HDMI+capture è l'architettura corretta.** Vantaggio strategico: **slega la scelta della camera dalla funzione di nicchia** e riapre l'usato economico. Eccezione importante: **i corpi Canon consumer (R50, R10, M50 II) non vanno bene neanche qui** — attivando l'HDMI pulito («external monitor») **disabilitano la registrazione su scheda**. Da evitare per questo workflow.
Fonti: Canon Community «Clean HDMI out R50»; DVXuser (R10/R8/R7 HDMI + internal record).

### 3.2 — Corpi non-Sony che per questo uso sono uguali o migliori

- **Panasonic GH6 / GH7** (M4/3): **ventola attiva, registrazione illimitata**, HDMI full-size pulito + registrazione simultanea, V-Log. La scelta più a prova di bomba per «siediti e registra un'ora fissa». M4/3 dà un filo meno stacco a parità di inquadratura: si compensa con ottica veloce (25 mm f/1.4 → 50 mm equiv). Fonte: 4KShooters (GH6 illimitato).
- **Fujifilm X-S20** (APS-C): F-Log2 10-bit, stabilizzazione in-body, ventola opzionale FAN-001 per sessioni lunghe, colore Fuji, UVC nativo se mai servisse. Ottimo tuttofare.
- **Nikon Z50 II** (APS-C, ~$909 nuovo): **N-Log 10-bit interno**, UVC nativo, processore EXPEED 7. Miglior rapporto capacità/prezzo tra i nuovi. Fonti: Nikon USA; dpreview review.
- **Fujifilm X-M5** (~$799): UVC 4K/60 nativo, tra i più economici. Niente IBIS né EVF, corpo piccolo (termica su 4K lunghi da verificare). Fonte: dpreview review.

### 3.3 — Ottiche non considerate

- **Sirui Sniper 23mm f/1.2 AF** (E-mount): stesso campo (~35 mm equiv), autofocus, **basso focus breathing** — vantaggio concreto in video che l'handoff non ha mai citato. Se vuoi il look più spinto; comunque da chiudere verso f/2 per un soggetto in movimento. Fonti: Sirui store; B&H.
- Nota mount: **se cambi corpo (Fuji/Nikon/Panasonic), cambia anche l'ottica.** Viltrox 23mm f/1.4 esiste anche per Fuji X e Nikon Z; su M4/3 l'equivalente è un 25 mm f/1.4. La raccomandazione ottica è vincolata alla decisione sul corpo, che ora è di nuovo aperta.

### 3.4 — La semplificazione che nessuno ha proposto: e se 1080p bastasse?

Domanda mai posta in chat, ed è **la più importante**. Il requisito «file in qualità piena» è stato tradotto d'ufficio in «4K su scheda mentre streammo», che è ciò che rende tutto fragile e costoso. Ma per YouTube/Instagram parlato, **1080p è più che adeguato come consegna finale.** Se accetti un master 1080p:
- streammi il feed pulito in OBS, **OBS registra** ogni sorgente, fine. **Niente registrazione su scheda, niente capture card, niente sync in post, un cavo.** Funziona con quasi ogni corpo UVC nativo.
- Il 4K su scheda serve solo se vuoi ritagliare/riquadrare in post o vuoi 10-bit/Log per la color. Legittimo, ma è una scelta, non un obbligo — e va deciso *consapevolmente*, perché è quella scelta a far esplodere costo e complessità.

---

## 4. Lista finale rivista

La raccomandazione dipende da **una domanda che devi decidere tu**, mai posta in chat:

> **Ti serve un master 4K/10-bit su scheda, o un master 1080p va bene come consegna finale?**

Da lì tre scenari puliti. In tutti: **ottica 23 mm da usare a f/2–f/2.8** (non f/1.4), **misura prima lo spazio davanti** (se < 1,2 m → 16–18 mm), illuminazione **come da handoff** (regge), audio **come da handoff** (regge), **GoPro HERO4** come B-cam wide.

### Scenario A — «1080p mi basta» → il più semplice ed economico *(consigliato se non fai molto reframing in post)*
- Un corpo con **UVC nativo 1080p** (ZV-E10 II, Fuji X-M5, Nikon Z50 II…), **OBS registra il feed**. Un cavo, niente capture card, niente sync.
- Nota: la ZV-E10 **Mk I** qui è comunque debole (cappa a 720p su USB 2.0). Se resti Sony e vuoi UVC pulito, il pavimento è la **ZV-E10 II**, non la Mk I.

### Scenario B — «voglio master pieno su scheda» → HDMI + capture card *(consigliato se vuoi 4K/10-bit e flessibilità in post)*
- **Architettura HDMI pulito + capture card**, riusando il convertitore che hai; una **seconda** capture card economica (~€15–40) per la camera principale (una card = una camera).
- Corpo, in ordine di adeguatezza:
  1. **Panasonic GH6/GH7** se prevedi sessioni lunghe fisse (illimitato, ventilato).
  2. **Nikon Z50 II** (~$909) o **Fuji X-S20** per miglior stacco APS-C + colore.
  3. **Via Sony usata economica**: **α6400** (ancora nuova a listino) — HDMI pulito + registrazione simultanea; **ma verifica sul singolo esemplare** l'HDMI pulito mentre registra. Tiene aperto l'E-mount e le ottiche 23 mm già individuate.
- Coerenza: in questa architettura la **GoPro rientra naturalmente** (è già HDMI+capture).

### Scenario C — «voglio l'UVC Sony 4K-mentre-registra, un cavo solo» → corpo nuovo, budget più alto
- Il pavimento è la **Sony ZV-E10 II** (~$999 / usata CHF 550–600), **non** la Mk I. Superiore ma più caro: **α6700** (IBIS). La camera da sola mangia quasi tutto il budget «CHF 600–830». È questo il costo reale del requisito così com'è stato scritto.

### Cosa esce dalla lista finale dell'handoff
- **ZV-E10 Mk I, α6400 e α6100 come corpi per UVC-mentre-registra**: fuori (falliscono il requisito).
- **Tutti i corpi Canon consumer** (R50/R10/M50 II): fuori (non registrano su scheda né in UVC né in HDMI pulito).
- **α6100 in assoluto**: fuori (discontinuato).

---

## 5. Raccomandazione motivata

**Primo: decidi 1080p vs 4K-master.** È la vera biforcazione, e nessuno te l'ha messa davanti. Il mio consiglio netto:

**Vai sullo Scenario B — HDMI pulito + capture card — con un Nikon Z50 II (o una α6400 usata se vuoi restare E-mount e verifichi l'esemplare).** Motivi:

1. **Riusa hardware che già possiedi** e usi la stessa logica per entrambe le camere → coerenza di sistema, GoPro inclusa senza forzature.
2. **Ti slega dalla funzione-trappola** «Movie Rec During Streaming»: è quella dipendenza a rendere fragile e cara la lista attuale. Con HDMI+capture la camera va scelta per come *riprende*, non per un flag di firmware raro.
3. **È l'architettura più affidabile**: la capture card si presenta a OBS come UVC standard, indipendente da brand/firmware/quirks USB.
4. **Ti dà il master pieno su scheda** senza rinunce, e il feed 1080p pulito a OBS per la regia live.

Se invece **1080p ti basta davvero** (probabile, per social parlati), lo **Scenario A** è più semplice ancora e più economico: un corpo UVC nativo, OBS registra, un cavo. In quel caso non serve nemmeno la seconda capture card. È la scelta «semplice ma di qualità» che avevi chiesto all'inizio, presa alla lettera.

**Non consiglio** di inseguire l'usato Sony economico dentro l'architettura UVC: è la strada che ha appena fallito la verifica.

**Su ottica e stanza, indipendentemente dallo scenario:** compra il 23 mm f/1.4 (Viltrox o Sigma) **ma lavora a f/2–f/2.8**, e **misura lo spazio davanti a te prima di ordinare l'ottica** — è l'unico dato che può ancora ribaltare la focale.

---

## 6. Cosa resta da verificare sul campo (prima della fase prezzi)

1. **Misura la profondità della stanza davanti al soggetto.** Sblocca (o ribalta) la scelta della focale. Costo zero.
2. **Decidi 1080p vs 4K-master.** Sblocca l'intera architettura.
3. Se Scenario B con Sony usata: **prova l'esemplare** — HDMI pulito attivo *mentre registra su scheda*. È il nuovo requisito-cardine e va confermato sull'unità, non sulla scheda tecnica.
4. **Test HERO4** a costo zero: clean HDMI (OSD OFF) + registrazione simultanea + tenuta termica su sessione lunga a 1080p.
5. **Attacco della luce** vs softbox, prima di ordinare la diffusione (unico elemento potenzialmente incompatibile, come già notato).
6. Solo dopo le decisioni 1–2: **ricerca prezzi** nuovo/usato sui siti che indicherai tu (sezione 7 dell'handoff). Non l'ho avviata.

---

### Nota di metodo e limiti
Verifiche condotte su help guide e manuali ufficiali (Sony, Canon, DJI), più fonti secondarie affidabili (dpreview, B&H, CineD, recensori riconosciuti). Alcune pagine primarie Sony/Canon erano bloccate all'accesso diretto dal proxy di rete: in quei casi il dato è stato ricavato dal testo del manuale via ricerca e corroborato da fonti indipendenti, e dove restava incoerente è marcato «da verificare». I prezzi in CHF **non** sono stati verificati: è materia della fase successiva. Il punto più solido di tutto il report — l'UVC che disabilita la registrazione su scheda, e i pochi Sony che fanno eccezione — poggia su testo esplicito dei manuali ufficiali.
