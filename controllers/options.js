const fs = require('fs');

function findData(id, data) {
    const arrID = id.split('.');
     
    if(arrID.length === 1) {
        const cloneData = JSON.parse(JSON.stringify(data));
        return cloneData;       
    }
    else {
        arrID.shift();
        const newData = data[arrID[0]];
        const newID = arrID.join('.');
        return findData(newID, newData);
    }
}

async function options(req, res, next) {
    fs.readFile('./store/data.json', 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).json({
                message: "Internal server error"
            });
        } else {
            const id = req.body.id;
            const title = req.body.title;
            const obj = JSON.parse(data)
            const response = findData(id, obj.data[0].data);
            const clonedResponse = JSON.parse(JSON.stringify(response));
            clonedResponse.title = title;

            res.status(201).json({
                responses:[{
                    data: clonedResponse, 
                    api: "/api/options",
                    type: "OPTION",
                }],
                intentExits: true,
            });
        }
    })
}

module.exports = options;