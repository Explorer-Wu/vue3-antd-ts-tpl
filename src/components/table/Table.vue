<template>
  <div class="table">
    <div class="theader">
      <div class="row">
        <div class="cell" v-for="(item, index) of columns" :key="'header_cell_' + index"
          :style="{...getCellStyle(index)}">
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="tbody-wrapper">
      <div class="tbody scroll">
        <div class="row" v-for="(item, index) of data" :key="index">
          <div class="cell" v-for="(value, index0) in item" :key="index0"
            :style="{...getCellStyle(index0)}">{{value}}</div>
        </div>
      </div>
    </div>
    <div v-if="total != null" class="pager-wrapper">
      <a-pagination show-quick-jumper :default-current="pageNum" :total="total"
        @change="onPageChange" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
    },
    total: {
      type: Number,
      default: () => null,
    },
    pageNum: {
      type: Number,
      default: () => 1,
    },
    onPageChange: Function,
  },
  setup(props: any) {
    function getCellStyle(index: number, cell?: any) {
      const column = props.columns[index];
      if (column && column.width) {
        return {
          flex: 'none',
          width: column.width,
        };
      }
      return {
        flex: 1,
      };
    }

    return {
      getCellStyle,
    };
  },
});
</script>
<style lang="scss">
.table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  .row {
    display: flex;

    .cell {
      flex: 1;
      padding: 0.25rem 0.2rem;
      font-size: 0.7rem;
    }
  }
  .theader {
    padding-right: 5px; // 滚动条位置
    .row {
      background: #0a2933;
      .cell {
        color: #ac8ece;
      }
    }
  }
  .tbody-wrapper {
    flex: 1 0 auto;
    overflow: hidden;
    height: 0;
  }
  .tbody {
    // flex: 1;
    height: 100%;
    overflow: auto;
    .row {
      .cell {
        color: #92c5d6;
      }

      &:hover {
        .cell {
          background: #1e2f40;
        }
      }
    }
  }
}
.pager-wrapper {
  margin-top: 0.75rem;

  .ant-pagination {
    .ant-pagination-prev, .ant-pagination-next {
      height: 1.25rem;
      line-height: 1.2rem;
    }
    .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link {
      background-color: #333;
      border-color: #524d54;
    }
    .ant-pagination-item {
      background-color: #333;
      border-color: #524d54;
      min-width: 1.25rem;
      height: 1.25rem;
      line-height: 1.2rem;

      &.ant-pagination-item-active {
        background-color: #374b5d;
        a {
          color: #81afda;
        }
      }

      a {
        color: #b1a5a5;
      }
    }
    .ant-pagination-options .ant-pagination-options-quick-jumper {
      color: #8a8080;

      input {
        padding: 0.05rem 0.2rem;
        background: #191818;
        border: 1px solid #423f3f;
        color: #b1a0a0;
      }
    }
  }
}
</style>
