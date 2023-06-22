let all_languages_map = new Map([
  ['ar', 'Arabic'],    ['ca', 'Catalan'],   ['cy', 'Welsh'],
  ['de', 'German'],    ['et', 'Estonian'],  ['es', 'Spanish'],
  ['fa', 'Persian'],   ['fr', 'French'],    ['id', 'Indonesian'],
  ['it', 'Italian'],   ['ja', 'Japanese'],  ['lv', 'Latvian'],
  ['mn', 'Mongolian'], ['nl', 'Dutch'],     ['pt', 'Portuguese'],
  ['ru', 'Russian'],   ['sl', 'Slovenian'], ['sv', 'Swedish'],
  ['ta', 'Tamil'],     ['tr', 'Turkish'],   ['zh', 'Chinese']
]);

let low_languages = [
  'nl', 'tr', 'et', 'mn', 'ar', 'lv', 'sl', 'sv', 'cy', 'ta', 'ja', 'id'
];
let med_languages = ['fa', 'it', 'ru', 'zh', 'pt'];
let high_languages = ['fr', 'de', 'ca', 'es'];

function createAudioHTML(path) {
  return '<audio controls controlslist="nodownload" class="px-1"> <source src=' +
      path +
      ' type="audio/wav">Your browser does not support the audio element.</audio>';
}

async function getText(file, cell) {
  console.log('Fetching' + file);
  const myObject = await fetch(file);
  const myText = await myObject.text();
  cell.innerHTML = '<font size="-1">' + myText + '</font>';
}

function addExampleColumn(table_row, dir_path, basename) {
  let p = dir_path + basename;
  let cell = table_row.insertCell();
  if (p.endsWith('txt')) {
    getText(p, cell);
  } else {
    cell.style = 'text-align: center';
    cell.innerHTML = cell.innerHTML + createAudioHTML(p);
  }
}

function fillS2STable(tableId, lang) {
  let lang_table = document.getElementById(tableId);
  let nrRows = lang_table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    lang_table.deleteRow(1);
  }

  for (let utterance_idx = 0; utterance_idx < 5; utterance_idx++) {
    let utt_root_dir = 'data/' + lang + '/' + utterance_idx.toString() + '/';
    let utt_row = lang_table.insertRow(-1);
    addExampleColumn(utt_row, utt_root_dir, 'input.wav');
    addExampleColumn(utt_row, utt_root_dir, 'tts_target.wav');
    addExampleColumn(utt_row, utt_root_dir, 'audiopalm_without_accent.wav');
    addExampleColumn(utt_row, utt_root_dir, 'audiopalm_with_accent.wav');
    addExampleColumn(utt_row, utt_root_dir, 'translatotron2.wav');
  }
}

function fillASRTable(tableId, lang) {
  let lang_table = document.getElementById(tableId);
  let nrRows = lang_table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    lang_table.deleteRow(1);
  }

  for (let utterance_idx = 0; utterance_idx < 5; utterance_idx++) {
    let utt_root_dir = 'data/' + lang + '/' + utterance_idx.toString() + '/';
    let utt_row = lang_table.insertRow(-1);
    addExampleColumn(utt_row, utt_root_dir, 'input.wav');
    addExampleColumn(utt_row, utt_root_dir, 'gt_original_transcript.txt');
    addExampleColumn(utt_row, utt_root_dir, 'ap_original_transcript.txt');
  }
}

function fillS2TTTable(tableId, lang) {
  let lang_table = document.getElementById(tableId);
  let nrRows = lang_table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    lang_table.deleteRow(1);
  }

  for (let utterance_idx = 0; utterance_idx < 5; utterance_idx++) {
    let utt_root_dir = 'data/' + lang + '/' + utterance_idx.toString() + '/';
    let utt_row = lang_table.insertRow(-1);
    addExampleColumn(utt_row, utt_root_dir, 'input.wav');
    addExampleColumn(utt_row, utt_root_dir, 'gt_translated_transcript.txt');
    addExampleColumn(utt_row, utt_root_dir, 'ap_translated_transcript.txt');
  }
}

fillS2STable('s2s-high-table', 'de');
fillS2STable('s2s-med-table', 'it');
fillS2STable('s2s-low-table', 'nl');

fillS2TTTable('s2tt-high-table', 'de');
fillS2TTTable('s2tt-med-table', 'it');
fillS2TTTable('s2tt-low-table', 'nl');

fillASRTable('asr-high-table', 'de');
fillASRTable('asr-med-table', 'it');
fillASRTable('asr-low-table', 'nl');

$(document).ready(function() {
  for (let lang of high_languages) {
    let s2s_id = '#s2s-lang-' + lang;
    $(s2s_id).click(function() {
      fillS2STable('s2s-high-table', lang);
      $(s2s_id).parent().siblings().removeClass('active');
      $(s2s_id).parent().addClass('active');
      return false;
    });

    let s2tt_id = '#s2tt-lang-' + lang;
    $(s2tt_id).click(function() {
      fillS2TTTable('s2tt-high-table', lang);
      $(s2tt_id).parent().siblings().removeClass('active');
      $(s2tt_id).parent().addClass('active');
      return false;
    });

    let asr_id = '#asr-lang-' + lang;
    $(asr_id).click(function() {
      fillASRTable('asr-high-table', lang);
      $(asr_id).parent().siblings().removeClass('active');
      $(asr_id).parent().addClass('active');
      return false;
    });
  }

  for (let lang of med_languages) {
    let s2s_id = '#s2s-lang-' + lang;
    $(s2s_id).click(function() {
      fillS2STable('s2s-med-table', lang);
      $(s2s_id).parent().siblings().removeClass('active');
      $(s2s_id).parent().addClass('active');
      return false;
    });

    let s2tt_id = '#s2tt-lang-' + lang;
    $(s2tt_id).click(function() {
      fillS2TTTable('s2tt-med-table', lang);
      $(s2tt_id).parent().siblings().removeClass('active');
      $(s2tt_id).parent().addClass('active');
      return false;
    });

    let asr_id = '#asr-lang-' + lang;
    $(asr_id).click(function() {
      fillASRTable('asr-med-table', lang);
      $(asr_id).parent().siblings().removeClass('active');
      $(asr_id).parent().addClass('active');
      return false;
    });
  }

  for (let lang of low_languages) {
    let s2s_id = '#s2s-lang-' + lang;
    $(s2s_id).click(function() {
      fillS2STable('s2s-low-table', lang);
      $(s2s_id).parent().siblings().removeClass('active');
      $(s2s_id).parent().addClass('active');
      return false;
    });

    let s2tt_id = '#s2tt-lang-' + lang;
    $(s2tt_id).click(function() {
      fillS2TTTable('s2tt-low-table', lang);
      $(s2tt_id).parent().siblings().removeClass('active');
      $(s2tt_id).parent().addClass('active');
      return false;
    });

    let asr_id = '#asr-lang-' + lang;
    $(asr_id).click(function() {
      fillASRTable('asr-low-table', lang);
      $(asr_id).parent().siblings().removeClass('active');
      $(asr_id).parent().addClass('active');
      return false;
    });
  }
});
