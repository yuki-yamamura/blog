<script>
  import { EnvelopeSimpleIcon, GithubLogoIcon, XLogoIcon } from 'phosphor-svelte';

  import avatar from '$lib/assets/avatar.jpg';
  import PageContainer from '$lib/components/layouts/PageContainer.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import Image from '$lib/components/ui/Image.svelte';
  import Link from '$lib/components/ui/Link.svelte';
</script>

<Seo title="About | ymmr.dev" description="About Yuki Yamamura, a software engineer in Japan." />

<PageContainer>
  <div class="inner">
    <div class="profile">
      <Image src={avatar} alt="Yuki Yamamura's avatar" class="image" height={256} width={256} />
      <div class="name">Yuki Yamamura</div>
      <p>A software engineer @Japan</p>
    </div>
    <hr class="line" aria-hidden={true} />
    <div class="sns">
      <div class="sns-item">
        <GithubLogoIcon size={20} aria-hidden="true" />
        <Link href="https://github.com/yuki-yamamura">https://github.com/yuki-yamamura</Link>
      </div>
      <div class="sns-item">
        <XLogoIcon size={20} aria-hidden="true" />
        <Link href="https://x.com/yuki_yamamura">https://x.com/yuki_yamamura</Link>
      </div>
      <div class="sns-item">
        <EnvelopeSimpleIcon size={20} aria-hidden="true" />
        <Link href="mailto:laundry_sneaker.6m@icloud.com">laundry_sneaker.6m@icloud.com</Link>
      </div>
    </div>
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
    row-gap: var(--space-3);
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
    font-size: var(--font-size-2xl);
  }

  .line {
    inline-size: 75%;
    margin-inline: 0;
  }

  .sns {
    display: flex;
    flex-direction: column;
    row-gap: var(--space-2);
  }

  .sns-item {
    display: flex;
    column-gap: var(--space-2);
    align-items: center;
  }
</style>
