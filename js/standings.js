Promise.all([
 fetch("data/results.json").then(r=>r.json()),
 fetch("data/teams.json").then(r=>r.json())
]).then(([results,teams])=>{

let table={};
teams.forEach(t=>table[t.name]={w:0,l:0});

results.forEach(g=>{
 if(g.homeScore>g.awayScore){table[g.home].w++;table[g.away].l++;}
 else{table[g.away].w++;table[g.home].l++;}
});

let ranking=Object.entries(table).map(([team,s])=>{
 let pct=(s.w/(s.w+s.l)||0).toFixed(3);
 return {team,...s,pct};
}).sort((a,b)=>b.pct-a.pct);

const el=document.getElementById("table");
el.innerHTML=`<tr><th>#</th><th>Team</th><th>W</th><th>L</th><th>%</th></tr>`;

ranking.forEach((t,i)=>{
 el.innerHTML+=`<tr class="row">
  <td>${i+1}</td>
  <td>${t.team} ${i<4?'<span class="badge">PO</span>':''}</td>
  <td>${t.w}</td>
  <td>${t.l}</td>
  <td>${t.pct}</td>
 </tr>`;
});
});
