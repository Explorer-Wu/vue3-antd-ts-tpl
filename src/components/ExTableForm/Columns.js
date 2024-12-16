export default {
  data() {
    return {
      oriColumns: [
        {
          title: "排序",
          key: "sort",
          // type: 'index',
          width: 50,
        },
        {
          label: "W1",
          childCols: [
            {
              prop: "num",
              label: "个数",
              width: 120,
              render: (scope) => ({
                type: "inputNumber",
              }),
            },
            {
              label: "日期",
              prop: "date",
              width: 120,
              className: "head-col",
            },
          ],
        },
      ],
    };
  },
  methods: {
    doneSortArr(arrs) {
      arrs.forEach((el, idx) => {
        el.sort = idx + 1;
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return {
          rowspan: row.rowspan,
          colspan: row.rowspan > 0 ? 1 : 0,
        };
      }
    },
  },
};
