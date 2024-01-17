<template>
  <el-row :gutter="50">
    <el-col :span="12">
      <el-menu
          class="el-menu-vertical-demo"
          :background-color="menuConfig.backgroundColor"
          :text-color="menuConfig.textColor"

          :default-openeds="menuConfig.defaultOpeneds"

          :default-active="menuConfig.defaultActive"
          :active-text-color="menuConfig.activeTextColor"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item index="1-1">
            <el-icon>
              <location/>
            </el-icon>
            item one
          </el-menu-item>
          <el-menu-item index="1-2">
            <el-icon>
              <location/>
            </el-icon>
            item two
          </el-menu-item>
          <el-menu-item index="1-3">
            <el-icon>
              <location/>
            </el-icon>
            item three
          </el-menu-item>
          <el-sub-menu index="1-4">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              item four
            </template>
            <el-menu-item index="1-4-1">
              <el-icon>
                <location/>
              </el-icon>
              item one
            </el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>Navigator Two</span>
          </template>
          <el-menu-item index="2-1">
            <el-icon>
              <icon-menu/>
            </el-icon>
            item one
          </el-menu-item>
          <el-menu-item index="2-2">
            <el-icon>
              <icon-menu/>
            </el-icon>
            item two
          </el-menu-item>
          <el-menu-item index="2-3">
            <el-icon>
              <icon-menu/>
            </el-icon>
            item three
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <document/>
            </el-icon>
            <span>Navigator Three</span>
          </template>
          <el-menu-item index="3-1">
            <el-icon>
              <document/>
            </el-icon>
            item one
          </el-menu-item>
          <el-menu-item index="3-2">
            <el-icon>
              <document/>
            </el-icon>
            item two
          </el-menu-item>
          <el-menu-item index="3-3">
            <el-icon>
              <document/>
            </el-icon>
            item three
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4">
          <el-icon>
            <setting/>
          </el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="12">
      <span>背景色：</span>
      <el-color-picker v-model="menuConfig.backgroundColor"/>
      <br/>
      <span>文字颜色：</span>
      <el-color-picker v-model="menuConfig.textColor"/>
      <br/>
      <span>激活文字颜色：</span>
      <el-color-picker v-model="menuConfig.activeTextColor"/>
      <br/>
      <span>默认展开项：</span>
      <el-input v-model="menuConfig.defaultOpeneds" disabled/>
      <br/>
      <span>默认选中项：</span>
      <el-input v-model="menuConfig.defaultActive"/>
      <br/>
    </el-col>
  </el-row>

</template>

<script lang="ts" setup>
import {ref, reactive, computed, watch, onMounted, onUpdated, onUnmounted} from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const menuConfig = reactive({
  defaultOpeneds: ['1', '2'],
  defaultActive: '1-4-1',
  activeTextColor: '#ffd04b',
  backgroundColor: '#545c64',
  textColor: '#fff',
})
</script>
