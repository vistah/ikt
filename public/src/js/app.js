if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(reg => console.log(reg))
        .catch(err => console.log(err));
}

/*Aufgabe 3*/
var button = document.querySelector('#start-button');
var output = document.querySelector('#output');

button.addEventListener('click', event => {


//Teil 1
        new Promise((resolve, reject) => {
             let condition = true;

             if (condition) {
                 setTimeout(() => resolve("https://httpbin.org/ip"), 1000);
             } else {
                 setTimeout(() => reject(new Error("Das ist schlecht")), 1000);
             }
         })
            .then
             (
                 url => {
                     return fetch(url, {
                         method: 'GET',
                         headers: {
                             'Content-Type': 'application/json',
                             'Accept': 'application/json'
                         }
                     });
                 }
             )
             .then(
                 response => {
                     console.log(response);
                     return response.json();
                 }
             )
             .then(
                 data => {
                     console.log(data);
                     document.getElementById('output').textContent = data.origin;
                 }
             )
             .catch(
                 error => console.log(error)
             );
//Teil 2
        /*new Promise((resolve, reject) => {
            let condition = true;

            if (condition) {
                setTimeout(() => resolve("https://httpbin.org/put"), 1000);
            } else {
                setTimeout(() => reject(new Error("Das ist schlecht")), 1000);
            }
        })
            .then
            (
                url => {
                    return fetch(url, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            title: 'FIW!',
                            user: 3
                        })
                    });
                }
            )
            .then(
                response => {
                    console.log(response);
                    return response.json();
                }
            )
            .then(
                data => {
                    console.log(data);
                    document.getElementById('output').textContent = data.title;
                }
            )
            .catch(
                error => console.log(error)
            );*/


// Teil 1: DONE

// Behandeln Sie die "response" der Promise und geben Sie ein fetch() zurueck
// darin wird der Wert uebergeben, der "resolved" wurde (die Url)
// das fetch() ist hier ein GET, Sie muessen deshalb nichts weiter angeben

// Behandeln Sie nun auch diese "response" des fetch()-Aufrufes indem Sie
// die response als JSON-Daten zurueckgeben (json())

// die JSON-Daten haben die Form: { "origin": "Ihre IP-Adresse" }

// Behandeln Sie diese JSON-Daten, indem Sie den Wert von "origin" in das
// "output"-Element schreiben (output.textContent =  data.origin;)

// Teil 2:

// Wiederholen Sie diese Uebung mit einem PUT request an
// diese url: https://httpbin.org/put

// dazu müssen Sie nun die Methode dem fetch()-Aufruf angeben
// ausserdem muss fuer headers jetzt auch der Content-Type und Accept
// angegeben werden (jeweils 'application/json')

// Sie koennen ein beliebiges JSON senden (body), es wird einfach gespiegelt
// wichtig ist nur, dass Sie die Eigenschaften kennen, damit Sie auf die
// Werte zugreifen koennen --> uebergeben Sie einen oder mehrere Werte
// an das output-Element

// Teil 3:

// fuegen Sie irgendwo einen Fehler ein, so dass die Anfrage nicht
// erfolgreich ist (z.B. einfach die Url aendern)
// Behandeln Sie diesen Fehler (einmal als zweites Argument von then()
// und einmal mit catch() --> einfach Ausgabe auf Konsole)
})
;
