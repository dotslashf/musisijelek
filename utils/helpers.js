const cliProgress = require('cli-progress');
const colors = require('colors');
const fs = require('fs').promises;
const fetch = require('node-fetch');
const sharp = require('sharp');

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const loadingBar = async nTime => {
  const bar = new cliProgress.SingleBar(
    {
      format: 'Next tweet ' + colors.cyan('{bar}') + ' {value}/{total} Minutes',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
    },
    cliProgress.Presets.rect
  );

  bar.start(nTime, 0);
  for (let i = 0; i < nTime; i++) {
    bar.update(i + 1);
    await sleep(1000 * 60);
  }
  bar.stop();
};

const downloadImage = async url => {
  const response = await fetch(url);
  const buffer = await response.buffer();
  await fs.writeFile(`./media/artist.png`, buffer);
};

const joinImage = async defaultImage => {
  const mediaSrc = './media';
  if (defaultImage) {
    let _buffer = await sharp(`${mediaSrc}/no_image.png`)
      .resize(640, 640)
      .composite([{ input: `${mediaSrc}/stamp.png` }])
      .sharpen()
      .png()
      .toBuffer();
    await fs.writeFile(`${mediaSrc}/final.png`, _buffer);
  } else {
    let _buffer = await sharp(`${mediaSrc}/artist.png`)
      .resize(640, 640)
      .composite([{ input: `${mediaSrc}/stamp.png` }])
      .sharpen()
      .png()
      .toBuffer();
    await fs.writeFile(`${mediaSrc}/final.png`, _buffer);
  }
};

module.exports = { loadingBar, downloadImage, joinImage };
