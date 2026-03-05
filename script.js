document.addEventListener('DOMContentLoaded', ()=>{
  const starterChecks = Array.from(document.querySelectorAll('input[name="starter"]'));
  const form = document.getElementById('inviteForm');
  const result = document.getElementById('result');
  const summaryText = document.getElementById('summaryText');
  const copyBtn = document.getElementById('copyBtn');
  const resetBtn = document.getElementById('resetBtn');
  const submitBtn = document.getElementById('submitBtn');

  function countChecked(){
    return starterChecks.filter(c=>c.checked).length;
  }

  starterChecks.forEach(cb=>{
    cb.addEventListener('change',(e)=>{
      const checked = countChecked();
      if(checked>2){
        e.target.checked = false;
        showNotification('Please select exactly 2 starters total.', 'warn');
      }
    });
  });

  function showNotification(msg, type='info'){
    // Simple alert for now; can be enhanced with toast UI
    if(type === 'warn') alert('⚠️ ' + msg);
    else if(type === 'error') alert('❌ ' + msg);
    else alert('ℹ️ ' + msg);
  }

  form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // validation
    const drink = document.querySelector('input[name="drink"]:checked');
    const starters = starterChecks.filter(c=>c.checked).map(c=>c.value);
    const main = document.querySelector('input[name="main"]:checked');
    const dessert = document.querySelector('input[name="dessert"]:checked');
    const name = document.getElementById('guestName').value.trim();
    const attending = document.querySelector('input[name="attending"]:checked');
    const contact = document.getElementById('contact').value.trim();
    const guests = document.getElementById('guests').value;
    const notes = document.getElementById('notes').value.trim();

    if(!drink){ showNotification('Please choose a drink.', 'error'); submitBtn.disabled = false; submitBtn.textContent = 'Submit RSVP & Choices'; return; }
    if(starters.length!==2){ showNotification('Please choose exactly 2 starters.', 'error'); submitBtn.disabled = false; submitBtn.textContent = 'Submit RSVP & Choices'; return; }
    if(!main){ showNotification('Please choose a main course.', 'error'); submitBtn.disabled = false; submitBtn.textContent = 'Submit RSVP & Choices'; return; }
    if(!dessert){ showNotification('Please choose a dessert.', 'error'); submitBtn.disabled = false; submitBtn.textContent = 'Submit RSVP & Choices'; return; }
    if(!attending){ showNotification('Please indicate your attendance.', 'error'); submitBtn.disabled = false; submitBtn.textContent = 'Submit RSVP & Choices'; return; }

    // build summary
    let lines = [];
    lines.push('═══════════════════════════════');
    lines.push('       IFTAR RSVP SUMMARY');
    lines.push('═══════════════════════════════');
    lines.push('');
    if(name) lines.push(`Guest: ${name}`);
    lines.push(`Status: ${attending.value}`);
    lines.push(`Number of Guests: ${guests}`);
    if(contact) lines.push(`Contact: ${contact}`);
    lines.push('');
    lines.push('📋 MENU SELECTIONS:');
    lines.push(`  🥤 Drink: ${drink.value}`);
    lines.push(`  🍟 Starters: ${starters.join(', ')}`);
    lines.push(`  🍲 Main: ${main.value}`);
    lines.push(`  🍰 Dessert: ${dessert.value}`);
    if(notes) lines.push(`  📝 Notes: ${notes}`);
    lines.push('');
    lines.push('═══════════════════════════════');
    lines.push('Date: March 11, 2026');
    lines.push('Thank you for RSVPing!');
    lines.push('═══════════════════════════════');

    const text = lines.join('\n');
    summaryText.textContent = text;
    result.classList.remove('hidden');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit RSVP & Choices';
    result.scrollIntoView({behavior:'smooth'});

    // Attempt to POST to a local RSVP server if available
    const payload = {
      eventDate: '2026-03-11',
      name: name || null,
      contact: contact || null,
      attending: attending.value,
      guests: Number(guests) || 1,
      notes: notes || null,
      choices: {
        drink: drink.value,
        starters: starters,
        main: main.value,
        dessert: dessert.value
      },
      timestamp: new Date().toISOString()
    };

    const serverUrl = 'http://localhost:3000/rsvp';
    fetch(serverUrl, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    }).then(r=>{
      if(r.ok){
        copyBtn.textContent = '✓ Saved to server';
        setTimeout(()=> copyBtn.textContent = '📋 Copy as text', 2200);
      }else{
        console.warn('Server rejected RSVP', r.status);
      }
    }).catch(err=>{
      console.info('RSVP server not reachable at', serverUrl);
    });
  });

  copyBtn.addEventListener('click', async ()=>{
    const text = summaryText.textContent || '';
    try{
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = '✓ Copied!';
      setTimeout(()=> copyBtn.textContent = '📋 Copy as text', 1800);
    }catch(e){
      alert('Copy failed. Please select and copy the text manually.');
    }
  });

  resetBtn.addEventListener('click', ()=>{
    form.reset();
    result.classList.add('hidden');
    summaryText.textContent = '';
    window.scrollTo({top:0, behavior:'smooth'});
  });
});
