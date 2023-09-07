<template>
  <footer class="flex flex-col justify-center mx-auto w-full">
    <hr class="w-full border-1 border-gray-400 mb-4" />

    <div class="px-5 pb-8">
      <div class="container mx-auto text-center text-gray-500 text-sm">
        <p class="mb-3 font-semibold">
          © {{ new Date().getFullYear() }}
          roiLeo. All rights reserved.
        </p>

        <p class="text-sm text-gray-700">
          This website is built with
          <a
            href="https://nuxt.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:no-underline hover:text-gray-600 transition"
            >Nuxt</a
          >
          &amp;
          <s>VueStorefront UI</s>&nbsp;
          <a
            href="https://ui.nuxt.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:no-underline hover:text-gray-600 transition"
            >Nuxt UI</a
          >
          and hosted on
          <a
            href="https://netlify.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:no-underline hover:text-gray-600 transition"
            >Netlify</a
          >.
          <br />
          The source code is available on
          <a
            href="https://github.com/roiLeo/bsx-shop"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:no-underline hover:text-gray-600 transition"
            >Github</a
          >.
        </p>
      </div>
    </div>
  </footer>
</template>
