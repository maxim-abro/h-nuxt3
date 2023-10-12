<template>
  <div class="">
    <m-bread-crumbs :crumbs="blog.breadCrumbs" class="mb-4" />

    <div
      class="prose lg:prose-xl prose-stone dark:prose-invert mb-10 max-w-none prose-a:bg-[#fdb13c60]"
    >
      <h1>{{ blog.title }}</h1>
    </div>

    <div class="text-sm mb-5 flex justify-between">
      <div class="">
        {{
          new Date(blog.date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        }}
      </div>

      <div class="flex items-center">
        <button class="mr-4" @click="likeBlog(blog.lat_title)">
          <nuxt-icon name="heart" class="mr-2 hover:text-primary" />{{
            blog.likes
          }}
        </button>
        <div><nuxt-icon name="eye" class="mr-2" />{{ blog.counter }}</div>
      </div>
    </div>
    <img
      :title="blog.title"
      :src="`https://za-halyavoi.ru/api/static${blog.preview}`"
      alt=""
      class="mb-8"
    />
    <div
      class="prose lg:prose-xl prose-stone dark:prose-invert mb-10 max-w-none prose-a:bg-[#fdb13c60] prose-a:rounded prose-a:px-1 prose-a:no-underline"
      v-html="blog.body"
    ></div>

    <div class="border-t pt-5 mb-12">
      <span v-for="tag of blog.blog_tags" :key="tag.title" class="mr-2"
        >#{{ tag.title }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ComputedRef } from "vue";
import { CookieRef, useCookie } from "#app";
import MBreadCrumbs from "~/components/MBreadCrumbs.vue";
import { BlogTagsType, BlogType } from "~/types/BlogType";
import { Crumb } from "~/types/components/BreadcrumbsType";

const route = useRoute();

const response = await $fetch<BlogType>(
  `https://za-halyavoi.ru/api/blog/id/${route.params.lat_title}`,
);

const blog = reactive({
  title: response.title as string,
  date: response.date as Date,
  body: response.body as string,
  counter: response.counter as number,
  likes: response.likes as number,
  author: response.author as string,
  blog_tags: response.blog_tags as BlogTagsType[],
  preview: response.preview as string,
  description: response.description as string,
  lat_title: response.lat_title as string,
  breadCrumbs: [
    {
      link: "/blog",
      title: "Блог",
    },
    {
      link: "",
      title: response.title,
    },
  ] as Crumb[],
});

const tagsList: ComputedRef<string[]> = computed(() => {
  return blog.blog_tags.map((i) => i.title);
});
async function likeBlog(latTitle: string): Promise<void> {
  const likes: CookieRef<string[]> = useCookie("likes-blog");
  if (!likes.value) {
    await $fetch(`https://za-halyavoi.ru/api/blog/like/${latTitle}`);
    likes.value = [latTitle];
    blog.likes = blog.likes + 1;
  } else {
    const findLike = likes.value.find((i) => i === latTitle);
    if (!findLike) {
      likes.value.push(latTitle);
      await $fetch(`https://za-halyavoi.ru/api/blog/like/${latTitle}`);
      blog.likes = blog.likes + 1;
    }
  }
}

useHead({
  title: blog.title + " - za-halyavoi.ru",
  meta: [
    {
      hid: "description",
      name: "description",
      content: blog.description,
    },
    {
      hid: "keywords",
      name: "keywords",
      content: tagsList.value,
    },
    {
      property: "og:title",
      content: blog.title,
    },
    {
      property: "og:description",
      content: blog.description,
    },
    {
      property: "og:url",
      content: `https://za-halyavoi.ru${route.fullPath}`,
    },
    {
      property: "og:image",
      content: "https://za-halyavoi.ru/api/static" + blog.preview,
    },
    {
      property: "og:type",
      content: "article",
    },
    {
      property: "og:site_name",
      content: "за халявой",
    },
    {
      property: "og:image:url",
      content: "https://za-halyavoi.ru/api/static" + blog.preview,
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://za-halyavoi.ru/blog/" + blog.lat_title,
    },
  ],
});
</script>
