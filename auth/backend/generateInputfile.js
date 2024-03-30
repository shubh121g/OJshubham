const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirInputs = path.join(__dirname, 'inputs');

if (!fs.existsSync(dirInputs)) {
fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputfile = async (input) => {
    const jobID = uuid();
    const input_filename = `${jobID}.txt`;
    const input_filePath = path.join(dirInputs, input_filename);
    await fs.writeFileSync(input_filePath, input);
    console.log(input_filePath);
    return input_filePath;
};

module.exports = {
    generateInputfile,
};