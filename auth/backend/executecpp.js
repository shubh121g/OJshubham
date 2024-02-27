const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");
const cppfilepath = path.join(__dirname,"codes");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    //console.log("basename");
    const bname=path.basename(filepath);
    //console.log(path.basename(filepath))
    const outPath = path.join(outputPath, `${jobId}.exe`);

    return new Promise((resolve, reject) => {
        exec(
            `cd ${cppfilepath} && g++ ./${bname} -o ${jobId}.exe && .\\${jobId}.exe`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executeCpp,
};