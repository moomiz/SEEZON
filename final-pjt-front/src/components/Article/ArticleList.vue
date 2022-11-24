<template>
  <div style="width: 100%; min-height: 100vh;">
    <!-- {{ newArticlesList }} -->
    <!-- {{ articles }} -->
    <table style="margin: 0" class="mb-3">
      <tr>
        <th>MOVIE</th>
        <th class="w-50">TITLE</th>
        <th>LIKE</th>
        <th>WRITER</th>
        <th>CREATED</th>
      </tr>
      <ArticleListItem
        v-for="article in newArticles"
        :key="article.id"
        :article=article 
      />
    </table>
    <div>
      <button :disabled="pageNum === 0" @click="prevPage">Back</button>
      <span>{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage">Next</button>
    </div>
    <!-- <ArticleListItem 
      v-for="article in articles"
      :key="article.id"
      :article=article /> -->
  </div>
</template>

<script>
import ArticleListItem from '@/components/Article/ArticleListItem';
import axios from 'axios';

export default {
  name: 'ArticleList',
  components: {
      ArticleListItem
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 0,
      articles: null,
      pageCounting: 0,
    }
  },
  methods: {
    nextPage () {
    this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    },
  },
  computed: {
    pageCount() {
      if(this.articles) {
        let listLeng = this.articles.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
        if (listLeng % listSize > 0) page += 1;
      
        return page
      } else {
        return 0
      }
    },
    newArticles() {
      if(this.articles) {
        let start = this.pageNum * this.pageSize,
          end = start + this.pageSize;
        return this.articles.slice().splice(start, end);
      } else {
        return false
      }
    },
  },
  created() {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/v2/articles/',
    }).then((res)=>{
      console.log(res)
      this.articles = res.data
    }).catch((err)=>{
      console.log(err)
    })
  }
}
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}
table th {
  font-size: 1.2rem;
}
table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}
table tr:first-of-type {
  border-top: 2px solid #404040;
}
table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}
.btn-cover .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}
.btn-cover .page-count {
  padding: 0 1rem;
}
</style>