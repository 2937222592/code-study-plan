import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/admin/dashboard' },
  { path: '/login', component: () => import('../views/auth/LoginView.vue') },
  { path: '/register', component: () => import('../views/auth/RegisterView.vue') },
  { path: '/forgot', component: () => import('../views/auth/ForgotView.vue') },
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', component: () => import('../views/admin/DashboardView.vue') },
      { path: 'content', component: () => import('../views/admin/content/ContentListView.vue') },
      { path: 'content/skill-edit', component: () => import('../views/admin/content/SkillEditView.vue') },
      { path: 'content/concept-edit', component: () => import('../views/admin/content/ConceptEditView.vue') },
      { path: 'content/resource-edit', component: () => import('../views/admin/content/ResourceEditView.vue') },
      { path: 'content/task-edit', component: () => import('../views/admin/content/TaskEditView.vue') },
      { path: 'content/faq-edit', component: () => import('../views/admin/content/FaqEditView.vue') },
      { path: 'courseware', component: () => import('../views/admin/courseware/CoursewareListView.vue') },
      { path: 'courseware/chapters', component: () => import('../views/admin/courseware/ChaptersView.vue') },
      { path: 'courseware/slide-edit', component: () => import('../views/admin/courseware/SlideEditView.vue') },
      { path: 'courseware/import', component: () => import('../views/admin/courseware/ImportView.vue') },
      { path: 'discussion', component: () => import('../views/admin/discussion/DiscussionListView.vue') },
      { path: 'discussion/thread', component: () => import('../views/admin/discussion/ThreadView.vue') },
      { path: 'complaints', component: () => import('../views/admin/complaints/ComplaintsListView.vue') },
      { path: 'complaints/detail', component: () => import('../views/admin/complaints/ComplaintDetailView.vue') },
      { path: 'users', component: () => import('../views/admin/system/users/UserListView.vue') },
      { path: 'users/detail', component: () => import('../views/admin/system/users/UserDetailView.vue') },
      { path: 'roles', component: () => import('../views/admin/system/roles/RoleListView.vue') },
      { path: 'roles/edit', component: () => import('../views/admin/system/roles/RoleEditView.vue') },
      { path: 'menus', component: () => import('../views/admin/system/menus/MenuListView.vue') },
      { path: 'menus/edit', component: () => import('../views/admin/system/menus/MenuEditView.vue') },
      { path: 'settings', component: () => import('../views/admin/system/settings/SettingsView.vue') },
      { path: 'logs', component: () => import('../views/admin/system/logs/LogsView.vue') },
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})