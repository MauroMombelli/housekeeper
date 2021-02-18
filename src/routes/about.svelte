<svelte:head>
	<title>About</title>
</svelte:head>

<script lang='ts'>
	import { Duration } from 'luxon'

	import { taskList, taskListComplete } from './stores';
</script>


<style>
	* { 
		background-color: inherit; 
		color:white;
	}
</style>

<div>
	<ul>
		{#each $taskList as task, taskIndex(task)}
			<li>
				Task: {task.name} Total elapsed: {task.intervals.reduce((acc, interval)=>{return acc.plus(interval.toDuration());}, Duration.fromMillis(0)).toFormat("d hh:mm:ss")}
				<ul>
					{#each task.intervals as interval}
						<li>duration: {interval}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>

	<ul>
		{#each $taskListComplete as task, taskIndex(task)}
			<li>
				Task: {task.name} Total elapsed: {task.intervals.reduce((acc, interval)=>{return acc.plus(interval.toDuration());}, Duration.fromMillis(0)).toFormat("d hh:mm:ss")}
				<ul>
					{#each task.intervals as interval}
						<li>duration: {interval}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>
