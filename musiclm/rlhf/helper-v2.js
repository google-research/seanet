const numPerPage = 10;

const models = [
  'musiclm-',
  'musicrlhf-r-',
  'musicrlhf-u-',
  'musicrlhf-ru-',
];

const numExamples = 50

function createAudioHTML(path, loop=false) {
  const loop_str = (loop) ? "loop" : "";
  return `<audio controls controlslist="nodownload noplaybackrate" ${loop_str} class="px-1"> <source src=${path} type="audio/wav"></audio>`;
}

async function getText(file) {
  console.log('Fetching ' + file);
  const myObject = await fetch(file);
  const myText = await myObject.text();
  return myText;
}

async function insertText(file, cell) {
  txt = await getText(file);
  console.log(txt)
  cell.innerHTML = txt;
}

function clearTable(table) {
  let nrRows = table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    table.deleteRow(1);
  }
}


function generateTable(tableId, page) {
  const prefix = `audio_samples/`;
  let table = document.getElementById(tableId);
  clearTable(table);
  const end_idx = Math.min(page * numPerPage, numExamples);
  for (let i = (page - 1) * numPerPage; i < end_idx; i++) {
    let row = table.insertRow(i % numPerPage + 1);
    row.style.height = '120px';
    // Text Cell
    let textCell = row.insertCell(0);

    // Fetch text
	insertText(`${prefix}prompt${i}.txt`, textCell);

    // Audio Cells
    let audioCell1 = row.insertCell(1);
    audioCell1.innerHTML = createAudioHTML(`${prefix}${models[0]}${i}.wav`);

    let audioCell2 = row.insertCell(2);
    audioCell2.innerHTML = createAudioHTML(`${prefix}${models[1]}${i}.wav`);

    let audioCell3 = row.insertCell(3);
    audioCell3.innerHTML = createAudioHTML(`${prefix}${models[2]}${i}.wav`);

    let audioCell4 = row.insertCell(4);
    audioCell4.innerHTML = createAudioHTML(`${prefix}${models[3]}${i}.wav`);
  }
}


generateTable('comparison', 1);


function registerClicks(id, table_fn, pages) {
  for (let i = 1; i <= pages; i++) {
    const pageId = `#${id}-${i}`;
    $(pageId).click(function() {
      table_fn(id, i);
      $(pageId).parent().siblings().removeClass('active');
      $(pageId).parent().addClass('active');
      return false;
    });
  }
}

$(document).ready(function() {
  registerClicks('comparison', generateTable, 5);
});
