const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({limit: '100kb'}));

const DATA_DIR = path.resolve(__dirname);
const CSV_PATH = path.join(DATA_DIR, 'responses.csv');

function ensureHeader(){
  if(!fs.existsSync(CSV_PATH)){
    const header = ['timestamp','eventDate','name','contact','attending','guests','notes','drink','starters','main','dessert'].join(',') + '\n';
    fs.writeFileSync(CSV_PATH, header, {encoding:'utf8'});
  }
}

app.post('/rsvp', (req, res)=>{
  try{
    const body = req.body || {};
    ensureHeader();
    const row = [
      body.timestamp || new Date().toISOString(),
      body.eventDate || '',
      (body.name||'').replace(/\n|,/g,' '),
      (body.contact||'').replace(/\n|,/g,' '),
      body.attending || '',
      body.guests || 0,
      (body.notes||'').replace(/\n|,/g,' '),
      (body.choices?.drink||'').replace(/\n|,/g,' '),
      '"'+(Array.isArray(body.choices?.starters)? body.choices.starters.join(' | ').replace(/"/g,'""') : '')+'"',
      (body.choices?.main||'').replace(/\n|,/g,' '),
      (body.choices?.dessert||'').replace(/\n|,/g,' ')
    ].join(',') + '\n';
    fs.appendFileSync(CSV_PATH, row, {encoding:'utf8'});
    return res.status(200).json({ok:true,message:'RSVP saved'});
  }catch(err){
    console.error('Error saving RSVP', err);
    return res.status(500).json({ok:false,message:'failed',error:err.message});
  }
});

app.get('/responses.csv', (req,res)=>{
  ensureHeader();
  res.download(CSV_PATH, 'responses.csv');
});

app.get('/responses', (req,res)=>{
  try{
    ensureHeader();
    const csv = fs.readFileSync(CSV_PATH, 'utf8');
    // simple parse to array of objects (skip header)
    const [headerLine,...lines] = csv.split('\n');
    const headers = headerLine.split(',');
    const items = lines.filter(Boolean).map(l=>{
      // naive split - keeps the starters field quoted as one
      const cols = l.split(',');
      return headers.reduce((acc,h,i)=>{ acc[h]=cols[i]||''; return acc },{});
    });
    res.json({count:items.length, items});
  }catch(err){
    res.status(500).json({ok:false,error:err.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log(`RSVP server listening on http://localhost:${PORT}`);
});
