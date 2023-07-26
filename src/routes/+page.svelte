<script lang="ts">
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import { schema } from './schema'
  
    export let data: PageData;

    const { form, errors, validate, enhance } = superForm(data.form, {
        validators: schema,
		defaultValidator: "clear",
    });

    const validateFn = async (value: string) => {
        // make it always fail and show the error
        await validate('name', {
            errors: 'foo'
        })
    }
</script>
  
  <form method="POST" novalidate use:enhance>
    <label for="name">Name</label>
    <ul>
        {#each [...($errors["name"] ?? [])] as error}
            <li class="error">{error}</li>
        {/each}
    </ul>
    <input type="text" name="name" bind:value={$form.name} on:blur={async (e) => {
        // Case 1. try type in any string and unfocus the input. The validateFn is triggered, but there will be no error even I forcefully include one. I think this is because the zod schema has already been fulfilled(the schema is wider than user defined validating function)
		const value = e.target.value;
		await validateFn(value);
    }} on:input={async (e) => {
        // Case 2. try type in any string and then delete all of them so the input field will be an empty string. You will be able to see error message added by the user will be overwritten by the schema error message
        const value = e.target.value;
		await validateFn(value);
    }}/>
  
    <div><button>Submit</button></div>
  </form>

<style>
    .error {
        color: red;
    }
</style>
