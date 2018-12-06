import { Request, Response } from "express";
import { getManager, Index } from "typeorm";
import { Post } from "../entity/Post";
import { Category } from "../entity/Category";

/**
 * Loads all posts from the database.
 */
export async function postGetAllAction(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const postRepository = getManager().getRepository(Post);
    const categoryRepository = getManager().getRepository(Category);
    

    let currentDate = new Date()

    let post = new Post()
    // post.id = 8
    post.title = '333'
    post.text = '333'
    post.regdate = currentDate
    post.modifydate = currentDate
    // post.categoryid = 6
    // post.category = category
    
    let category = new Category()
    // category.id = 6
    category.name = '444'
    category.post = post

    let result = await categoryRepository.save(category)
    // await categoryRepository.remove(category)

    // load a post by a given post id
    const posts = await postRepository.find();
    const categorys =  await categoryRepository.find();

    // return loaded posts
    let data = {
        posts : posts,
        categorys: categorys
    }
    response.send(data);
}

export async function pushAction(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const postRepository = getManager().getRepository(Post);

    // load a post by a given post id
    const posts = await postRepository.find();

    let inputMailToList = []
    let inputMailCcList = []
    let inputMailBccList = []
    let inputMailToNames = ""
    let inputMailCcNames = ""
    let inputMailBccName = ""

    if (inputMailToList.length === 0) {
        let mailAddList = []
        inputMailToNames.split(';').forEach(name => {
            mailAddList.push(this.createMailAdd(name, 1))
        })
        inputMailCcNames.split(';').forEach(name => {
            mailAddList.push(this.createMailAdd(name, 2))
        })
        inputMailBccName.split(';').forEach(name => {
            mailAddList.push(this.createMailAdd(name, 3))
        })
        // insert mailaddlist
        // await mailaddlistService.create(mailAddList)
    } else {
        let mailAddListUpdate = []
        let mailAddListInsert = []
        let mailAddListDelete = []
        if(inputMailToNames.split(';').length === inputMailToList.length){
            inputMailToNames.split(';').forEach((item, index) => {
                let mailAdd = inputMailToList[index]
                mailAdd.name = item
                mailAddListUpdate.push(mailAdd)
            })
        }
        if(inputMailToNames.split(';').length > inputMailToList.length){
            inputMailToList.forEach((item, index) => {
                let name = inputMailToNames.split(';')[index]
                let mailAdd = {
                    id : item.id,
                    name: name
                }
                mailAddListUpdate.push(mailAdd)
            })
        }
        if(inputMailToNames.split(';').length < inputMailToList.length){
            
        }

        if(inputMailCcNames.split(';').length === inputMailToList.length){
            inputMailCcList.forEach((item, index) => {
                let name = inputMailCcNames.split(';')[index]
                let mailAdd = {
                    id : item.id,
                    name: name
                }
                mailAddListUpdate.push(mailAdd)
            })
        }
        if(inputMailBccName.split(';').length === inputMailBccList.length){
            inputMailBccList.forEach((item, index) => {
                let name = inputMailBccName.split(';')[index]
                let mailAdd = {
                    id : item.id,
                    name: name
                }
                mailAddListUpdate.push(mailAdd)
            })
        }

    }
    // return loaded posts
    response.send(posts);
}

function createMailAdd(name: String, type: number) {
    let sysmail = { mailAddType: null }
    sysmail.mailAddType = type
    let mailAdd = {
        id: null,
        name: name,
        sysmail: sysmail
    }
    return mailAdd
}





