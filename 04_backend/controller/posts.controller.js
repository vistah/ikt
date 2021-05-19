import {PostService} from '../service/posts.service.js';

export const PostController = {
    readAll: (req, res) => {
        PostService.getAll((err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occured while getting all posts"
                });
            } else {
                console.log(result);
                res.json(result);
            }
        });
    },

    create: (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: "Content cannot be empty"
            });
        }
        const post = {...req.body};
        PostService.create(post, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occured while getting all posts"
                });
            } else {
                console.log(result);
                res.json(result);
            }
        })
    }
}