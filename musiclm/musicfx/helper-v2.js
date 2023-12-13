const numPerPage = 5;

const paintings = [
  'dali',
  'dance',
  'guernica',
  'kiss',
  'napoleon',
  'scream',
  'the_starry_night',
  'wanderer',
];

const richCaptions = [
  'electreggaeton',
  'epic',
  'greg',
  'meditation',
  'reggae',
  'synth',
  'techno-strings',
];

const loopingCaptions = [
  'indie',
  'jazz',
  'guitars',
  'elevator',
  'reggae',
  'cumbia',
];

const greatestHits = [
  'A synth-driven melody with a retro 80s vibe, evoking nostalgia and danceable energy',
  'An exciting and exhilarating piece that builds suspense and anticipation',
  'Deep bass house music with arpeggiated synth sounds and snare drums',
  'Electric guitar solo soulful almost spiritual plays with a quiet audience',
  'Funk bass with a hard baseline an a rhythm that is contagious and makes you dance',
  'A heroic melody played on a powerful brass section, conveying a sense of triumph and unwavering determination',
  'Death metal song',
  'A jazz song with a modern style',
  'A medieval folk song with acoustic guitars and flutes',
  'A violin melody that dances playfully around the piano notes, creating a light and airy atmosphere',
  'A whimsical melody played on the xylophone, creating a light and playful atmosphere',
]

function createAudioHTML(path, loop=false) {
  const loop_str = (loop) ? "loop" : "";
  return `<audio controls controlslist="nodownload noplaybackrate" ${loop_str} class="px-1"> <source src=${path} type="audio/wav"></audio>`;
}

async function getText(file) {
  console.log('Fetching' + file);
  const myObject = await fetch(file);
  const myText = await myObject.text();
  return myText;
}

async function insertText(file, cell) {
  cell.innerHTML = await getText(file);
}

function clearTable(table) {
  let nrRows = table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    table.deleteRow(1);
  }
}

async function generatePaintingsTable(tableId, filenames, page) {
  const numPerPage = 3;
  const prefix = `audio_samples/${tableId}/`;
  let table = document.getElementById(tableId);
  clearTable(table);
  const end_idx = Math.min(page * numPerPage, filenames.length);
  for (let i = (page - 1) * numPerPage; i < end_idx; i++) {
    let row = table.insertRow(i % numPerPage + 1);
    let title = await getText(prefix + filenames[i] + '.title');
    let prompt = await getText(prefix + filenames[i] + '.txt');
    let cell = row.insertCell(0);
    cell.innerHTML = `<img src="${prefix}${filenames[i]}.jpg"><br><b>${title}</b><br>${prompt}`
    cell = row.insertCell(1);
    cell.innerHTML = createAudioHTML(`${prefix}/1/${filenames[i]}.wav`);
    cell = row.insertCell(2);
    cell.innerHTML = createAudioHTML(`${prefix}/2/${filenames[i]}.wav`);
  }
}

function generateTable(tableId, filenames, page, sxs=true, loop=false) {
  const prefix = `audio_samples/${tableId}/`;
  let table = document.getElementById(tableId);
  clearTable(table);
  const end_idx = Math.min(page * numPerPage, filenames.length);
  for (let i = (page - 1) * numPerPage; i < end_idx; i++) {
    let row = table.insertRow(i % numPerPage + 1);
    row.style.height = '120px';
    console.log(filenames[i]);
    let cell = row.insertCell(0);
    insertText(`${prefix}${filenames[i]}/prompt.txt`, cell);
    cell = row.insertCell(1);
    cell.innerHTML = createAudioHTML(`${prefix}${filenames[i]}/audio.wav`, loop);
    if (sxs) {
      cell = row.insertCell(2);
      cell.innerHTML = createAudioHTML(`${prefix}${filenames[i]}/audio2.wav`, loop);
    }
  }
}

function generateTableFromFiles(tableId, filenames, page) {
  const prefix = `audio_samples/${tableId}/`;
  let table = document.getElementById(tableId);
  clearTable(table);
  const end_idx = Math.min(page * numPerPage, filenames.length);
  for (let i = (page - 1) * numPerPage; i < end_idx; i++) {
    let row = table.insertRow(i % numPerPage + 1);
    row.style.height = '120px';
    console.log(filenames[i]);
    let cell = row.insertCell(0);
    cell.innerHTML = filenames[i];
    cell = row.insertCell(1);
    console.log(`${prefix}${filenames[i]}.wav`);
    cell.innerHTML = createAudioHTML(`"${prefix}${filenames[i]}.wav"`, false);
  }
}

generateTableFromFiles('greatest-hits', greatestHits, 1);
generateTable('rich-captions', richCaptions, 1);
generateTable('looping', loopingCaptions, 1, false, true);
generatePaintingsTable('paintings', paintings, 1);


function registerClicks(id, id_captions, table_fn, pages) {
  for (let i = 1; i <= pages; i++) {
    const pageId = `#${id}-${i}`;
    $(pageId).click(function() {
      table_fn(id, id_captions, i);
      $(pageId).parent().siblings().removeClass('active');
      $(pageId).parent().addClass('active');
      return false;
    });
  }
}

$(document).ready(function() {
  registerClicks('greatest-hits', greatestHits, generateTableFromFiles, 2);
  registerClicks('rich-captions', richCaptions, generateTable, 2);
  registerClicks('paintings', paintings, generatePaintingsTable, 3);
});
