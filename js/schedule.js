fetch("data/results.json")
.then(r=>r.json())
.then(data=>{
 const div=document.getElementById("games");
 data.forEach(g=>{
  div.innerHTML+=`
   <div class="match-card">
     <div class="team">${g.home}</div>
     <div class="score">${g.homeScore} - ${g.awayScore}</div>
     <div class="team">${g.away}</div>
   </div>`;
 });
});
