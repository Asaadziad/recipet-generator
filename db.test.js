const { expect, test} = require('@jest/globals')
const path = require('path')
const {DBConnect, createTable} = require('./db')
const {messages} = require('./message')

const current_path = (folder) => __dirname + "/"+folder


test('db_connect', () => {
    expect(DBConnect("db")).toBe(current_path("db"))
})

test('db_connect_2', () => {
    expect(DBConnect("database")).toBe(current_path("database"))
})

test('db_connect_error', () => {
    expect(DBConnect).toThrow(messages.INVALID_ARGUEMNT)
})

test('db_connect_error_2', () => {
    expect(() => {DBConnect(5)}).toThrow(messages.INVALID_ARGUEMNT)
})

test('create_table', () => {
    expect(createTable('db','employees', "name", "age", "salary", "work hours")).toBe(messages.SUCCESS)
})