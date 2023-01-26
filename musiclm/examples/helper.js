function createAudioHTML(path) {
  return '<audio controls controlslist="nodownload" class="px-1"> <source src=' +
      path +
      ' type="audio/wav">Your browser does not support the audio element.</audio>';
}
const numPerPage = 4;

async function getText(file, cell) {
  console.log('Fetching' + file);
  const myObject = await fetch(file);
  const myText = await myObject.text();
  cell.innerHTML = myText;
}

function longGenTable(tableId, filenames, page) {
  let table = document.getElementById(tableId + '-generation');

  let nrRows = table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    table.deleteRow(1);
  }
  const prefix = 'audio_samples/long_generation/';
  const end_idx = filenames.length;
  for (let i = (page - 1) * numPerPage; i < end_idx; i++) {
    let row = table.insertRow(i % numPerPage + 1);
    let cell = row.insertCell(0);
    cell.innerHTML = filenames[i].replaceAll('-', ' ');

    cell = row.insertCell(1);
    cell.innerHTML = createAudioHTML(prefix + filenames[i] + '.wav');
    cell.style.textAlign = "right";
  }
}

function generate10sTable(tableId, filenames, page) {
  let table = document.getElementById(tableId + '-generation');

  let nrRows = table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    table.deleteRow(1);
  }
  const prefix = 'audio_samples/10s_samples/' + tableId + '/';
  const end_idx = page * numPerPage;
  for (let i = (page - 1) * numPerPage; i < end_idx; i++) {
    let row = table.insertRow(i % numPerPage + 1);
    row.style.height = '80px';
    if (i < filenames.length) {
      let cell = row.insertCell(0);
      cell.innerHTML = filenames[i].replaceAll('-', ' ');

      cell = row.insertCell(1);
      cell.innerHTML = createAudioHTML(prefix + filenames[i] + '.wav');
      cell.style.textAlign = "right";
    } else {
      let cell = row.insertCell(0);
      cell.innerHTML = '<br>';
      cell = row.insertCell(1);
      cell.innerHTML = '<br>';
      cell.style.textAlign = "right";
    }
  }
}

function generateStoryModeTable(tableId, filenames, page) {
  let table = document.getElementById(tableId);

  let nrRows = table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    table.deleteRow(1);
  }
  const prefix = 'audio_samples/story_mode/';
  const end_idx = Math.min(page * numPerPage, filenames.length);
  console.log('END IDX: ' + end_idx);
  for (let i = (page - 1) * numPerPage; i < end_idx; i++) {
    let row = table.insertRow(i % numPerPage + 1);
    let cell = row.insertCell(0);
    getText(prefix + filenames[i] + '.txt', cell);

    cell = row.insertCell(1);
    cell.innerHTML = createAudioHTML(prefix + filenames[i] + '.wav');
    cell.style.textAlign = "right";
  }
}

function generateMelodyConditioningTable(tableId, melody_names, text_prompts) {
  let table = document.getElementById(tableId);
  const prefix = 'audio_samples/melody_conditioning/';

  // Create table head;
  let thead = table.createTHead();
  let head_row = thead.insertRow();
  let cell = head_row.insertCell(0);
  cell.innerHTML = 'melody  prompt &#8594 text prompt &#8595';
  for (let i = 0; i < melody_names.length; i++) {
    let cell = head_row.insertCell(i + 1);
    let melody_name = melody_names[i].replaceAll('-', ' ').replaceAll('_', ' - ');
    cell.innerHTML = melody_name + ' ' + createAudioHTML(
	prefix + melody_names[i] + '/prompt.wav', cell);
    cell.style.textAlign = "center";
  }

  for (let i = 0; i < text_prompts.length; i++) {
    let row = table.insertRow(i + 1);
    let cell = row.insertCell(0);
    cell.innerHTML = text_prompts[i].replaceAll('-', ' ');

    for (let j = 0; j < melody_names.length; j++) {
      let cell = row.insertCell(j + 1);
      let cond_file = prefix + melody_names[j] + '/' + text_prompts[i] + '.wav';
      cell.innerHTML = createAudioHTML(cond_file, cell);
    }
  }
}

function generatePaintingsTable(tableId, filenames, page) {
  let table = document.getElementById(tableId);

  let nrRows = table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    table.deleteRow(1);
  }
  const prefix = 'audio_samples/painting_descriptions/';
  const end_idx = Math.min(page * numPerPage, filenames.length);
  for (let i = (page - 1) * numPerPage; i < end_idx; i++) {
    let row = table.insertRow(i % numPerPage + 1);
    let cell = row.insertCell(0);
    getText(prefix + filenames[i] + '.title', cell);

    cell = row.insertCell(1);
    cell.innerHTML = '<img src="' + prefix + filenames[i] + '.jpg" >'

    cell = row.insertCell(2);
    getText(prefix + filenames[i] + '.txt', cell);

    cell = row.insertCell(3);
    cell.innerHTML = createAudioHTML(prefix + filenames[i] + '.wav');
  }
}

function generateDiversityTable(tableId, filenames, check_type, page) {
  let table = document.getElementById(tableId);

  let nrRows = table.rows.length;
  for (let i = 0; i < nrRows; i++) {
    table.deleteRow(0);
  }

  let thead = table.createTHead();
  let head_row = thead.insertRow();
  let cell = head_row.insertCell(0);
  cell.innerHTML = 'Text prompt: ' + filenames[page - 1].replaceAll('-', ' ')
  cell.style.textAlign = "center";
  cell.colSpan = "2";

  const prefix = 'audio_samples/diversity-samples/';
  for (let irow = 0; irow < 3; irow++) {
    let row = table.insertRow(irow + 1);
    for (let icol = 0; icol < 2; icol++) {
      let cell = row.insertCell(icol);
      cell.innerHTML = createAudioHTML(
	  prefix + filenames[page - 1] + '/' + check_type + '/' + (2 * irow + icol) + '.wav');
      cell.style.textAlign = "center";
    }
  }
}

function generateRichTable(tableId, filenames, page) {
  let table = document.getElementById(tableId);

  let nrRows = table.rows.length;
  for (let i = 1; i < nrRows; i++) {
    table.deleteRow(1);
  }
  const prefix = 'audio_samples/rich-descriptions/';
  const end_idx = page * numPerPage;
  for (let i = (page - 1) * numPerPage; i < end_idx; i++) {
    let row = table.insertRow(i % numPerPage + 1);
    row.style.height = '120px';
    if (i < filenames.length) {
      console.log(filenames[i]);
      let cell = row.insertCell(0);
      getText(prefix + filenames[i] + '/prompt.txt', cell);

      cell = row.insertCell(1);
      cell.innerHTML = createAudioHTML(
	  prefix + filenames[i] + '/audio.wav');
      cell.style.textAlign = "right";
    } else {
      let cell = row.insertCell(0);
      cell.innerHTML = '<br>';
      cell = row.insertCell(1);
      cell.innerHTML = '<br>';
      cell.style.textAlign = "right";
    }
  }
}

const freeTextGeneratedFilenames = [
  'aggressive_guitar_riff',
  'jazz',
  'dance',
  'light_piano',
  'death_metal',
  'solo',
  'hiphop',
  'techno',
];

const melodyConditionGeneratedFilenames = [
  'when_the_saints_-0x2a5800300813b878',
  'when_the_saints_0x1785735e333f530e',
  'when_the_saints_0x4a1f5743067a2cf6',
  'when_the_saints_0x95e075acb9ae3b8',

  'jingle_bells_-0x2a5800300813b878',
  'jingle_bells_0x1785735e333f530e',
  'jingle_bells_0x4a1f5743067a2cf6',
  'jingle_bells_0x95e075acb9ae3b8',
];

const paintingsFilenames = [
  'dali',
  'napoleon',
  'dance',
  'scream',

  'guernica',
  'the_starry_night',
  'kiss',
  'wanderer',
];

accordion = [
  'accordion-death-metal',
  'accordion-edm',
  'accordion-piano',
  'accordion-rap',
  'accordion-rock',
  'accordion-techno',
]

epochs = [
  'club-in-the-50s',
  'club-in-the-60s',
  'club-in-the-70s',
  'club-in-the-80s',
  'club-in-the-90s',
  'club-in-the-00s',
  'futuristic-club',
]

experience = [
  'beginner-piano-player',
  'intermediate-piano-player',
  'professional-piano-player',
  'crazy-fast-professional-piano-player',
  'beginner-guitar-player',
  'intermediate-guitar-player',
  'professional-guitar-player',
]

genres = [
  '8-bit',
  'ambient',
  'berlin-90s-house',
  'big-beat',
  'blues',
  'breakbeat',
  'british-indie-rock',
  'chillout',
  'country',
  'detroit-techno',
  'downtempo',
  'dream-pop',
  'drum-n-bass',
  'east-coast-hip-hop',
  'folk',
  'funky-jazz',
  'grunge',
  'hip-hop',
  'indie-folk-hip-hop',
  'jazz',
  'minimal-house',
  'peruvian-punk',
  'reggae',
  'rock',
  'trap-hip-hop',
  'west-coast-hip-hop',
]

instruments = [
  'acoustic-guitar',
  'cello',
  'electric-guitar',
  'flute',
  'grand-piano',
  'harp',
  'mandolin',
  'maracas',
  'oboe',
  'saxophone',
  'trumpet',
  'ukulele',
  'violin',
  'xylophone',
]

places = [
  'beach-in-the-caribbeans',
  'escaping-prison',
  'gym',
  'opera',
  'street-performance',
  'underground-rave',
]

melodies_dirs = [
  'bella-ciao_humming',
  'bella-ciao_jingle-bells_whistling',
  'camptown-races_humming',
  'fingerstyle-guitar',
  'jingle-bells_marimba',
  'turkey-in-the-straw_whislting',
  'twinkle-twinkle-little-star_piano',
  'when-the-saints-go-marching-in_strings',
];

melodies_text_prompts = [
  'a-cappella-chorus',
  'electronic-synth-lead',
  'guitar-solo',
  'jazz-with-saxophone',
  'opera-singer',
  'piano-solo',
  'string-quartet',
  'tribal-drums-and-flute',
];

story_mode = [
  'example_1',
  'example_2',
  'example_3',
];

longgen = [
  'melodic-techno',
  'swing',
  'relaxing-jazz',
];

diversity_checks = [
  'Motivational-music-for-sports',
  'jazz-big-band',
  'progressive-rock-guitar-solo',
  'relaxing-song',
  'string-quartet-and-percussions',
];

rich_captions = [
  'arcade',
  'electreggaeton',
  'synth',
  'reggae',
  'funky',
  'meditation',
  'reb-rap',
  'techno-strings',
  'epic',
  'greg',
];

generate10sTable('accordion'  , accordion  , 1);
generate10sTable('epochs'     , epochs	   , 1);
generate10sTable('experience' , experience , 1);
generate10sTable('genres'     , genres	   , 1);
generate10sTable('places'     , places	   , 1);
generate10sTable('instruments', instruments, 1);

generatePaintingsTable('painting-generation', paintingsFilenames, 1);
generateMelodyConditioningTable('melody-conditioning-generation', melodies_dirs, melodies_text_prompts);
generateStoryModeTable('storymode-generation', story_mode, 1);
longGenTable('longgen', longgen, 1);
generateDiversityTable('diversity-checks-txt', diversity_checks, 'same-text', 1);
generateDiversityTable('diversity-checks-semantic', diversity_checks, 'same-text-mlm', 1);
generateRichTable('rich-captions', rich_captions, 1);

$(document).ready(function() {
  for (let i = 1; i <= 3; i++) {
    let id = '#rich-captions-' + i;
    $(id).click(function() {
      generateRichTable('rich-captions', rich_captions, i);
      $(id).parent().siblings().removeClass('active');
      $(id).parent().addClass('active');
      return false;
    });
  }

  const sections_10s = ['accordion', 'epochs', 'experience', 'places'];
  const filenames_10s = [accordion, epochs, experience, places];
  for (let isection = 0; isection <= 5; isection++) {
    let section_name = sections_10s[isection];
    let filenames = filenames_10s[isection];
    for (let i = 1; i <= 2; i++) {
      let id = '#' + section_name + '-generation-' + i;
      $(id).click(function() {
        generate10sTable(section_name, filenames, i);
        $(id).parent().siblings().removeClass('active');
        $(id).parent().addClass('active');
        return false;
      });
    }
  }

  for (let i = 1; i <= 7; i++) {
    let id = '#genres-generation-' + i;
    $(id).click(function() {
      generate10sTable(
          'genres',
          genres, i);
      $(id).parent().siblings().removeClass('active');
      $(id).parent().addClass('active');
      return false;
    });
  }

  for (let i = 1; i <= 4; i++) {
    let id = '#instruments-generation-' + i;
    $(id).click(function() {
      generate10sTable(
          'instruments',
          instruments, i);
      $(id).parent().siblings().removeClass('active');
      $(id).parent().addClass('active');
      return false;
    });
  }

  for (let i = 1; i <= 2; i++) {
    let id = '#painting-generation-' + i;
    $(id).click(function() {
      generatePaintingsTable(
          'painting-generation',
          paintingsFilenames, i);
      $(id).parent().siblings().removeClass('active');
      $(id).parent().addClass('active');
      return false;
    });
  }

  for (let i = 1; i <= 5; i++) {
    let id = '#diversity-checks-txt-' + i;
    $(id).click(function() {
      generateDiversityTable('diversity-checks-txt', diversity_checks, 'same-text', i);
      $(id).parent().siblings().removeClass('active');
      $(id).parent().addClass('active');
      return false;
    });
  }

  for (let i = 1; i <= 5; i++) {
    let id = '#diversity-checks-semantic-' + i;
    $(id).click(function() {
      generateDiversityTable('diversity-checks-semantic', diversity_checks, 'same-text-mlm', i);
      $(id).parent().siblings().removeClass('active');
      $(id).parent().addClass('active');
      return false;
    });
  }

});
