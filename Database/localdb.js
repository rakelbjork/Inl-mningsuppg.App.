import * as SQLite from 'expo-sqlite';
import Rsvp from "../Models/Rsvp";

const db = SQLite.openDatabase("rsvp.db");

export const initDB = () => {

    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(`CREATE TABLE IF NOT EXISTS rsvps (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                completed BOOLEAN NOT NULL
            )`, [],
                (tx, res) => resolve(res),
                (tx, err) => reject(err)
            )
        })
    })
}

export const findAll = () => {

    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
            transaction.executeSql(`SELECT * FROM rsvps`, [],
            (tx, res) => resolve(res.rows._array
                .map(rsvp => new Rsvp(rsvp.id, rsvp.title, rsvp.completed === 1))),
            (tx, err) => reject(err)
            )
        })
    })
}

export const insert = (rsvp) => {
    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(
                `INSERT INTO rsvps (title, completed)
                VALUES (?,?)`,  [rsvp.title, rsvp.isCompleted],
                (tx,res) => resolve(res),
                (tx, err) => reject(err)
            )
        })
    })
}

export const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                `DELETE FROM rsvps WHERE id = ?`, [id],
                (tx, res) => resolve(res),
                (tx, err) => reject(err)
            )
        })

    })
}
