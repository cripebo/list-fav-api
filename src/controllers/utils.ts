import { LFList } from '../types/types';

export function checkListData(list: LFList) {
    if(!list.name || !isString(list.name))
        return false;

    if(!list.user_id || !isNumber(list.user_id)) 
        return false;
        
    if(!list.tags || !Array.isArray(list.tags)) 
        return false;
    
    if(list.ranked == undefined || typeof list.ranked != 'boolean')
        return false;

    return true;
}

function isString(string: any) {
    return typeof string == 'string' && string.trim();
}

function isNumber(number: any) {
    return typeof number == 'number' && Number.isInteger(number);
}

export * as ControllerUtils from './utils'