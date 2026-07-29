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
    <hr class="line" aria-hidden={true} />
    <ul class="sns">
      <li>
        <Link href="https://github.com/yuki-yamamura">https://github.com/yuki-yamamura</Link>
      </li>
      <li>
        <Link href="https://x.com/yuki_yamamura">https://x.com/yuki_yamamura</Link>
      </li>
      <li>
        <Link href="mailto:laundry_sneaker.6m@icloud.com">laundry_sneaker.6m@icloud.com</Link>
      </li>
    </ul>
  </div>
</PageContainer>

<style>
  .inner {
    margin-block: auto;
    margin-inline: auto;
  }

  .profile {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    align-items: center;
  }

  :global(.image) {
    align-self: center;
    inline-size: 256px;
    block-size: 256px;
    border-radius: 100vmax;
  }

  .name {
    align-self: center;
    font-size: 1.5rem;
  }

  .line {
    inline-size: 75%;
    margin-inline: 0;
  }

  .sns {
    padding-inline-start: 0;
    list-style-position: inside;
  }
</style>
