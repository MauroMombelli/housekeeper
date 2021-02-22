<svelte:head>
	<title>Riepilogue</title>
</svelte:head>

<script lang='ts'>
	import { Task } from './task'
	import { Interval, Duration } from 'luxon'
	import { taskList, taskListComplete } from './stores';

	var sumInterval = function(acc:Duration, ISOinterval: string){
		return acc.plus(Interval.fromISO(ISOinterval).toDuration());
	}
</script>


<style>
	* { 
		background-color: inherit; 
		color:white;
	}
</style>

<div>
	Running Tasks:
	<ul>
		{#each $taskList as task, taskIndex(task)}
			<li>
				Task: {task.name} Total elapsed: {
					task.intervals.reduce(sumInterval, Duration.fromMillis(0)).toFormat("d hh:mm:ss")
				}
				<ul>
					{#each task.intervals as interval}
						<li>duration: {interval}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
	Completed Tasks:
	<ul>
		{#each $taskListComplete as task, taskIndex(task)}
			<li>
				Task: {task.name} Total elapsed: {task.intervals.reduce(sumInterval, Duration.fromMillis(0)).toFormat("d hh:mm:ss")}
				<ul>
					{#each task.intervals as interval}
						<li>duration: {interval}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>
