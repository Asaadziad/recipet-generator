const fs = require('fs')
const path = require('path')
/*
    Simple file system database
*/


// takes a file name, returns a file descriptor
function DBConnect(db_folder) {
    const folder_path = __dirname +'/'+ db_folder
    let folder_exists = fs.existsSync(folder_path)
    if(!folder_exists) {
        folder_exists = fs.mkdirSync(folder_path) == undefined ? false : true
    }
    
   return folder_exists ? "DB folder created" : "Error" 
}

function createTable(tableName) {

}

module.exports = {
    DBConnect,
}