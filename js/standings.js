```javascript
Promise.all([
  fetch("data/results.json").then(r => r.json()),
  fetch("data/teams.json").then(r => r.json())
])
.then(([results, teams]) => {

  let table = {};

  teams.forEach(t => {
    table[t.name] = {
      w:0,
      l:0,
      conference: t.conference,
      division: t.division
    };
  });

  results.forEach(g => {
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

  // Trier par conférence puis %
  ranking.sort((a,b) => {
    if (a.conference !== b.conference) {
      return a.conference.localeCompare(b.conference);
    }
    return b.pct - a.pct;
  });

  const el = document.getElementById("table");

  let currentConf = "";

  ranking.forEach(t => {

    if (t.conference !== currentConf) {
      currentConf = t.conference;
      el.innerHTML += `<tr><td colspan="5"><b>${currentConf} Conference</b></td></tr>`;
    }

    el.innerHTML += `<tr>
      <td>${t.team}</td>
      <td>${t.w}</td>
      <td>${t.l}</td>
      <td>${t.pct}</td>
    </tr>`;
  });
});
```
