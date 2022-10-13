import {Post} from '../models/posts.model.js'
import  { Author } from '../models/authors.model.js'


function getAll(){
    return Post.find({})//regresa la promesa que utilizaré en los routers(presenters)
}


async function create(newPost, userCurrent, userCurrent){
    let postCreated = await Post.create({...{...newPost, author: userCurrent}, author: userCurrent})

    await Author.findByIdAndUpdate(newPost.author, {$push: {posts: postCreated._id}})

    return postCreated
}

function update(idPost, unupdatedPost){
    return Post.findByIdAndUpdate(idPost, unupdatedPost, {new:true})
}

function getById(idPost){
    return Post.findById(idPost)
}

function deleteById(idPost){
    return Post.findByIdAndDelete(idPost)
}




//export default le puedo cambair de nombre y con export asi como la exporto asi la tengo que llamar 


export {
    getAll,
    create,
    update,
    deleteById,
    getById,
}