<template>
  <div class="my-4 lg:grid lg:grid-cols-2 lg:gap-x-16">
    <USkeleton class="aspect-square w-full rounded-xl lg:col-start-1 lg:row-span-2 lg:self-start" />
    <div class="flex flex-col gap-4 py-4 lg:pt-0">
      <div class="flex items-center justify-between gap-4">
        <USkeleton class="h-10 w-2/3" />
        <USkeleton class="h-7 w-20" />
      </div>
      <div class="my-8 grid gap-3">
        <USkeleton class="h-4 w-1/2" />
        <USkeleton class="h-4 w-1/3" />
        <USkeleton class="h-4 w-1/4" />
      </div>
      <div class="space-y-3">
        <USkeleton class="h-5 w-full" />
        <USkeleton class="h-5 w-full" />
        <USkeleton class="h-5 w-3/4" />
      </div>
      <USkeleton class="my-12 h-11 w-full" />
    </div>
  </div>
</template>
