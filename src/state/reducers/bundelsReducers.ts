import produce from 'immer';
import { ActionType } from '../action-types'
import { Action } from '../actions'

interface BundelsState {
    [key: string]: {
        loading: boolean,
        code: string, 
        err: string
    }
}

const initialState: BundelsState = {}

const reducer = produce((state: BundelsState = initialState, action: Action): BundelsState => {
    switch (action.type) {
        case ActionType.BUNDEL_START:
            
            return state;
        case ActionType.BUNDEL_COMPLETE:
            
            return state;
    
        default:
            return state;
    }
})


export default reducer