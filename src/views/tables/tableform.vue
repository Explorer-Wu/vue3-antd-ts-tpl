<template>
  <div class="table">
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      style="width: 100%"
    >
      <el-table-column align="center" type="index" label="序号" width="80" />
      <el-table-column align="left" :label="parameter.dateTime || dateTime">
        <el-table-column prop="usage" align="left" label="使用量">
          <template slot-scope="scope">
            <el-input
              type="text"
              v-model="scope.row.usage"
              maxlength="20"
              @input="(val) => onlyNumberInput(scope.row, val, 'usage')"
              @clear="() => clearInput(scope.row, 'usage')"
              clearable
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="金额">
          <template slot-scope="scope">
            <el-input
              type="text"
              v-model="scope.row.money"
              maxlength="10"
              clearable
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="proportion" align="left" label="占比" />
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import dayjs from "dayjs";

export default {
  name: "Settlement",
  data() {
    return {
      parameter: {
        dateTime: "",
        emId: "",
      },
      rowspanList: [],
      originList: [],
      tableData: [],
    };
  },
  watch: {
    filterKey(val) {
      const res = this.$refs.tree.filter(val);
    },
  },
  async mounted() {
    await this.energyMediaTree();
    this.handleQuery();
  },
  beforeRouteLeave(to, from, next) {
    if (this.isEditor) {
      const route = this.$route;
      this.checkEditorSave(
        (done) => {
          emitter.emit("pageJump", route.path);
          next(false);
        },
        (done) => {
          next();
        }
      );
    } else {
      return next();
    }
  },
  methods: {
    onlyNumberInput(row, value, key) {
      this.$nextTick(() => {
        row[key] = value
          .replace(/[^\d.]/g, "")
          .replace(/\.{2,}/g, ".")
          .replace(".", "$#$")
          .replace(/\./g, "");
      });
    },
    clearInput(row, key, value = "0") {
      this.$nextTick(() => {
        row[key] = value;
        console.log(row);
      });
    },

    checkEditorSave(beforeClose, onOk) {
      const h = this.$createElement;
      this.$confirm({
        title: "已编辑内容未保存",
        content: h("p", null, [
          h("span", { style: { color: "#1C1D1E" } }, "无法保存"),
        ]),
        maskClosable: false,
        closeOnPressEscape: false,
        beforeClose,
        onOk,
      });
    },

    cancel() {
      this.checkEditorSave(
        (done) => done(),
        (done) => {
          this.isEditor = false;
          this.$nextTick(
            () => (this.tableData = this.originList.map((i) => ({ ...i })))
          );
          done();
        }
      );
    },
  },
};
</script>
