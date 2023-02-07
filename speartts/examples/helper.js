function createAudioHTML(path) {
  return '<audio controls controlslist="nodownload" class="px-1"> <source src=' +
      path +
      ' type="audio/wav">Your browser does not support the audio element.</audio>';
}


function generateExampleRow(table_row, base_path, filename_ext, col_offset) {
  for (var i = 0; i < filename_ext.length; i++) {
    let p = base_path + filename_ext[i];
    let cell = table_row.cells[col_offset + i];
    if (p.endsWith('txt')) {
      var req = new XMLHttpRequest();
      req.open("GET", p, false);
      req.send(null);
      cell.innerHTML = '<font size="-1">' + req.responseText + '</font>';
    } else {
      cell.innerHTML = cell.innerHTML + createAudioHTML(p);
    }
  }
}


function generateSupervisionEfficiency(tableId) {
  let table = document.getElementById(tableId);
  let ext = ['.txt', '_gt.wav', '_fs2_24h.wav', '_fs2_15min.wav', '_ours_15min.wav'];

  for (var i = 0; i < 9; i++) {
    generateExampleRow(table.rows[1 + i], 'data/sample_efficiency/' + i, ext, 0);
  }
}


function generateFidelityVersusAmountPairedData(tableId) {
  let table = document.getElementById(tableId);
  let ext0 = ['24h', '12h', '3h', '2h', '1h']; //, '30min', '15min'];
  let ext1 = ['scratch', 'pretrain', 'back'];
  var ext = []
  for (var i = 0; i < ext0.length; i++) {
    var ext_row = []
    for (var j = 0; j < ext1.length; j++) {
      ext_row.push('_' + ext1[j] + '_' + ext0[i] + '.wav');
    }
    ext.push(ext_row);
  }

  for (var i = 0; i < ext.length; i++) {
    generateExampleRow(table.rows[2 + i], 'data/data_size/lt1', ext[i], 1);
    generateExampleRow(table.rows[10 + i], 'data/data_size/lt2', ext[i], 1);
  }

  ext = ['_pretrain_30min.wav', '_back_30min.wav']
  generateExampleRow(table.rows[7], 'data/data_size/lt1', ext, 2);
  generateExampleRow(table.rows[15], 'data/data_size/lt2', ext, 2);

  ext = ['_back_30min.wav']
  generateExampleRow(table.rows[8], 'data/data_size/lt1', ext, 3);
  generateExampleRow(table.rows[16], 'data/data_size/lt2', ext, 3);

}


function generateSpeechDiversity(tableId) {
  let table = document.getElementById(tableId);
  let ext = ['_ours_15min_text.txt', '_ours_15min_1.wav', '_ours_15min_2.wav', '_ours_15min_3.wav', '_ours_15min_4.wav'];

  for (var i = 0; i < 3; i++) {
    generateExampleRow(table.rows[i + 1], 'data/diversity/lt_' + (1 + i), ext, 0)
  }
}


function generatePrompting(tableId) {
  let table = document.getElementById(tableId);
  console.log("got table ", table);
  let ext = ['_prompt.wav', '_0.wav', '_1.wav', '_2.wav', '_3.wav'];

  let examples = [
      [
          '201a21a19122da31975501c183a447db_1089_0',
          '201a21a19122da31975501c183a447db_1089_2',
          '201a21a19122da31975501c183a447db_2094_0',
          '201a21a19122da31975501c183a447db_2094_2',
      ],
      [
          '1ebe5c38eabb74ee9fc562f3f716dc8c_1089_0',
          '1ebe5c38eabb74ee9fc562f3f716dc8c_1089_2',
          '1ebe5c38eabb74ee9fc562f3f716dc8c_2094_0',
          '1ebe5c38eabb74ee9fc562f3f716dc8c_2094_2',
      ]
  ];
  for (var i = 0; i < examples[0].length; i++) {
    generateExampleRow(table.rows[2 + i], 'data/prompting/' + examples[0][i], ext, 0)
  }
  for (var i = 0; i < examples[1].length; i++) {
    generateExampleRow(table.rows[7 + i], 'data/prompting/' + examples[1][i], ext, 0)
  }

}


generateSupervisionEfficiency('supervision-efficiency-table');
generateFidelityVersusAmountPairedData('fidelity-vs-amount-paired-data');
generateSpeechDiversity('speech-diversity');
generatePrompting('prompting-table');
