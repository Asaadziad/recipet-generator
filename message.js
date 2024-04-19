
const messages = {
    INVALID_ARGUEMNT : 'Invalid argument',
    NULL_RETURN: 'Null return',
    DB_CONNECTION_ERROR: 'DB CONNECTION ERROR',
    FAILURE: 'Fail',
    SUCCESS: 'Success'
}


const LOG = (msg) => {
    console.log("[LOG "+ Date.now().toString() + " ] " + msg)
}

const ERR = (msg) => {
    console.error("[ERROR "+Date.now().toString()+" ] " + msg)
}

module.exports = {
    messages,
    LOG,
    ERR
}