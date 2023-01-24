import Papa from 'papaparse'

const parseFile = (file) => {
    return new Promise(resolve => {
        Papa.parse(file, {
            complete: results => {
                resolve(results.data);
            },
            header: true
        });
    });
};

const getDataFromFile = async(files) => {
    let res = await parseFile(files[0]);
    return res.slice(0, -1)
}

const createFileFromData = (data) => {
    const csv = Papa.unparse(data)
    return csv
}


export {getDataFromFile, createFileFromData}