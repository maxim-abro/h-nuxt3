<template>
  <div class="dark:bg-zinc-900">
    <h1 ref="hot" class="text-2xl font-bold mb-8">
      <nuxt-icon name="fire" class="text-primary" />
      Горячие скидки
    </h1>

    <div class="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
      <m-vertical-card
          v-for="post in posts"
          :key="post.uin"
          :post="post"
          @like="likePost($event)"
      />
    </div>
    <m-pagination
        v-model="pagination.current_page"
        :pages="pagination.total_pages"
        class="flex justify-center mb-10"
    />
    <div
        class="prose lg:prose-xl prose-stone dark:prose-invert mb-10 max-w-none"
    >
      <h2>Сайты с промокодами – экономить легко!</h2>
      <p>
        Возможность сэкономить и найти товар или услугу по скидке – это отличный
        способ спасти бюджет от лишних расходов. Купонные распродажи появились
        не так давно – в 2008 году появился первый сайт с горячими скидками, и
        сервис тут же приобрел популярность.
      </p>

      <p>
        Широкий ассортимент продукции и услуг на сайтах с промокодами и скидками
        позволяет выгодно приобрести бытовую технику, косметику, товары для
        автомобиля или сада и огорода, а также посетить аквапарки, парки
        развлечений. На сайтах можно найти купоны, чтобы сделать маникюр или
        прическу дешевле в несколько раз или полететь всей семьей в отпуск.
      </p>

      <p>
        Для получения скидки иногда необходимо оплатить купон, в других случаях
        достаточно просто выбрать заинтересовавшее предложение. Купон может
        предоставлять скидку на услугу или товар при его использовании, либо
        вообще полностью покрывает стоимость.
      </p>

      <p>
        При выборе купона стоит учитывать, что акции ограничены по времени
        проведения, купон необходимо использовать до истечения определенного
        срока. Иногда на акции выставляется ограничение, и каждому посетителю
        сайта в руки можно получить только один купон.
      </p>

      <p>
        При использовании купона важно обратить внимание, что он может
        распространяться на определенные часы работы или дни (например, скидки
        на аквапарки по будним дням), или только на некоторые услуги.
      </p>

      <h2>Преимущества сайтов с промокодами и скидками</h2>
      <p>
        Система работы сайтов со скидками очень простая, все участники программы
        имеют свои плюсы:
      </p>

      <ul>
        <li>выгодные предложения и экономия для посетителей сайтов;</li>
        <li>реклама и привлечение новых клиентов для продавца;</li>
        <li>
          сайты с промокодами и скидками играют роль посредников между клиентам
          и продавцом, поэтому получают свою долю прибыли от продажи купонов или
          проценты за размещение на сайте.
        </li>
      </ul>

      <p>
        Как и во многих сервисах, при обращении к сайту следует внимательно
        прочитать все условия, чтобы избежать недобросовестных продавцов и
        выбирать только проверенные сервисы.
      </p>

      <h2>Где найти самые лучшие скидки?</h2>

      <p>
        Сайт https://za-halyavoi.ru/ - это огромный каталог скидок и промокодов
        на широчайший ассортимент товаров и услуг.
      </p>

      <p>
        Сотрудники сервиса тщательно анализируют рынок и отбирают только самые
        полезные и выгодные промокоды для максимальной прибыли клиентов. С нашим
        сервисом вы сможете не только приобрести нужные товары, но и сохранить
        бюджет для приятных подарков себе и своим близким.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import MVerticalCard from '~/components/cards/MVerticalCard.vue'
import MPagination from '~/components/MPagination.vue'
import {useAsyncData, useCookie} from "#app";
import {LocationQueryValue, useRoute, useRouter} from "vue-router";
import {Ref} from "@vue/reactivity";
import {UnwrapRef} from "vue";
import {ResponsePosts} from "~/types/pages/IndexPageTypes";
import {PostType} from "~/types/PostType";
import {useSeoStore} from "~/store/seo.store";
const route = useRoute()
const router = useRouter()
const seo = useSeoStore()
const page:Ref<UnwrapRef<number|string|LocationQueryValue[]>> = ref(route.query.page || 1)


const postRes = await $fetch<ResponsePosts>(`https://za-halyavoi.ru/api/post?page=${page.value}`)

const pagination = ref({
  current_page: route.query.page || 1 as number|string|LocationQueryValue[],
  total_elements: postRes.count as number,
  total_pages: Math.ceil(postRes.count / 15) as number,
})
const posts:Ref<UnwrapRef<PostType[]>> = ref(postRes.rows)

useHead({
  title: `Промокоды, скидки и акции для сайтов и интернет-магазинов на ${seo.month} ${seo.year} год`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      // @ts-ignore
      content: `Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      // @ts-ignore
      content: `сайты, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${seo.month}`,
    },
    {
      property: 'og:title',
      // @ts-ignore
      content: `Промокоды, скидки и акции для сайтов и интернет-магазинов на ${seo.month} ${seo.year} год`,
    },
    {
      property: 'og:description',
      // @ts-ignore
      content: `Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
    },
    {
      property: 'og:url',
      // @ts-ignore
      content: `https://za-halyavoi.ru${route.fullPath}`,
    },
    {
      property: 'og:image',
      content: 'https://za-halyavoi.ru/logo.png',
    },
    {
      property: 'og:type',
      content: 'article',
    },
    {
      property: 'og:site_name',
      content: 'за халявой',
    },
    {
      property: 'og:image:url',
      content: 'https://za-halyavoi.ru/logo.png',
    },
  ],
  link: [
    {
      rel: 'canonical',
      // @ts-ignore
      href: 'https://za-halyavoi.ru/',
    },
  ],
})

watch(() => pagination.value.current_page, async (query: string | number | LocationQueryValue[]) => {
  await router.push({
    query:{
      page: pagination.value.current_page.toString()
    }
  })
  const postRes = await $fetch<ResponsePosts>(`https://za-halyavoi.ru/api/post?page=${query}`)
  posts.value = postRes.rows
  // this.$refs.hot.scrollIntoView({ block: 'start', behavior: 'smooth' })
})

async function likePost(uin:string) {
  const likes = useCookie('likes')
  console.log(likes.value)
  if (!likes.value) {
    await $fetch(`https://za-halyavoi.ru/api/post/like/${uin}`)
    likes.value = [uin]
    posts.value.forEach((i:PostType) => {
      if (i.uin === uin) {
        i.rating = i.rating + 1
      }
    })
  } else {
    const findLike = likes.value.find((i:string) => i === uin)
    if (!findLike) {
      likes.value.push(uin)
      await $fetch(`https://za-halyavoi.ru/api/post/like/${uin}`)
      posts.value.forEach((i:PostType) => {
        if (i.uin === uin) {
          i.rating = i.rating + 1
        }
      })
    }
  }
}
</script>
