import { connection as sql } from './db.connection.js';

export const PostService = {
    //Funktion "create"
    create: async(newPost, result) => {
        //Resultat: gesamter eingefuegter Datensatz einschließlich id
        //newPost: enthält die Daten für title, location und image
        sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
            if (err) result(err, null);
            //...newPost: newPost-Objekt wird hier eingesetzt, separiert in Schluessel-Werte-Paare
            else result(null, { id: res.postId, ...newPost });
        });
    },
    //Funktion "findById
    findById: async(postId, result) => {
        sql.query(
            `SELECT * FROM posts WHERE id = ?`, [postId],
            (err, res) => {
                //Fehler
                if (err) result(err, null);
                //ID nicht gefunden
                else if (res.length) result(null, res[0]);
                //Datensatz nicht gefunden
                else result({ message: "post not found" }, null);
            }
        );
    },

    //Funktion "getAll"
    getAll: async(result) => {
        sql.query("SELECT * FROM posts", (err, res) => {
            if (err) result(null, err);
            else result(null, res);
        });
    },
    //Funktion updateById
    updateById: async(id, post, result) => {
        sql.query(
            "UPDATE posts SET ? where id= ?", [post, id],
            (err, res) => {
                if (err) result(null, err);
                else if (res.affectedRows == 0) result({ message: "post not found" }, null);
                else result(null, { id: id, ...post });
            }
        );
    },
    //Funktion "remove"
    remove: async(id, result) => {
        sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
            if (err) result(null, err);
            else if (res.affectedRows == 0) result({ message: "post not found" }, null);
            else result(null, res);
        });
    },
    //Funktion "removeAll"
    removeAll: async(result) => {
        sql.query("DELETE FROM posts", (err, res) => {
            if (err) result(null, err);
            else result(null, res);
        });
    },

    /*getTitle: async(title, result) => {
        sql.query("SELECT title FROM posts", (err, res) => {
            if (err) result (null, err);
            else if (res.affectedRows == 0) result({ message: "post not found" }, null);
            else result(null, res);
        });
    }*/
};