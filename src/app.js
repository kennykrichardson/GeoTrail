import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const DATA_URL = '/data/tourism-records.json';
const COUNTRY_META = {
  'Indian Tourism': { label:'India', flag:'🇮🇳', center:[22.5,79], zoom:4.6, bounds:[[6,67],[37,98]] },
  'Japan Tourism': { label:'Japan', flag:'🇯🇵', center:[36.2,138], zoom:5, bounds:[[24,122],[46,146]] },
  'England Tourism': { label:'England', flag:'🇬🇧', center:[52.8,-1.8], zoom:6, bounds:[[49.7,-6.5],[55.9,2.2]] },
  'American Tourism': { label:'United States', flag:'🇺🇸', center:[39,-98], zoom:3.7, bounds:[[24,-126],[50, -66]] }
};
// Coordinates are explicit geographic anchors for the location labels in the bundled dataset.
const GEO = {
  'India Tourism Signal':[22.5,79], 'Andhra Pradesh':[15.9,79.7], 'Arunachal Pradesh':[28.2,94.7], Assam:[26.2,92.9], Bihar:[25.9,85.3], Goa:[15.3,74], Gujarat:[22.3,71.7], 'Himachal Pradesh':[31.1,77.2], Karnataka:[15.3,75.7], Kerala:[10.5,76.2], 'Madhya Pradesh':[23.5,78.5], Maharashtra:[19.7,75.7], Meghalaya:[25.5,91.3], Odisha:[20.9,84.5], Punjab:[31,75.3], Rajasthan:[26.8,73.8], Sikkim:[27.5,88.5], 'Tamil Nadu':[11.1,78.7], Telangana:[17.9,79.1], 'Uttar Pradesh':[27,80.8], Uttarakhand:[30.1,79], 'West Bengal':[23.5,87.8],
  Tokyo:[35.6762,139.6503], Kyoto:[35.0116,135.7681], Osaka:[34.6937,135.5023], Nara:[34.6851,135.8048], Nagoya:[35.1815,136.9066], Okinawa:[26.2124,127.6809], Sapporo:[43.0618,141.3545], Hakone:[35.2324,139.1069], Yokohama:[35.4437,139.638], Hiroshima:[34.3853,132.4553], 'Mount Fuji':[35.3606,138.7274], Fukuoka:[33.5904,130.4017], Sendai:[38.2682,140.8694],
  London:[51.5072,-.1276], Manchester:[53.4808,-2.2426], Liverpool:[53.4084,-2.9916], Birmingham:[52.4862,-1.8904], Bath:[51.3811,-2.359], Oxford:[51.752,-1.2577], Cambridge:[52.2053,.1218], Brighton:[50.8225,-.1372], Cornwall:[50.266,-5.0527], 'Lake District':[54.4609,-3.0886], Newcastle:[54.9783,-1.6178], York:[53.959,-1.0815], Bristol:[51.4545,-2.5879], Leeds:[53.8008,-1.5491], Nottingham:[52.9548,-1.1581], 'British Museum':[51.5194,-.127], 'Tower Bridge':[51.5055,-.0754],
  California:[36.7783,-119.4179], Utah:[39.321,-111.0937], Arizona:[34.0489,-111.0937], Florida:[27.6648,-81.5158], Brooklyn:[40.6782,-73.9442], Central:[39.5,-98.35], Empire:[40.7484,-73.9857], Nevada:[38.8026,-116.4194], Mount:[37.8651,-119.5383], Niagara:[43.0962,-79.0377], Colorado:[39.5501,-105.7821], Washington:[47.7511,-120.7401], Statue:[40.6892,-74.0445], Times:[40.758,-73.9855], Wyoming:[43.076,-107.2903]
};
const $ = id => document.getElementById(id);
const state = { dataset:'All', location:'All', theme:'All', behavior:'All', search:'' };
let records=[], map, markerLayer, chart, toastTimer;
let streamTimer=null, streamIndex=0, feedRows=[];
const fmt = n => Number(n||0).toLocaleString('en-US');
const avg = (rows,key) => rows.length ? rows.reduce((s,r)=>s+Number(r[key]||0),0)/rows.length : 0;
const escapeHTML = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function notify(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2300)}
function countryLabel(ds){return COUNTRY_META[ds]?.label||'Global'}
function filteredRows(){return records.filter(r=>(state.dataset==='All'||r.dataset===state.dataset)&&(state.location==='All'||r.location===state.location)&&(state.theme==='All'||r.theme===state.theme)&&(state.behavior==='All'||r.behavior===state.behavior)&&(!state.search||[r.title,r.description,r.location,r.theme,r.behavior,r.dataset,...(r.tags||[])].join(' ').toLowerCase().includes(state.search.toLowerCase())))}
function groupBy(rows,key){const m=new Map();rows.forEach(r=>{const k=r[key]||'Unclassified';m.set(k,(m.get(k)||[]).concat(r))});return [...m].map(([name,items])=>({name,items,count:items.length,avgFaves:avg(items,'faves'),avgSentiment:avg(items,'sentiment')})).sort((a,b)=>b.count-a.count)}
function fillSelect(id,values,placeholder){const el=$(id),old=el.value;el.innerHTML=`<option value="All">${placeholder}</option>`+values.map(v=>`<option value="${escapeHTML(v)}">${escapeHTML(v)}</option>`).join('');el.value=values.includes(old)?old:'All'}
function refreshOptions(){const base=records.filter(r=>state.dataset==='All'||r.dataset===state.dataset);fillSelect('locationFilter',[...new Set(base.map(r=>r.location))].sort(),'Everywhere');fillSelect('themeFilter',[...new Set(base.map(r=>r.theme))].sort(),'All themes');fillSelect('behaviorFilter',[...new Set(base.map(r=>r.behavior))].sort(),'All profiles');$('locationFilter').value=state.location;$('themeFilter').value=state.theme;$('behaviorFilter').value=state.behavior}
function initMap(){map=L.map('tourismMap',{scrollWheelZoom:false,zoomControl:true,worldCopyJump:true}).setView([24,35],2);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'}).addTo(map);markerLayer=L.layerGroup().addTo(map);map.on('click',e=>$('mapCoordinates').textContent=`${e.latlng.lat.toFixed(3)}° / ${e.latlng.lng.toFixed(3)}°`)}
function drawMap(rows){markerLayer.clearLayers();const groups=groupBy(rows,'location');const mapped=groups.map(g=>({...g,coords:GEO[g.name]})).filter(g=>g.coords);groups.filter(g=>!g.coords).forEach(g=>console.warn('No map coordinate configured for location:',g.name));const max=Math.max(1,...mapped.map(g=>g.count));mapped.forEach(g=>{const size=9+Math.round(g.count/max*10);const icon=L.divIcon({className:'',html:`<span class="map-marker" style="width:${size+12}px;height:${size+12}px"><i></i></span>`,iconSize:[size+12,size+12],iconAnchor:[(size+12)/2,(size+12)/2]});const marker=L.marker(g.coords,{icon}).bindPopup(`<div class="map-popup"><b>${escapeHTML(g.name)}</b><span>${fmt(g.count)} travel records · ${fmt(Math.round(g.items.reduce((s,r)=>s+Number(r.faves||0),0)))} favourites</span><small>${escapeHTML(countryLabel(g.items[0].dataset).toUpperCase())} · ${g.avgSentiment.toFixed(1)} SENTIMENT</small></div>`);marker.addTo(markerLayer);marker.on('click',()=>{$('mapCoordinates').textContent=`${g.coords[0].toFixed(3)}° / ${g.coords[1].toFixed(3)}°`;$('mapFootnote').textContent=`${g.name} · ${fmt(g.count)} records · ${g.avgSentiment.toFixed(1)} average sentiment`})});const datasets=state.dataset==='All'?Object.keys(COUNTRY_META):[state.dataset];if(state.dataset==='All'){map.setView([27,35],2,{animate:true});$('mapTitle').textContent='Global destination atlas';$('mapSubtitle').textContent=`${mapped.length} mapped location signals · Four country collections`;$('mapCoordinates').textContent='GLOBAL VIEW · 27° N / 35° E'}else{const meta=COUNTRY_META[state.dataset];map.fitBounds(meta.bounds,{padding:[20,20],maxZoom:meta.zoom+1,animate:true});$('mapTitle').textContent=`${meta.label} destination atlas`;$('mapSubtitle').textContent=`${mapped.length} mapped location signals · ${meta.flag} ${meta.label}`;$('mapCoordinates').textContent=`${meta.label.toUpperCase()} · ${meta.center[0].toFixed(1)}° / ${meta.center[1].toFixed(1)}°`}$('mapFootnote').textContent='Select a marker to inspect destination activity';setTimeout(()=>map.invalidateSize(),100)}
function drawChart(groups){const data=groups.slice(0,9);if(chart)chart.destroy();chart=new Chart($('attentionChart'),{type:'bar',data:{labels:data.map(x=>x.name),datasets:[{data:data.map(x=>x.count),backgroundColor:data.map((_,i)=>i===0?'#DC143C':'#DC143C'),borderRadius:2,borderSkipped:false,maxBarThickness:25}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#171717',titleColor:'#FFFDF6',bodyColor:'#FFFDF6',padding:11,displayColors:false,callbacks:{label:c=>`${fmt(c.raw)} records`}}},scales:{x:{beginAtZero:true,grid:{color:'rgba(23,23,23,.08)'},ticks:{color:'#171717',font:{family:'DM Mono',size:9}}},y:{grid:{display:false},ticks:{color:'#171717',font:{family:'DM Sans',size:10}}}}}})}
function drawThemes(groups){$('themeList').innerHTML=groups.slice(0,7).map((g,i)=>`<div class="theme-row"><label title="${escapeHTML(g.name)}">${escapeHTML(g.name)}</label><div class="theme-track"><i style="width:${Math.max(2,g.count/(groups[0]?.count||1)*100)}%"></i></div><b>${fmt(g.count)}</b></div>`).join('')||'<div class="empty-state">No theme signals in this selection.</div>'}
function drawBehaviors(groups,total){$('behaviorGrid').innerHTML=groups.slice(0,8).map((g,i)=>`<article class="behavior-card" tabindex="0" role="button" data-behavior="${escapeHTML(g.name)}"><span class="number">PROFILE / 0${i+1}</span><strong>${Math.round(g.count/Math.max(total,1)*100)}%</strong><h4>${escapeHTML(g.name)}</h4><p>${fmt(g.count)} records · ${g.avgSentiment.toFixed(1)} sentiment average</p></article>`).join('')||'<div class="empty-state">No visitor profiles match the current filters.</div>';document.querySelectorAll('.behavior-card').forEach(card=>{const apply=()=>{state.behavior=card.dataset.behavior;$('behaviorFilter').value=state.behavior;render()};card.addEventListener('click',apply);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();apply()}})})}
function pushStreamItem(record){
  const host=$('liveFeed');
  if(!host)return;
  const node=document.createElement('div');
  node.className='feed-item feed-item-new';
  node.innerHTML=`
    <span class="feed-number">${String((streamIndex%Math.max(feedRows.length,1))+1).padStart(2,'0')}</span>
    <div class="feed-copy">
      <b>${escapeHTML(record.title||record.location||'New tourism signal')}</b>
      <small>${escapeHTML(record.location||'Unclassified')} · ${escapeHTML(record.theme||'General')} · ${escapeHTML(countryLabel(record.dataset))}</small>
    </div>
    <span class="feed-score">♡ ${fmt(Math.round(record.faves||0))}</span>
  `;
  host.prepend(node);
  while(host.children.length>8)host.lastElementChild.remove();
}

function drawFeed(rows){
  if(streamTimer){clearInterval(streamTimer);streamTimer=null;}
  streamIndex=0;
  const host=$('liveFeed');
  const buckets=new Map();

  // Interleave records by destination so the live stream keeps surfacing
  // different locations instead of exhausting one location at a time.
  rows.forEach(record=>{
    const location=record.location||'Unclassified';
    if(!buckets.has(location))buckets.set(location,[]);
    buckets.get(location).push(record);
  });

  const locations=[...buckets.values()];
  locations.forEach(list=>list.sort((a,b)=>Number(b.faves||0)-Number(a.faves||0)));
  feedRows=[];
  const longest=Math.max(0,...locations.map(list=>list.length));
  for(let index=0;index<longest;index++){
    locations.forEach(list=>{if(list[index])feedRows.push(list[index]);});
  }

  if(!host)return;
  host.innerHTML='';
  if(!feedRows.length){
    host.innerHTML='<div class="empty-state">No records match these filters.</div>';
    return;
  }

  // Seed the panel with the first few entries, then keep adding one new
  // location signal at a time, matching the old GeoTrail live-feed behavior.
  const initialCount=Math.min(8,feedRows.length);
  for(let i=0;i<initialCount;i++){
    streamIndex=i;
    pushStreamItem(feedRows[i]);
  }
  streamIndex=initialCount;

  if(feedRows.length>initialCount){
    streamTimer=setInterval(()=>{
      const record=feedRows[streamIndex%feedRows.length];
      pushStreamItem(record);
      streamIndex+=1;
    },1200);
  }
}
function drawInsights(rows,locations,themes){const high=[...rows].sort((a,b)=>Number(b.faves||0)-Number(a.faves||0))[0];const best=locations[0],theme=themes[0];const insights=[];if(best)insights.push(['01','Attention gathers',`${best.name} leads this selection with ${fmt(best.count)} records, representing ${Math.round(best.count/Math.max(rows.length,1)*100)}% of the current collection.`]);if(theme)insights.push(['02','A defining travel theme',`${theme.name} is the most represented theme, appearing in ${fmt(theme.count)} records.`]);if(high)insights.push(['03','A standout signal',`“${high.title}” has the highest recorded appreciation in this view, with ${fmt(Math.round(high.faves))} favourites.`]);insights.push(['04','Read the context','These observations describe the supplied records. They are useful directional signals, not proof of causation or a forecast of future demand.']);$('insightList').innerHTML=insights.map(x=>`<div class="insight-item"><span>${x[0]}</span><div><b>${escapeHTML(x[1])}</b><p>${escapeHTML(x[2])}</p></div></div>`).join('')}
function render(){const rows=filteredRows(),locations=groupBy(rows,'location'),themes=groupBy(rows,'theme'),behaviors=groupBy(rows,'behavior');$('metricRecords').textContent=fmt(rows.length);$('metricFaves').textContent=fmt(Math.round(rows.reduce((s,r)=>s+Number(r.faves||0),0)));const sentiment=avg(rows,'sentiment');$('metricSentiment').textContent=`${sentiment.toFixed(1)}%`;$('sentimentBar').style.width=`${Math.max(0,Math.min(100,sentiment))}%`;$('metricLocations').textContent=fmt(new Set(rows.map(r=>r.location)).size);drawMap(rows);drawChart(locations);drawThemes(themes);drawBehaviors(behaviors,rows.length);drawFeed(rows);drawInsights(rows,locations,themes);}
function setDataset(ds){state.dataset=ds;state.location='All';state.theme='All';state.behavior='All';$('countryFilter').value=ds;document.querySelectorAll('.country-choice').forEach(b=>b.classList.toggle('active',b.dataset.country===ds));refreshOptions();render()}
function exportData(){const rows=filteredRows();const blob=new Blob([JSON.stringify({generatedAt:new Date().toISOString(),createdBy:'Kenny Richardson',project:'GeoTrail',filters:state,recordCount:rows.length,records:rows},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='geotrail-tourism-intelligence.json';a.click();URL.revokeObjectURL(url);notify(`Exported ${fmt(rows.length)} records`)}
function setupTopbarExtras(){
  const topbar=document.querySelector('.topbar'),filterBar=document.querySelector('.filter-bar');
  if(topbar&&filterBar&&filterBar.parentElement===topbar.parentElement)topbar.insertAdjacentElement('afterend',filterBar);
  const livePill=document.querySelector('.topbar-right .live-pill');
  if(livePill&&!document.querySelector('.github-top-link')){
    const link=document.createElement('a');link.className='github-top-link';
    link.href='https://github.com/kennykrichardson';link.target='_blank';link.rel='noopener noreferrer';
    link.setAttribute('aria-label','Visit Kenny Richardson on GitHub');
    link.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.75 2.15 3.25 1.63.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg><span>GITHUB</span>';
    livePill.insertAdjacentElement('afterend',link);
  }
}
function bind(){setupTopbarExtras();document.querySelectorAll('.country-choice').forEach(b=>b.addEventListener('click',()=>setDataset(b.dataset.country)));$('countryFilter').addEventListener('change',e=>setDataset(e.target.value));[['locationFilter','location'],['themeFilter','theme'],['behaviorFilter','behavior']].forEach(([id,key])=>$(id).addEventListener('change',e=>{state[key]=e.target.value;render()}));$('searchInput').addEventListener('input',e=>{state.search=e.target.value;render()});$('resetFilters').addEventListener('click',()=>{state.location=state.theme=state.behavior='All';state.search='';$('searchInput').value='';refreshOptions();render();notify('Filters reset')});$('exportBtn').addEventListener('click',exportData);$('fitMap').addEventListener('click',()=>{if(state.dataset==='All')map.setView([27,35],2);else map.fitBounds(COUNTRY_META[state.dataset].bounds,{padding:[20,20]})});$('mobileMenu').addEventListener('click',()=>$('sidebar').classList.toggle('open'));document.querySelectorAll('.nav-link').forEach(a=>a.addEventListener('click',()=>{$('sidebar').classList.remove('open');document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));a.classList.add('active')}));}
async function boot(){try{$('todayLabel').textContent=new Intl.DateTimeFormat('en',{dateStyle:'medium'}).format(new Date()).toUpperCase();const response=await fetch(DATA_URL);if(!response.ok)throw new Error(`Dataset request failed (${response.status})`);records=await response.json();if(!Array.isArray(records)||!records.length)throw new Error('Tourism dataset is empty or invalid');initMap();bind();refreshOptions();render();if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('/service-worker.js').catch(()=>{});}catch(error){console.error(error);$('metricRecords').textContent='DATA ERROR';$('liveFeed').innerHTML=`<div class="empty-state">GeoTrail could not load its dataset. ${escapeHTML(error.message)}</div>`;notify('Unable to load GeoTrail data')}}
boot();
