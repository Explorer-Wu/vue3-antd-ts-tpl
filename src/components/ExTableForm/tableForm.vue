<template>
  <el-form
    ref="refTableForm"
    size="mini"
    :model="tableForm"
    :rules="tableRules"
  >
    <el-table
      :data="tableForm[formCols]"
      :span-method="spanMethod"
      row-key="idx"
      :sort="{ prop: 'idx', order: 'ascending' }"
      v-loading="loading"
      header-row-class-name="header-cor"
      :height="height"
      width="100%"
      style="width: 100%"
    >
      <template v-for="(item, index) in columns">
        <el-table-column
          v-if="item.prop"
          :key="index"
          :fixed="item.fixed"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :class-name="item.className"
          align="center"
        >
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :label="item.label"
          :fixed="item.fixed"
          :width="item.width"
          :min-width="item.minWidth"
          :class-name="item.className"
          align="center"
        >
          <el-table-column
            v-for="(col, idx) in item.childCols"
            :key="`child${idx}`"
            :fixed="col.fixed"
            :prop="col.prop"
            :label="col.label"
            :width="col.width"
            :min-width="col.minWidth"
            :class-name="item.className"
            align="center"
          >
            <template #default="scope">
              <el-form-item
                v-if="col.render && !scope.row.readonly"
                :prop="`${formCols}.${scope.$index}.${col.prop}`"
                :rules="
                  tableRules && tableRules.dateVal ? tableRules.dateVal : null
                "
              >
                <template v-if="col.render(scope).type === 'inputNumber'">
                  <el-input
                    v-if="!scope.row[col.prop] && !vEdit"
                    v-model="scope.row[col.prop]"
                    :disabled="!vEdit"
                  />
                  <el-input
                    v-else
                    type="number"
                    v-model="scope.row[col.prop]"
                    @change="(val) => changeValFn(val, scope.row, col.prop)"
                    :min="+minVal"
                    :max="100000"
                    :step="1"
                    :disabled="!vEdit"
                  />
                </template>
                <el-input
                  v-if="col.render(scope).type === 'input'"
                  v-model="scope.row[col.prop]"
                  :disabled="!vEdit"
                />
              </el-form-item>
              <span v-else>{{ scope.row[col.prop] }}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </template>
    </el-table>
  </el-form>
</template>

<script>
export default {
  name: "ExTableForms",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    tableForm: {
      type: Object,
      default: () => {},
    },
    columns: {
      type: Array,
      default: () => [],
    },
    formCols: {
      type: String,
      default: "",
    },
    isPaging: {
      type: Boolean,
      default: false,
    },
    vEdit: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 600,
    },
    minVal: {
      type: Number,
      default: undefined,
    },
    // itemData: {
    //   type: Object,
    //   default: () => {}
    // },
    tableRules: {
      type: Object,
      default: () => null,
    },
    options: {
      type: Object,
      default: () => {},
    },
    uploadHeaders: {
      type: Object,
      default: () => {},
    },
    uploadParams: {
      type: Object,
      default: () => {},
    },
    accept: {
      type: String,
      default: ".jpg,.jpeg,.png,.pdf",
    },
    spanMethod: {
      type: Function,
    },
  },
  data() {
    return {
      curSelection: null,
      // countId: this.sortVal
    };
  },
  // watch: {
  //   tableForm: {
  //     handler(val) {
  //       if (val[this.formCols]) {
  //         const refTableForm = this.$refs.refTableForm;
  //         console.log('refTableForm:', refTableForm);
  //         this.$nextTick(() => {
  //           refTableForm.$children[0].doLayout();
  //         });
  //       }
  //     },
  //     deep: true
  //   },
  // },
  updated() {
    const refTableForm = this.$refs.refTableForm;
    console.log("refTableForm:", refTableForm);
    if (this.tableForm[this.formCols]) refTableForm.$children[0].doLayout();
  },
  methods: {
    formatValFn(row, key) {
      if (typeof row[key] === "string") {
        row[key] = +row[key];
      }
      return row[key];
    },
    changeValFn(val, row, key) {
      // this.tableForm[this.formCols][index][prop] = String(value);
      // if (typeof val === 'number') {
      //   row[key] = String(val);
      // }
      if (val === undefined || val === "" || Object.is(val, NaN)) {
        row[key] = null;
      } else {
        row[key] = parseInt(val).toString();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wd-p100 {
  width: 100% !important;
}
.wd-p20 {
  width: 20% !important;
}
.hot-badge {
  margin-top: 10px;
  margin-right: 10px;
}
::v-deep {
  .el-badge__content.is-fixed {
    right: 1px !important;
  }

  .el-form-item__error {
    margin-top: 0;
  }
  .el-table {
    td {
      color: #333;
      .el-col {
        overflow: hidden;
        white-space: nowrap;
        word-wrap: normal;
        text-overflow: ellipsis !important;
      }
      .el-form-item {
        margin-bottom: 0 !important;
        &.is-error {
          padding-bottom: 16px !important;
        }
        .el-input.is-disabled .el-input__inner,
        .el-input__inner {
          color: #1c1d1e;
        }
        .el-input__inner {
          padding: 0 0 0 15px;
          text-align: center;
        }
      }
      .btn-td {
        color: #427fda !important;
        span {
          font-weight: bold;
          text-decoration: underline;
        }
      }
      .btn-green {
        cursor: pointer;
        color: #05c29c !important;
        margin-left: 10px;
      }
      .tbtn-green {
        color: #05c29c !important;
      }
      .tbtn-orange {
        color: #ff5800 !important;
      }
    }

    .header-cor th,
    .head-col {
      font-weight: 600;
      color: #000;
      background-color: #f6f6f8 !important; // #95b9ff f8f8f9
    }
    tr:hover td {
      background-color: #f0faff !important;
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    // border-radius: 10px;
    // background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    transition: 0.3s ease-in-out;
    background: rgba(155, 155, 155, 0.8);
    // border: 1px solid rgba(255, 255, 255, .12);
  }
}
</style>
