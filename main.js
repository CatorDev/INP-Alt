"use strict";

// packages
var http = require('http')
, path = require('path')
, fs = require('fs');
//


// csv data
const csv_data = fs.readFileSync("products.csv", "UTF8");

const raw_product_data = csv_data.split("\n");
raw_product_data.shift(); // entfernt die Header (Beschreibung usw)

const recordToHTML = record => 
{ // wandelt in HTML um

    const fields = record.split(","); // trennt die Daten mit Kommas damit man sie einzelt nutzen kann

    

    return data;
}  

const final_product_data = raw_product_data
    .filter(row => row !== "")
    .map(recordToHTML);
console.log("[INFO] CSV Daten erstellt");
//

// read html & css data
var html_output;
var css_output;


/*
fs.readFile('hauptseite.html', function(err, data) {
    if(err)
    {
        throw err;
    }
    html_output = data
});

fs.readFile('hauptseite.css', function(err, data) {
    if(err)
    {
        throw err;
    }
    css_output = data;
})
*/
//

// create server
const request_listener = function (req,res)
{
    switch (req.url) 
    {
        case '/':
            html_output = fs.readFileSync('hauptseite.html');
            css_output = fs.readFileSync('hauptseite.css');
            break;
        case '/kategorie_alltag.html':
            html_output = fs.readFileSync('kategorie_alltag.html');
            css_output = fs.readFileSync('kategorien.css');
            break;
        case '/kategorie_technik.html':
            html_output = fs.readFileSync('kategorie_technik.html');
            css_output = fs.readFileSync('kategorien.css');
            break;
        case '/produkt_tasse.html':
            html_output = fs.readFileSync('produkt_tasse.html');
            css_output = fs.readFileSync('produkte.css');
            break;
        case '/produkt_rx5600xt.html':
            html_output = fs.readFileSync('produkt_rx5600xt.html');
            css_output = fs.readFileSync('produkte.css');
            break;
        default:
            break;
    }

    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(html_output);

    if(css_output)
    {
        res.writeHead(200, {"Content-Type": "text/css"});
        res.write(css_output);
    }

    res.end();
}

let port = 8080;
let hostname = "localhost";

const server = http.createServer(request_listener);
server.listen(port, hostname, () => {
    console.log(`[INFO] Server running at http://${hostname}:${port}/`);
  });
//