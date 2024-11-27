<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import HeadTop from './Header.vue';
import MenuNav from './SideNav.vue';
import RouterViewCache from './routerViewCache.vue';

interface LayoutState {
  isCollapsed: boolean;
  collapsedWd: string;
  // username: string;
}

const $route = useRoute();
// ...mapGetters(['getPageKey', 'getCurrentTab', 'getTabsList']),
// showTabs() {
//   return this.$store.state.showTabs
// },
// viewKey() {
//   return this.showTabs ? this.getPageKey : this.$route.fullPath
// },
const breadcrumbList = computed(() => {
  let breadArrs: any[] = [];
  console.log('breadcrumbList:', $route);
  for (const match of $route.matched) {
    const { path, meta } = match
    if (path && meta.title) {
      breadArrs.push({
        path: path === $route.path ? undefined : path,
        query: $route.query,
        breadcrumbName: meta.title
      })
    }
  }
  return breadArrs;
});

const menuState: LayoutState = reactive({
  isCollapsed: false,
  collapsedWd: '200px',
  // username: '',
});

const collapsedSider = () =>{
  menuState.isCollapsed = !menuState.isCollapsed;
  menuState.collapsedWd = menuState.isCollapsed ? '68px' : '200px';
};
</script>

<template>
  <a-layout class="main-wrapper">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content class="main-container">
        <!-- <a-breadcrumb >
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb> -->
        <a-breadcrumb :routes="breadcrumbList" style="margin: 10px 0">
          <template #itemRender="{ route, paths }">
            <span v-if="routes.indexOf(route) === routes.length - 1">
              {{ route.breadcrumbName }}
            </span>
            <router-link v-else :to="`${$route.path}/${paths.join('/')}`">
              {{ route.breadcrumbName }}
            </router-link>
          </template>
        </a-breadcrumb>
        
        <main class="main-con">
          <router-view-cache />
        </main>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup() {
    return {
      selectedKeys: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
    };
  },
});
</script>


<style lang="scss" scoped>
// @import '~@/styles/mixin.scss';
// @import '~@/styles/variables.scss';
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}


.main-wrapper {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
  padding: 0;

  .main-container {
    width: 100%;
    height: 100%;
    padding: 10px 16px;
    // background: var(--color_bg-secondary);
    overflow: hidden;

    .main-con {
      width: 100%;
      height: calc(100% - 82px) !important;
      // background: var(--color_bg-primary) !important;
    }

    .el-page-header {
      padding: 10px;
      // background: transparent !important;

      // > &__content {
      //   margin-top: 0 !important;
      // }
      // &__main {
      //   background: #fff !important;
      // }
      // > &__breadcrumb {
      //   background: var(--color_bg-secondary) !important;
      // }
    }
  }

  .toggler-button {
    width: 100%;
    height: 38px;
    line-height: 38px;
    text-align: center;
  }
}
</style>
