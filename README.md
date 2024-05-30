# De beste workshop op Github

## Stap 1: opstarten van de applicatie

Clone de repository en open 2 terminals (een voor de frontend en een voor de backend). Run het volgende commando in beide terminals
```
npm install
```

Wanneer de install klaar is run de backend door het volgende commando
```
npm start
```

En run de frontend door het volgende commando
```
npm run start
```

De applicatie start op. Open de console en probeer een van de twee requests. Je krijgt een CORS error te zien in de console.

## Stap 2: CORS error oplossen

Voeg de cors package toe aan de backend en start deze daarna weer op
```
npm install cors
```

(stap 2.1) Require cors door in de app.js in de backend
```
var cors = require('cors');
```

(stap 2.2) Laar de app gebruik maken van de cors
```
app.use(cors());
```

Probeer nu de requests (deze werken)

---

Op dit moment wordt de API open gesteld voor iedereen, maar dit is niet altijd wenselijk. Om specefieke endpoints open te stellen voor een domain kan je het volgende doen

(stap 2.3) Open de routes/index.js en require cors
```
var cors = require('cors');
```

(stap 2.4) maak een options object. Dit options object zorgt ervoor dat je alleen op localhost:3000 bij een endpoint mag.
```
//cors options for localhost:3000
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}
```

(stap 2.5) voeg cors toe als 2e parameter van de endpoint -> vervang de hele lijn voor dit
```
router.post('/register', cors(corsOptions), function (req, res, next) {
```

Test nu of de de post request nog steeds werkt. Open nu een nieuwe frontend terminal en run het volgende commando. Dit start een nieuwe frontend op `http://localhost:3001`. Deze is niet open gesteld via het options object en daardoor zou je dus een CORS error moeten krijgen.
```
npm run start-3001
``` 
Sluit de applicatie op 3001 af en start de orignele op poort 3000 weer op.

## Stap 3: insecure design

In ```Frontend/src/actions/actions.js``` staat nu de API URL. Dit kan natuurlijk niet. Maak een ```.env``` file aan met de URL als inhoud.
```
REACT_APP_API_URL='http://localhost:4000'
```

(stap 3.1) Vervang nu de hardcoded URL door 
```
process.env.REACT_APP_API_URL
```

Start nu de frontend opnieuw op. Dit moet altijd als je de .env hebt aangemaakt/aanpegast.

---

Ga naar de ```app.js``` in de frontend. Op dit moment kan je alles meesturen via de post request, maar dit gaan we aanpassen zodat alleen email adressen verstuurd kunnen worden. Dit kan doormiddel van regex.

(stap 3.2) maak een validEmail variabele
```
const [validEmail, setValidEmail] = useState(false);
```

(stap 3.3) Voeg de regex functie toe
```
const handleEmailChange = (e) => {
  const enteredEmail = e.target.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  setEmail(enteredEmail);
  setValidEmail(emailRegex.test(enteredEmail));
};
```

(stap 3.4) Voeg een melding toe voor als er een niet geldig email is ingevuld
```
{!validEmail && 'Please enter a valid email'}
```

(stap 3.5) Verander de onChange van het input veld naar
```
onChange={handleEmailChange}
```

(stap 3.6) Disable de knop als het emailadres niet valid is zodat er niks verstuurd kan worden
```
disabled={!validEmail}
```

---

Op dit moment kan je requests spammen. Om dit te voorkomen gaan we een rate limeter in de applicatie bouwen.

Installeer de ```express-rate-limit``` package in de backend
```
npm install express-rate-limit
```

(stap 3.7) Require rateLimit in de app.js van de backend
```
var rateLimit = require('express-rate-limit');
```

(stap 3.8) Maak een rateLimit object en gebruik deze in de app.js van de backend
```
const limiter = rateLimit({
  windowMs: 2000, // 2 seconds
  max: 5, // limit each IP to 2 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);
```

Start nu weer de backend op en probeer de get request te spammen terwijl je de console open hebt. Je krijgt een 429 status code terug van de backend, maar deze wordt nog niet mooi opgevangen in de frontend. Om dit op te lossen voeg het volgende stukje code toe in beide actions in de frontend (stap 3.9)
```
if(response.status === 429) {
  return 'Too many requests, please try again later.'
}
```

Nu wordt er een message getoond in de frontend!
