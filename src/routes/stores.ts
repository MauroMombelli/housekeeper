import { writable } from 'svelte/store';

import type { Task } from './task';

const createWritableStore = (key: string, startValue: Task[]) => {
    const { subscribe, set } = writable(startValue);
    
    if(typeof window !== 'undefined') {
      const json = localStorage.getItem(key);
    
      if (json) {
        set(JSON.parse(json));
      }
    }
    
    subscribe(current => {
      if(typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(current));
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