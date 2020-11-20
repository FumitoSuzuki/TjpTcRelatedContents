<template>
  <div class="l-wrapper">
    <section class="l-content l-content--grey">
      <div class="l-content__in">
        <div class="p-carlist-related-car__heading">
          <h3 class="c-heading-02">関連記事一覧</h3>
        </div>
        <div class="">
          <ul class="">
            <li v-for="(item, key) in articles" :key="key">
              <a :href="`/related/${key}`" target="_blank">
                <div class="">{{ item.title }}</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, $params }) {
    const article = await $content("related").fetch();
    return {
      articles: article.RelatedItems,
    };
  },
}
</script>
