import { Request, Response } from "express";
import { getManager, Not, In, Like, IsNull } from "typeorm";
import { Account } from "../entity/Account";
import { Post } from "../entity/Post";
import { Address } from "../entity/Address";
import { access } from "fs";


export async function getAllAction(request: Request, response: Response) {

    const searchCondition = request.body
    console.log(searchCondition);
    // const searchCondition = {
    //     paging : {pageSize: 10, pageNo: 1},
    //     condition : {username: 'Vis',role: 'Admin'},
    //     sortBy : {column : 'account.username', order: "DESC"}
    // }

    const limit: number = searchCondition.paging.pageSize
    const offset = searchCondition.paging.pageSize * (searchCondition.paging.pageNo - 1)

    let username = searchCondition.condition.username
    let role = searchCondition.condition.role
    let sortBy = searchCondition.sortBy


    // get repository 
    const accountRepository = getManager().getRepository(Account)
    const queryBuilder = await accountRepository
        .createQueryBuilder("account")
        .leftJoinAndSelect("account.role", "role")
        .leftJoinAndSelect("account.address", "address")

    // appen search condition
    if (username)
        queryBuilder.andWhere("account.username LIKE :username", { username: "%" + username + "%" })
    if (role)
        queryBuilder.andWhere("role.name = :role", { role: role })
    if (sortBy) {
        let order: any = sortBy.order
        queryBuilder.orderBy(sortBy.column, order)
    }

    const sql = await queryBuilder.getSql()
    const count = await queryBuilder.getCount()
    const accounts = await queryBuilder.skip(offset).take(limit).getMany()
    // console.log(sql)
    // return loaded posts
    const data = {
        totalItems: count,
        items: accounts
    }
    response.send(data)
    return
}

/**
 * Saves given post.
 */
export async function saveAction(request: Request, response: Response) {

    try {

        // validate input data
        // console.log(request.body)

        // get repository
        const accountRepository = getManager().getRepository(Account);

        // check username is duplicated
        let checkDuplicate = await accountRepository.count({ username: request.body.username })
        if (checkDuplicate > 0) {
            let data = {
                success: false,
                data: "Username is duplicated"
            }
            response.send(data);
            return
        }

        // inserting data process
        const currentDate = new Date()

        let address = new Address()
        address.address = request.body.address

        let account = new Account()
        account.username = request.body.username
        account.password = request.body.password
        account.status = request.body.status
        account.role = request.body.role
        account.regdate = currentDate
        account.modifydate = currentDate
        account.address = address

        // save data
        await accountRepository.save(account);

        // send response
        let data = {
            success: true,
            data: 'Register successfully'
        }
        response.send(data)
        return
    } catch (error) {
        let data = {
            success: false,
            data: error
        }
        response.send(data)
        return
    }

}

/**
 * Delete given post.
 */
export async function deleteAction(request: Request, response: Response) {

    try {

        // validate input data
        // console.log(request.params)

        // get repository
        const accountRepository = getManager().getRepository(Account);
        const addressRepository = getManager().getRepository(Address);

        // delete data
        let accountid = request.params.id
        await addressRepository.delete({ accountid: accountid })
        await accountRepository.delete(accountid)

        // send response
        let data = {
            success: true,
            data: 'Delete successfully'
        }
        response.send(data)
        return
    } catch (error) {
        let data = {
            success: false,
            data: error
        }
        response.send(data)
        return
    }

}

/**
 * Update given post.
 */
export async function updateAction(request: Request, response: Response) {

    try {

        // validate input data
        // console.log(request.body)

        // get repository
        const accountRepository = getManager().getRepository(Account);
        const addressRepository = getManager().getRepository(Address);

        // check username is duplicated
        let checkDuplicate = await accountRepository.count({
            username: request.body.username,
            id: Not(request.body.id)
        })
        if (checkDuplicate > 0) {
            let data = {
                success: false,
                data: "Data is modified"
            }
            response.send(data);
            return
        }

        // Updating data process
        const currentDate = new Date()

        // update account table by account id and modify date
        // return account id or null
        let updateResult = await accountRepository
            .createQueryBuilder()
            .update(Account)
            .set({
                username: request.body.username,
                password: request.body.password,
                status: request.body.status,
                role: request.body.role,
                modifydate: currentDate,
            })
            .where("id = :id and modifydate = :modifydate",
                { id: request.body.id, modifydate: request.body.modifydate })
            .returning("id")
            .execute()

        console.log(updateResult)

        // check data is modified
        // if update result is blank then data is modified
        // else continue update address table
        if (!updateResult.raw[0]) {
            let data = {
                success: false,
                data: "Data is modified"
            }
            response.send(data)
            return
        } else {

            // update address table
            await addressRepository.createQueryBuilder()
                .update(Address)
                .set({ address: request.body.address })
                .where("accountid = :accountid", { accountid: request.body.id })
                .execute()

            // send response
            let data = {
                success: true,
                data: 'Update successfully'
            }
            response.send(data)
            return
        }
    } catch (error) {
        let data = {
            success: false,
            data: error
        }
        response.send(data)
        return
    }

}

