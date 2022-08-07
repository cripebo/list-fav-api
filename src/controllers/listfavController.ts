import { DataAccess } from "../services/db";
import { Request, Response } from "express";
import { MysqlError } from "mysql";
import { LFList } from "../types/types";
import { ControllerUtils } from "./utils";


/**
 * GET all existing list on DB
 */
export async function getLists(_req: Request, res: Response) {
    DataAccess.getLists((error: MysqlError, data: LFList[]) => {
        if (error) 
            res.status(500).send('Internal DB error');
        
        res.status(200).json(data);
    });
}

export async function getListById(req: Request, res: Response) {
    const listId = parseInt(req.params.id);

    DataAccess.getListById(listId, (error: MysqlError, data: LFList) => {
        if (error) {
            console.log(error)
            res.status(500).send('Internal DB error');
        }
            
            res.status(200).json(data);
    });    
}

export async function getListsByUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    
    DataAccess.getListsByUser(userId, (error: MysqlError, data: LFList) => {
        if (error) {
            res.status(500).send('Internal DB error');
        }
            
            res.status(200).json(data);
    }); 
}

/**
 * INSERT a list into DB
 */
export async function createList(req: Request, res: Response) {
    const list: LFList = req.body;

    if(!ControllerUtils.checkListData(list)) {
        res.status(500).json({error: 'Bad request data'});
        return;
    }

    DataAccess.createList(list, (error: MysqlError, data: number) => {
        if (error) {
            res.status(500).json({error: 'Bad request data'});        
            return;
        }
        
        res.status(200).json({data});
    });
}


/**
 * UPDATE a list from DB
 */
export async function updateList(req: Request, res: Response) {
    const list: LFList = req.body;

    if(!list.id || !ControllerUtils.checkListData(list)) {
        res.status(500).json({error: 'Bad request data'});
        return;
    }

    DataAccess.updateList(list, (error: MysqlError, data: number) => {
        if (error) 
            res.status(500).json({error: 'Bad request data'});
        
        res.status(200).json({data});
    });
}


/**
 * DELETE a list from DB
 */
export async function deleteList(req: Request, res: Response) {
    const listId = req.body.id;

    if(!listId) {
        res.status(500).send();
        return;
    }
    
    DataAccess.deleteList(listId, (error: MysqlError, data: number) => {
        if (error) 
            res.status(500).send(error.code);
        
        res.status(200).json({data});
    });
}