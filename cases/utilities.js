function showAlert(message) {
  let dashes = new Array(message.length).fill("-").join("");
  console.log(`\n${dashes}`);
  console.log(message);
  console.log(`${dashes}\n`);
}

function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("delay done");
    }, time * 1000);
  });
}

const toExport = { showAlert, delay };

module.exports = toExport;
