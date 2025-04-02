const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Aggiungi una cartella per i CSS e immagini
const publicDir = path.join(__dirname, 'public');
const cssDir = path.join(publicDir, 'css');
if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir);
}

// Crea una variabile per la configurazione delle pagine
const pagesConfig = [
    {
        filename: 'home.html',
        title: 'Benvenuto alla nostra Home',
        content: '<h1>Benvenuti nel nostro sito</h1><p>Questa è la nostra home page.</p>',
    },
    {
        filename: 'chi-siamo.html',
        title: 'Chi Siamo',
        content: '<h1>Chi siamo</h1><p>Scopri di più su di noi e la nostra missione.</p>',
    },
    {
        filename: 'cosa-facciamo.html',
        title: 'Cosa Facciamo',
        content: '<h1>I nostri servizi</h1><p>Scopri tutte le attività che offriamo.</p>',
    },
    {
        filename: 'contatti.html',
        title: 'Contattaci',
        content: '<h1>Contattaci</h1><p>Scrivici per maggiori informazioni.</p>',
    },
];

// Scrivere i file HTML in una cartella separata
pagesConfig.forEach(({ filename, title, content }) => {
    const filePath = path.join(publicDir, filename);
    const pageContent = `
        <!DOCTYPE html>
        <html lang="it">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/chi-siamo">Chi Siamo</a></li>
                    <li><a href="/cosa-facciamo">Cosa Facciamo</a></li>
                    <li><a href="/contatti">Contatti</a></li>
                </ul>
            </nav>
            ${content}
        </body>
        </html>
    `;
    fs.writeFileSync(filePath, pageContent);
    console.log(`Pagina creata: ${filename}`);
});

// Stile CSS di base (modifica o aggiungi uno stile personalizzato)
const cssContent = `
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
}

nav ul {
    list-style-type: none;
    padding: 0;
    background-color: #333;
}

nav ul li {
    display: inline-block;
}

nav ul li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 20px;
    text-decoration: none;
}

nav ul li a:hover {
    background-color: #575757;
}
`;

fs.writeFileSync(path.join(cssDir, 'styles.css'), cssContent);
console.log('CSS creato.');

app.use(express.static(publicDir));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'home.html'));
});

app.get('/chi-siamo', (req, res) => {
    res.sendFile(path.join(publicDir, 'chi-siamo.html'));
});

app.get('/cosa-facciamo', (req, res) => {
    res.sendFile(path.join(publicDir, 'cosa-facciamo.html'));
});

app.get('/contatti', (req, res) => {
    res.sendFile(path.join(publicDir, 'contatti.html'));
});

app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});

