const fs = require('fs');
function emptyFile(){
    const obj = {
        data: {}
    };

    const json = JSON.stringify(obj);

    try {
        fs.writeFile('./store/data.json', json, 
        {
            encoding: "utf8",
            flag: "w",
        }, (err) => {
            if(err) throw new Error(err);
            console.log("Data.json is cleared")
        })
    
    } catch (err) {
        if(err) throw new Error(err);
    }

}

module.exports = emptyFile;