const fs = require('fs')
const path = require('path')
const {ERR, LOG, messages} = require('./message')


/*
    Simple file system database
*/

const file_ending = {
    txt: 'txt',
    csv: 'csv', 
}

// takes a file name
// returns a message:
// 1. Failure message if it failed to connect
// 2. Success message if it is connected
// 3. Error message if an error has occured
function DBConnect(db_folder) {
    if(!db_folder || typeof(db_folder) != 'string') throw new Error(messages.INVALID_ARGUEMNT) 
    const folder_path = __dirname +'/'+ db_folder 
    let folder = undefined
    if(isConnected(db_folder)) return folder_path 
    try {
        folder = fs.mkdirSync(folder_path, {recursive: true})    
        if(!folder){
           ERR(`Couldn't open DB folder ${db_folder}`)
           throw new Error(messages.FAILURE) 
        } 
    } catch (error) {
        ERR(error)
        return error 
    } 
   return folder 
}

// DB: string - expects the name of the database
// returns a boolean - true if the db is connected, false otherwise
function isConnected(DB) {
    const folder_path = __dirname +'/'+ DB
    return fs.existsSync(folder_path)
}

function tableExists(DB, tableName){
    const table_path = __dirname + '/' + DB + '/' + tableName
    return fs.existsSync(table_path)    
}


// DB : string - expects the name of the database
function DBControl(DB) {
    
    if(!isConnected(DB)) throw new Error(messages.DB_CONNECTION_ERROR) 
    
    const create = function createTable(tableName, ...cols) {
        cols.forEach((val) => {
            if(typeof val != 'string') throw new Error(messages.INVALID_ARGUEMNT)
        })
        let line = cols.reduce((accumelated, current_value) => accumelated + current_value+ ",", "")
        fs.writeFileSync(DB + '/' + tableName,line, (err) => {
        if(err) {
            ERR(err)
            throw new Error(messages.FAILURE)
        }
        })
        return messages.SUCCESS
    }


    function insertRow(tableName, ...values) {
        if(!tableExists(DB, tableName)) {
            ERR("Table doesn't exist")
            throw new Error(messages.INVALID_ARGUEMNT) 
        }
        //check for values

       try {
            fs.appendFileSync(DB + '/' + tableName, "\n" + values.join(","))
       } catch (error) {
            ERR(error)
            throw new Error(messages.FAILURE)
       }
       return messages.SUCCESS   
    }

    function printTable(tableName) {
        const data = fs.readFileSync(DB + '/' + tableName)
        console.log(data.toString())
    }

    return {
            createTable: create,
            insertRow: insertRow,
            printTable: printTable
           } 
}

const dbs = DBControl('db')
dbs.createTable('test', "he","world") 
dbs.insertRow('employees', "he","ho","ha")
dbs.printTable('employees')


module.exports = {
    DBConnect,
    
}