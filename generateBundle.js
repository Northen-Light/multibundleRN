const {exec} = require('child_process');
const lineReader = require('line-reader');

const BASE_BUNDLE = 'android/app/src/main/assets/index.android-plain.bundle';
const HOME_BUNDLE = 'android/app/src/main/assets/home.bundle';

function getCommand(entryFile = 'index.js', output = BASE_BUNDLE) {
  // if (entryFile === "index.js")
    return `NODE_ENV=production react-native bundle --platform android --dev false --entry-file ${entryFile} --bundle-output ${output} --reset-cache 2>&1`;
  // else
  //   return `NODE_ENV=production react-native bundle --platform android --dev false --entry-file ${entryFile} --bundle-output ${output}`;
}

let prevTime = null;


function runBundle({entry, output}) {
  return new Promise((resolve) => {
    exec(getCommand(entry, output), {cwd: __dirname, maxBuffer: 10 * 1024 * 1024}, (err, stdout, stderr) => {
      if (err) {
        //some err occurred
        console.error(err)
      } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
      resolve();
    })
  })
}

const fs = require('fs');

function readBundle(fileName) {
  let preCode = '';
  let initCode = [];
  let modules = [];
  const exists = fs.existsSync(fileName);
  console.log('exists', exists);
  return new Promise((resolve) => {
    lineReader.eachLine(fileName, (line, last) => {
      // console.log('line', line)
      if (!line.startsWith('__d')) {
        if (line.startsWith('__r')) {
          initCode.push(line);
        } else {
          preCode += `${line}\n`;
        }
      } else {
        const moduleId = /__d\(.*},(.*),.*/.exec(line)[1]
        modules.push({id: moduleId, code: line})
      }
      if (last) {
        resolve({
            preCode,
            modules,
            initCode
          }
        );
      }
    });

  })
}

function removeBaseCode(outputPath, base = BASE_BUNDLE) {
  return new Promise(async (resolve) => {
    let outputBundle = await readBundle(outputPath);
    const baseBundle = await readBundle(base);
    const baseModuleIds = new Set(baseBundle.modules.map(mod => mod.id));
    const modId = outputBundle.initCode[1].replace('__r(', '').replace(');', '');
    let lastSlashIndex = outputPath.lastIndexOf('/');
    let newPath = outputPath.substr(0, lastSlashIndex) + '/' + `chunk-${modId}-plain.bundle`;
    let writeStream = fs.createWriteStream(newPath, {flags: 'w'});
    outputBundle.modules.forEach(value => {
      if (!baseModuleIds.has(value.id)) {
        writeStream.write(value.code + "\n");
      }
    })
    const bytecodeBundlePath = newPath.replace('-plain.bundle', '.bundle');
    exec(`node_modules/hermes-engine/osx-bin/hermesc ${newPath} -emit-binary -out ${bytecodeBundlePath}`, () => {
      resolve();
    });
  })
}

function buildBaseBundle() {
  return runBundle({entry: 'index.js', output: BASE_BUNDLE});
}

function buildBundle({entry, output}) {
  return runBundle({entry, output}).then(() => removeBaseCode(output));
}

function generateByteCode() {
  return new Promise((resolve) => {
    const out = BASE_BUNDLE.replace('-plain.bundle', '.bundle');
    exec(`node_modules/hermes-engine/osx-bin/hermesc ${BASE_BUNDLE} -emit-binary -out ${out}`, {
      cwd: __dirname,
      maxBuffer: 10 * 1024 * 1024
    }, (err, stdout) => {
      console.log('stdout', stdout);
      console.log('err', err);
      console.log("Finised building base bundle ", Date.now() - time)
      resolve();
    });
  })
}

buildBaseBundle()
  .then(() => buildBundle({entry: 'pages/Home/index.js', output: HOME_BUNDLE}))
  .then(() => generateByteCode())

