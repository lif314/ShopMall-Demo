<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="prevPage">上一页</button>
    <button :class="{active: pageNo==1}" v-if="startNumAndEndNum.start > 1" @click="currentPage(1)">
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-show="page >= startNumAndEndNum.start"
      @click="currentPage(page)"
      :class="{active: pageNo==page}"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="currentPage(totalPage)"
      :class="{active: pageNo==totalPage}"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="nextPage">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
// 分页器需要计算连续数字的起始和结束： 连续5个数字
<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 连续页码的起始数字与结束数字
    startNumAndEndNum() {
      const { continues, pageNo } = this;
      let start = 0,
        end = 0;
      if (continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);

        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - continues + 1;
        }
      }
      return { start, end };
    }
  },
  
  methods: {
    currentPage(curPage) {
      // 点击当前页
      this.$emit("getPageNo", curPage);
    },
    // 上一页
    prevPage() {
      this.$emit("getPageNo", this.pageNo - 1);
    },
    // 上一页
    nextPage() {
      this.$emit("getPageNo", this.pageNo + 1);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>