import {createGlobalState} from 'react-hooks-global-state'
import { TaskQuery } from '../models';

const {setGlobalState, useGlobalState} = createGlobalState({
    filter: new TaskQuery
});

export {setGlobalState, useGlobalState}