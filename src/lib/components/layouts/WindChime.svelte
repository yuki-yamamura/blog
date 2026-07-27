<div aria-hidden="true" class="base">
  <div class="swing">
    <svg class="chime" viewBox="0 0 96 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- hanging string — long enough that the bowl hangs well below the header -->
      <path d="M48 0C46 32 49.5 85 48.2 128" />
      <!-- glass bowl -->
      <path d="M31.5 160.1C27.6 143.6 31.8 129.2 48 128C64.4 129 68.6 143.8 64.7 160.4" />
      <!-- wavy mouth of the bowl -->
      <path
        d="M31.5 160.1C35 158.2 37.5 161.9 40.6 160.8C43.7 159.7 45.5 162.2 48.6 161.2C51.7 160.2 53.4 162.6 56.6 161.4C59.4 160.3 61.8 162.2 64.7 160.4"
      />
      <!-- clapper string, drawn only below the mouth so it doesn't show through the glass -->
      <path d="M48 161.5C47.7 168 48.2 176 47.9 183" />
      <circle cx="48" cy="167.5" r="2.6" />
      <g class="tanzaku">
        <g class="tanzaku-swing">
          <!-- tanzaku (paper strip) -->
          <path d="M40.8 183.4L55.4 184L54.6 249.2L40 248.4L40.8 183.4Z" />
        </g>
      </g>
    </svg>
  </div>
</div>

<style>
  .base {
    position: fixed;
    top: 0;

    /* centered in the free margin to the right of the 1280 content column */
    right: calc((100vw - 1280px) / 4);
    z-index: 1;
    display: block;
    pointer-events: none;
    transform: translateX(50%);
  }

  .swing {
    transform-origin: 50% 0;
  }

  .base[data-swinging='true'].swing {
    animation: swing 5.2s ease-in-out;
  }

  .chime {
    inline-size: 76px;
    block-size: auto;
    stroke: #000000a8;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* at rest only the paper catches the breeze; the bowl stays still */
  .tanzaku {
    transform-origin: 50% 0;
    transform-box: fill-box;
    animation: tanzaku-breeze 5.5s ease-in-out infinite;
  }

  .tanzaku-swing {
    transform-origin: 50% 0;
    transform-box: fill-box;

    .base[data-swinging='true'] & {
      animation: tanzaku-flutter 5.2s ease-in-out;
    }
  }

  /* a damped pendulum: constant period, decaying amplitude */
  @keyframes swing {
    0% {
      transform: rotate(0deg);
    }

    14% {
      transform: rotate(7deg);
    }

    32% {
      transform: rotate(-5.2deg);
    }

    50% {
      transform: rotate(3.6deg);
    }

    66% {
      transform: rotate(-2.2deg);
    }

    80% {
      transform: rotate(1.2deg);
    }

    91% {
      transform: rotate(-0.5deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes tanzaku-breeze {
    0%,
    100% {
      transform: rotate(-2.6deg);
    }

    50% {
      transform: rotate(2.6deg);
    }
  }

  /* the paper trails the bowl, so it flutters in counter-phase */
  @keyframes tanzaku-flutter {
    0% {
      transform: rotate(0deg);
    }

    18% {
      transform: rotate(-4.5deg);
    }

    36% {
      transform: rotate(3.4deg);
    }

    54% {
      transform: rotate(-2.4deg);
    }

    70% {
      transform: rotate(1.4deg);
    }

    84% {
      transform: rotate(-0.7deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .swing,
    .tanzaku,
    .tanzaku-swing {
      animation: none;
    }
  }
</style>
