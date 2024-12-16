<template>
  <div :class="wrapClass">
    <a-table
      ref="refTable"
      :loading="loading"
      :size="size"
      :dataSource="dataSource"
      :columns="columns"
    />

    <el-table
      ref="refTable"
      v-loading="loading"
      :size="size"
      :data="tableData"
      :class="tableClass"
      :cell-class-name="tableCellClass"
      :header-row-class-name="headerRowClass"
      :tooltip-effect="tableTheme"
      :height="height"
      :min-height="minHeight"
      :max-height="maxHeight"
      :row-key="rowId"
      :border="isBorder"
      :stripe="isStripe"
      :default-expand-all="defExpand"
      :tree-props="treeConfig"
      @select="selected"
      @select-all="selectedAll"
    >
      <!-- 空列表 -->
      <template slot="empty">
        <img src="@/assets/images/icons/iconNodata.png" />
        <p>暂无数据</p>
      </template>
      <!-- 空列表 / -->
      <el-table-column v-if="isSelection" type="selection" width="42" />
      <ex-table-column
        v-for="column in columns"
        :key="column.prop"
        v-bind="column"
      />
    </el-table>
    <!-- <p v-else class="tip-null">
      {{ tipNull }}
    </p> -->
    <div v-if="frontPage || serverPage" class="page-bar">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="sizeOpts"
        :page-size="pageSize"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange($event, pageSize)"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ExTableColumn from "./extablecolumn";

export default {
  name: "TablePaging",
  components: {
    ExTableColumn,
  },
  props: {
    loading: {
      type: Boolean,
      default: () => false,
    },
    size: {
      type: String,
      default: () => "medium",
    },
    rowId: {
      type: String,
      default: () => "id",
    },
    defExpand: {
      type: Boolean,
      default: () => false,
    },
    isStripe: {
      type: Boolean,
      default: () => false,
    },
    isBorder: {
      type: Boolean,
      default: () => false,
    },
    isSelection: {
      type: Boolean,
      default: () => false,
    },
    height: {
      type: [Number, String],
      default: () => "auto",
    },
    minHeight: {
      type: [Number, String],
      default: () => "auto",
    },
    maxHeight: {
      type: [Number, String],
      default: () => "auto",
    },
    tableData: {
      type: Array,
      required: true,
      default: () => [],
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    treeConfig: {
      type: Object,
      required: false,
      default: () => {},
    },
    total: {
      type: Number,
      default: () => null,
    },
    tipNull: {
      type: String,
      default: "没有查到相关数据！",
    },
    wrapClass: {
      type: String,
      required: false,
      default: "",
    },
    tableClass: {
      type: String,
      required: false,
      default: "table-box",
    },
    headerRowClass: {
      type: String,
      required: false,
      default: "header-cor",
    },
    tableTheme: {
      type: String,
      required: false,
      default: "light",
    },
    tableCellClass: {
      type: Function,
      required: false,
      default: () => null,
    },
    selected: {
      type: Function,
      required: false,
      default: () => null,
    },
    selectedAll: {
      type: Function,
      required: false,
      default: () => null,
    },
    frontPage: {
      type: Boolean,
      default: () => false,
    },
    serverPage: {
      type: Boolean,
      default: () => false,
    },
    sizeOpts: {
      type: Array,
      default: () => [10, 20, 30, 50, 100, 200],
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: () => 10,
    },
    // lang: {
    //   type: String,
    //   default: 'cn',
    // },
  },
  data() {
    return {};
  },
  computed: {
    noData() {
      return !this.tableData.length; // || this.loading
    },
  },
  methods: {
    handleSizeChange(val) {
      // this.pageSize = val;
      this.handleCurrentChange(1, val);
    },
    handleCurrentChange(page, size) {
      // this.currentPage = page;
      this.$emit("pageChange", page, size);
    },
    getTableRef() {
      return this.$refs.refTable;
    },
  },
};
</script>

<style lang="less">
.table-box {
  width: 100%;
}
.el-table {
  td {
    color: #333;
    .btn-td {
      color: #00a89a !important;
      span {
        font-weight: bold;
        text-decoration: underline;
      }
    }
    .link {
      color: #00a89a !important;
    }
  }
  .header-cor th {
    font-weight: 600;
    color: #000;
    // background-color: #f6f6f8 !important; // #95b9ff f8f8f9
  }
  tr:hover td {
    // background-color: #f0faff !important;
  }
}
.page-bar {
  width: 100%;
  height: 50px;
  line-height: 38px;
  padding: 10px 0;
  text-align: right;
  span {
    margin: auto 5px;
  }
}
.tip-null {
  color: #e25a5a;
  text-align: center;
  padding-top: 100px;
}
.el-tooltip__popper {
  max-width: 500px !important;
  height: auto !important;
  white-space: pre-wrap; //保留空白符序列，但是正常地进行换行
  word-wrap: break-word !important;
  word-break: break-all !important;
}
.el-button--mini {
  padding: 5px !important;
}
.el-table__empty-block {
  width: 100% !important;
}
</style>
