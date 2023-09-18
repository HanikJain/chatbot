function findKeyword(response){
    const obj  = response[0].queryResult.parameters.fields;
    const keys = Object.keys(obj);
    const keywords = [];

    for (let key of keys) {
        const values = obj[key].listValue.values;
        for (let value of values) {
            const keyword = value.stringValue;
            keywords.push(keyword);
        }
    }
        
    return keywords;
}

module.exports = findKeyword;
