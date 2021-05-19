import {connection as sql} from '../database/db.js';

export const PostService = {

    create: (newPost, result) => {
        sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, {...newPost});
            }
        });
    },

    getAll: (result) => {
        sql.query("SELECT * FROM posts", (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        })
    }
}