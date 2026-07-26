<script>
  import avatar from '$lib/assets/avatar.jpg';
  import PageContainer from '$lib/components/layouts/PageContainer.svelte';
  import Image from '$lib/components/ui/Image.svelte';
  import Link from '$lib/components/ui/Link.svelte';
</script>

<PageContainer>
  <div class="inner">
    <div class="profile">
      <Image src={avatar} alt="Yuki Yamamura's avatar" class="image" height={256} width={256} />
      <div class="name">Yuki Yamamura</div>
      <p>A software engineer @Japan</p>
    </div>
    <div class="line" aria-hidden={true}></div>
    <ul class="sns">
      <li>
        <Link href="https://github.com/example">https://github.com/example</Link>
      </li>
      <li>
        <Link href="https://x.com/example">https://x.com/example</Link>
      </li>
      <li>
        <Link href="mailto:example@exmaple.com">example@example.com</Link>
      </li>
    </ul>
  </div>
</PageContainer>

<style>
  .inner {
    margin-inline: auto;
    margin-block: auto;
  }

  .profile {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    align-items: center;
  }

  :global(.image) {
    align-self: center;
    width: 256px;
    height: 256px;
    border-radius: 100vmax;
  }

  .name {
    align-self: center;
    font-size: 1.5rem;
  }

  .line {
    width: 75%;
    height: 1px;
    margin-block: 12px;
    border-top: 1px solid;
  }

  .sns {
    padding-inline-start: 0;
  }
</style>
