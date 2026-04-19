```javascript
fetch("data/schedule.json")
  .then(r => r.json())
  .then(data => {
    const div = document.getElementById("games");
    data.forEach(g => {
      div.innerHTML += `<p>${g.home} vs ${g.away}</p>`;
    });
  });
```
