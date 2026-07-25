<script>
	import { pathMap } from '../lib/utils/path';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<a href={pathMap['/articles'].get()}>Go to articles page</a>
