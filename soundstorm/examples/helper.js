function createAudioHTML(path) {
  return '<audio controls controlslist="nodownload" class="px-1"> <source src=' +
      path +
      ' type="audio/wav">Your browser does not support the audio element.</audio>';
}


function generateExampleRow(table_row, base_path, filename_ext, col_offset) {
  for (var i = 0; i < filename_ext.length; i++) {
    let cell = table_row.cells[col_offset + i];
    if (Array.isArray(filename_ext[i])) {
      current_files = filename_ext[i];
    } else {
      current_files = [filename_ext[i]];
    }
    for (var j = 0; j < current_files.length; j++) {
      let p = base_path + current_files[j];
      if (p.endsWith('txt')) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
          if (this.readyState === this.DONE) {
            cell.innerHTML = '<font size="-1">' + req.responseText + '</font>';
          }
        };
        req.open('GET', p);
        req.send(null);
      } else {
        cell.innerHTML = cell.innerHTML + createAudioHTML(p);
      }
    }
  }
}


function generateDialogueTable(tableId) {
  let table = document.getElementById(tableId);
  let ext = ['.txt', '_prompt.mp3', ['_1.mp3', '_2.mp3']];
  let filenames = ['rb_travel', 'mp_joke', 'mr_sport', 'pj_music', 'jm_sleep'];

  for (var i = 0; i < 5; i++) {
    generateExampleRow(table.rows[1 + i], 'data/dialogue/' + filenames[i], ext, 0);
  }
}

function generateLibrispeechTable(tableId) {
  let table = document.getElementById(tableId);
  let ext = ['_original.mp3', ['_unprompted_0.mp3', '_unprompted_1.mp3', '_unprompted_2.mp3'], '_prompted.mp3'];

  for (var i = 0; i < 4; i++) {
    generateExampleRow(table.rows[1 + i], 'data/librispeech/' + i, ext, 0);
  }
}

function generateBaselinesTable(tableId) {
  let table = document.getElementById(tableId);
  let ext = ['_original.mp3', '_audiolm.mp3', '_greedy.mp3', '_soundstorm.mp3'];

  for (var i = 0; i < 4; i++) {
    generateExampleRow(table.rows[1 + i], 'data/baselines/' + i, ext, 0);
  }
}


generateDialogueTable('dialogue-table');
generateLibrispeechTable('librispeech-table');
generateBaselinesTable('baselines-table');

