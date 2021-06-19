const cliProgress = require('cli-progress');
const colors = require('colors');

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

module.exports = { loadingBar };
