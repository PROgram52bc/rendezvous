<template>
	<div class="field">
		<label class="label">{{label}}</label>
		<div class="control">
			<input class="input is-success" v-bind:type="type" v-bind:placeholder="placeholder" v-bind:name="name" v-on:input="$emit('input', $event.target.value)">
		</div>
	</div>
</template>
<script>
export default {
	props: ['label', 'type', 'name', 'placeholder', 'value']
}
</script>
