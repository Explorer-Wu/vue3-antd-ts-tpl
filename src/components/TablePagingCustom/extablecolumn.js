export default {
  name: 'ExTableColumn',
  functional: true,
  render (h, { props }) {
    return h('el-table-column', {
      props,
      ...(props.render
        ? {
          scopedSlots: {
            default: ({ row, column, $index }) => props.render(h, { row, column, $index })
          }
        }
        : {}),
      ...(props.renderHeader
        ? {
          scopedSlots: {
            header: ({ column, $index }) => props.renderHeader(h, { column, $index })
          }
        }
        : null)
    });
  }
};
