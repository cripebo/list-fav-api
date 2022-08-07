import mysql, { MysqlError, OkPacket } from 'mysql';
import { LFList, LFUser } from '../types/types';


/**
 * DATABASE PREPARATION & CONNECTION
 */

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
  });


function connectDB () {
    connection.connect(error => {
        if (error) throw error;
        console.log("[DB] Successfully connected to the database.");
    });
}


/**
 * DATABASE METHODS
 */

/**
 * @param callback: Function - Callback after make a DB request. 
 */

function getLists(callback: Function) {
    const query = 'SELECT * FROM lf_lists';

    connection.query(query, (error: MysqlError, rows) => {
        if (error) 
            callback(error);

        const result = rows.map((row: any) => {
            return {
                ...row, 
                tags: JSON.parse(row.tags), 
                movies: JSON.parse(row.movies)
            }
        });

        callback(null, result);        
    });
}

function getListById(listId: number, callback: Function) {
    const query = 'SELECT * FROM lf_lists WHERE id = ?';
    const params = [listId];
    
    connection.query(query, params, (error, rows: OkPacket) => {
        if (error)
            callback(error);

        callback(null, rows);
    });
}

function getListsByUser(userId: number, callback: Function) {
    const query = 'SELECT * FROM lf_lists WHERE user_id = ?';
    const params = [userId];

    connection.query(query, params, (error, rows: OkPacket) => {
        if (error) {
            callback(error);
            return;
        }

        callback(null, rows);
    });
}


function createList(list: LFList, callback: Function) {
    
    getUserById(list.user_id, (error: MysqlError, data: LFUser[]) => {
        if(error || !data.length) {
            callback(error);
            return;
        }

        const query = `INSERT INTO lf_lists (id, user_id, name, tags, ranked, movies) VALUES (NULL, ?, ?, ?, ?, ?)`;
        const params = [
            list.user_id,
            list.name,
            JSON.stringify(list.tags), 
            list.ranked,
            JSON.stringify(list.movies),
        ];

        connection.query(query, params, (error, rows: OkPacket) => {
            if(error) {
                callback(error);
                return;
            }
            
            callback(null, rows.insertId);
        });
    });
}


function updateList(list: LFList, callback: Function) {
    const query = 'UPDATE lf_lists SET name = ?, tags = ?, ranked = ?, movies = ? WHERE id = ?;';
    const params = [
        list.name, 
        JSON.stringify(list.tags), 
        list.ranked,
        JSON.stringify(list.movies),
        list.id
    ];

    connection.query(query, params, (error, rows:OkPacket) => {
        if(error) {
            callback(error);
            return;
        }

        callback(null, rows.affectedRows);
    });
}


function deleteList(listId: number, callback: Function) {
    const query = 'DELETE FROM lf_lists WHERE id = ?;'
    const params = [listId];

    connection.query(query, params, (error, rows: OkPacket) => {
        if(error) {
            callback(error);
            return;
        } 
        
        callback(null, rows.affectedRows);
    });
}

function getUserById(userId: number, callback: Function) {
    const query = "SELECT * FROM lf_users WHERE id = ?;";
    const params = [userId];

    connection.query(query, params, (error, rows:OkPacket) => {
        if(error) {
            callback(error); 
            return;
        }
        
        callback(null, rows);
    });
}

/**
 * EXPORTS METGO
 */

const DataAccess = {
    connection,
    getLists,
    getListById,
    getListsByUser,
    createList,
    updateList,
    deleteList
}

export { DataAccess, connectDB }
