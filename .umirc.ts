/*
 * @Author: 倪航天
 * @Date: 2023-07-30 00:01:34
 * @LastEditTime: 2023-08-06 15:55:11
 * @LastEditors: 倪航天
 * @Description: 
 */
import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/renderForm", component: "RenderForm/demo" }
  ],
  npmClient: 'npm',
});
