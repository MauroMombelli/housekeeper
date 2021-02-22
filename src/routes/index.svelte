<script lang='ts'>

	
	import { Task } from './task'
	import { Interval, DateTime, Duration } from 'luxon'
	
	import {flip} from "svelte/animate";
	import {dndzone} from "svelte-dnd-action";

	import { taskList, taskListComplete } from './stores.js';

	let titolo = 0;
	setInterval(() => titolo += 1, 1000);

	let newTaskName:string;

	class ExecutingTask{
		constructor(public task: Task, public start: DateTime) {}
	}

	let activity: ExecutingTask|undefined;
	let currentTaskDuration: string;

	setInterval(function(){
		if (activity){
			currentTaskDuration = Interval.fromDateTimes(activity.start, DateTime.local()).toDuration().toFormat("d hh:mm:ss");
		}
	}, 1000);

	function saveTask() {
		if (newTaskName && newTaskName !== '' && $taskList.filter((task) => task.name === newTaskName).length == 0 ){
			$taskList = [new Task(newTaskName), ...$taskList];
		}
	}

	let interval: number | undefined;

	function startTask(task: Task) {
		if (activity){
			stopCurrentTask();
		}
		activity = new ExecutingTask(task, DateTime.local());
		currentTaskDuration = '0';

		// alert evety 30 minutes to remeber update the task status
		interval = setInterval(function(){
			alert('update your task!');
			let audio = new Audio('audio_file.mp3');
			audio.play();
		}, 30 * 60 * 1000);
	}

	function stopCurrentTask() {
		if (interval)
			clearInterval(interval);

		if (activity){
			let interval = Interval.fromDateTimes(activity.start, DateTime.local());
			// add the interval only if longer than a minute!
			if (interval.toDuration() >= Duration.fromMillis(60*1000)) {
				
			}else{
				alert('under a minute, should not add the interval');
			}
			activity.task.intervals = [...activity.task.intervals, interval.toISO() ];
			$taskList = $taskList; // tell svelte the list has changed!
		}
		activity = undefined;
	}

	function completeCurrentTask(){
		if (activity){
			$taskListComplete = [...$taskListComplete, activity.task];
			$taskList = $taskList.filter( (task) => task.id != activity?.task.id );
			stopCurrentTask();
		}
	}

	function handleDndConsider(e: any) {
		$taskList = e.detail.items;
	}
	function handleDndFinalize(e: any) {
		$taskList = e.detail.items;
	}
	/*
	async function main () {
		import IPFS from "ipfs"
		import OrbitDb from "orbit-db"

		const ipfsOptions = { repo: './ipfs', }
		const ipfs = await IPFS.create(ipfsOptions)
		const orbitdb = await OrbitDB.createInstance(ipfs)

		const options = {
			// Give write access to everyone
			accessController: {
				write: ['*']
			}
		}

		const db = await orbitdb.keyvalue('first-database', options)

		console.log(db.address.toString())

		//const taskList = db.get('tasks')
		//const taskListComplete = db.get('tasksComplete')

		//await db.put('tasks', JSON.stringify(taskList));
		//await db.put('tasksComplete', JSON.stringify(taskListComplete));
	}

	main ();
	*/

	const flipDurationMs = 300;
</script>

<style>
	h1 {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	.task {
		min-height: 40px;
		line-height: 40px;
  		width: 100%;
		border-style: solid;
		border-width: 1px;
		border-color: gray;
		display: flex;
	}

	.taskButton {
		width:20%;
	}

	* { 
		background-color: inherit; 
		color:white;
	}
</style>

<svelte:head>
	<title>{titolo}</title>
</svelte:head>

<h1>Great success!</h1>
<div class='task'>
	{#if activity}
		<button class='taskButton' on:click={stopCurrentTask}>Stop</button><button class='taskButton' on:click={completeCurrentTask}>Complete</button> &#8594; {activity.task.name} started at {activity.start.toFormat("HH:mm:ss")} current duration {currentTaskDuration}
	{:else}
		No running task
	{/if}
</div>

<div class='task'><button class='taskButton' on:click={saveTask}>Add new task</button><input style='flex-grow: 100;' bind:value={newTaskName}></div>

<section use:dndzone="{{ items: $taskList, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
    {#each $taskList as item(item.id)}
    	<div class='task' animate:flip="{{duration: flipDurationMs}}"><button class='taskButton' on:click={() => startTask(item)}>Start</button>{item.name}</div>
    {/each}
</section>

