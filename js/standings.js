```javascript
fetch("data/results.json")
  .then(r => r.json())
  .then(results => {

    let table = {};

    results.forEach(g => {
      if (!table[g.home]) table[g.home] = {w:0,l:0};
      if (!table[g.away]) table[g.away] = {w:0,l:0};

      if (g.homeScore > g.awayScore) {
        table[g.home].w++;
        table[g.away].l++;
      } else {
        table[g.away].w++;
        table[g.home].l++;
      }
    });

    let ranking = Object.entries(table).map(([team, stats]) => {
      let games = stats.w + stats.l;
      let pct = games ? (stats.w / games).toFixed(3) : 0;
      return {team, ...stats, pct};
    });

    ranking.sort((a,b) => b.pct - a.pct);

    const el = document.getElementById("table");

    ranking.forEach(t => {
      el.innerHTML += `<tr>
        <td>${t.team}</td>
        <td>${t.w}</td>
        <td>${t.l}</td>
        <td>${t.pct}</td>
      </tr>`;
    });
  });
```
