const { expect, test} = require('@jest/globals')
const {DBConnect} = require('./db')


test('db_connect', () => {
    expect(DBConnect("db")).toBe("DB folder created")
})