<script lang="ts">
  import type { PageProps } from './$types';

  const props: PageProps = $props();
</script>

<h1>{props.data.article.title}</h1>
