<template>
  <div class="l-wrapper">
    <section class="l-content l-content--grey">
      <div class="l-content__in">
        <div class="p-carlist-related-car__heading">
          <h3 class="c-heading-02">{{ article.title }}</h3>
          <div class="text-right">
            <a
              class="c-link-arrow-02"
              :href="article.link.href"
              target="_blank"
            >
              {{ article.link.text }}
            </a>
          </div>
        </div>
        <div class="p-carlist-related-car">
          <ul class="p-carlist-related-car__list js-carlist-related-car">
            <li
              v-for="(item, key) in article.items"
              :key="key"
              class="p-carlist-related-car__item"
            >
              <a
                class="p-carlist-related-car__link"
                :href="item.href"
                target="_blank"
              >
                <div class="p-carlist-related-car__image">
                  <img
                    class="lazy"
                    :data-src="item.image.src"
                    :alt="item.image.alt"
                  />
                </div>
                <div class="p-carlist-related-car__title">{{ item.title }}</div>
                <div class="p-carlist-related-car__text">{{ item.text }}</div>
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
  async asyncData({ $content, params }) {
    const article = await $content("related").fetch();
    return {
      article: article.RelatedItems[params.id],
    };
  },
}
</script>
