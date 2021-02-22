import { writable } from 'svelte/store';

import type { Task } from './task';

const createWritableStore = (key: string, startValue: Task[]) => {
    const { subscribe, set } = writable(startValue);
    
    if(typeof window !== 'undefined') {
      const json = localStorage.getItem(key);
    
      if (json) {
        var obj = JSON.parse(json,function(key, value){
          if(typeof value != 'string') return value;
          return ( value.substring(0,8) == 'function') ? eval('('+value+')') : value;
        });
        set(obj);
      }
    }
    
    subscribe(current => {
      if(typeof window !== 'undefined') {
        var string = JSON.stringify(current, function(key, value){
          return (typeof value === 'function' ) ? value.toString() : value;
        });
        localStorage.setItem(key, string);
      }
    });

    return {
      subscribe,
      set
    };
  }

export const taskList = createWritableStore('taskList', []);
export const taskListComplete = createWritableStore('taskListComplete', []);


//export const taskList = writable<Array<Task>>( localStorage.taskList ? JSON.parse(localStorage.taskList) : [] );
//export const taskListComplete = writable<Array<Task>>( localStorage.taskListComplete ? JSON.parse(localStorage.taskListComplete) : [] );