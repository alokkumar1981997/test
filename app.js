const { fsReadFile, convertor } = require('./util');
const { LATITUDE, LONGITUDE } = require('./constants')

let processFile = async function (inputFile) {

    let read = await fsReadFile(inputFile, 'utf8');
    let arr = []
    arr = read.split('\n')
    for (let i = 0; i < arr.length; i++) {
        arr[i] = JSON.parse(arr[i])
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i].distance = convertor(LATITUDE, LONGITUDE, arr[i].latitude, arr[i].longitude)
    }

    arr.sort(function (a, b) {
        return a.user_id - b.user_id;
    })
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].distance <= 100) {
            console.log(arr[i].name + " " + arr[i].user_id);
        }
    }
}
processFile('det.txt')
