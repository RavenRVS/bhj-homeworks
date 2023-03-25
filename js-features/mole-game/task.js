let killCount;
let looseCount;
( newGame = () => {
    killCount = 0;
    looseCount = 0;
    document.getElementById('dead').textContent = killCount;
    document.getElementById('lost').textContent = looseCount;
}) ();

getHole = index => document.getElementById(`hole${index}`);
for (let i = 1; i < 10; i++) {
    getHole(i).onclick = () => {
        if (getHole(i).classList.contains('hole_has-mole')) {
            killCount++;
            document.getElementById('dead').textContent = killCount;
            if (killCount >= 10) {
                alert("Вы победили!")
                newGame()
            }
        } else {
            looseCount++;
            document.getElementById('lost').textContent = looseCount;
            if (looseCount >= 5) {
                alert("Вы проиграли!");
                newGame()
            }
        }
    }
}