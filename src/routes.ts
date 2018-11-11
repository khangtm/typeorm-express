import {postGetAllAction} from "./controller/PostGetAllAction";
import {postGetByIdAction} from "./controller/PostGetByIdAction";
import {postSaveAction} from "./controller/PostSaveAction";
import {getAllAction, saveAction, deleteAction, updateAction} from "./controller/AccountAction";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/posts",
        method: "get",
        action: postGetAllAction
    },
    {
        path: "/posts/:id",
        method: "get",
        action: postGetByIdAction
    },
    {
        path: "/posts",
        method: "post",
        action: postSaveAction
    },
    {
        path: "/accounts/list",
        method: "post",
        action: getAllAction
    },
    {
        path: "/accounts/register",
        method: "post",
        action: saveAction
    },
    {
        path: "/accounts/delete/:id",
        method: "delete",
        action: deleteAction
    },
    {
        path: "/accounts/update",
        method: "put",
        action: updateAction
    },

    

];