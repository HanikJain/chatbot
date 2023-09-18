export default function createMsgStructure(speaks, type, data) {
    return {
        speaks: speaks.toUpperCase(),
        msg: {
            data: data,
            type: type.toUpperCase(),
        }
    }
}