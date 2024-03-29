import { capitalize } from '@ntks/toolbox';

function resolveRouteBase(route: any) {
  const resolved: any = { name: route.name, path: `/${route.path}` };

  if (route.meta) {
    resolved.meta = route.meta;
  }

  return resolved;
}

function resolveActionRoutePathPart(action: string) {
  if (action === 'create') {
    return 'new';
  }

  if (action === 'update') {
    return ':id/edit';
  }

  return ':id';
}

function resolveCollectionRoutes(route: any) {
  const baseRoute = resolveRouteBase(route);

  return [
    { ...baseRoute, component: '@/domain/qii/views/qii-list' },
    ...['create', 'update', 'read'].map(action => ({
      name: `${baseRoute.name}${capitalize(action)}`,
      path: `${baseRoute.path}/${resolveActionRoutePathPart(action)}`,
      component: `@/domain/qii/views/${action === 'read' ? 'qii-detail' : 'qii-form'}`,
      meta: { hide: true, collection: baseRoute.name },
    })),
  ];
}

function resolveRoutes() {
  let generated;

  try {
    generated = require(`${decodeURIComponent(process.env.KNOSYS_APP_PATH!)}/app.json`).routes;
  } catch {
    generated = [];
  }

  return generated.map((route: any) => {
    const resolved: any = resolveRouteBase(route);
    const children: any[] = [];

    (route.children || []).forEach((child: any) => {
      children.push(...resolveCollectionRoutes(child));
    });

    if (children.length > 0) {
      children.unshift({ path: resolved.path, redirect: children[0].path });

      resolved.routes = children;
    }

    return resolved;
  });
}

export default [
  {
    name: 'root',
    path: '/',
    component: '@/entry/layouts/default',
    routes: [
      {
        name: 'home',
        path: '',
        component: '@/domain/index',
        meta: { text: '首页' },
      },
      ...resolveRoutes(),
      {
        name: 'settings',
        path: '/settings',
        meta: { text: '设置' },
        routes: [
          { path: '/settings', redirect: '/settings/system' },
          {
            name: 'systemConfig',
            path: '/settings/system',
            component: '@/domain/settings/views/system-config',
            meta: { text: '系统' },
          },
          {
            name: 'collectionList',
            path: '/settings/collections',
            component: '@/domain/collection/views/collection-list',
            meta: { text: '集合' },
          },
          {
            name: 'collectionModel',
            path: '/settings/collections/:collection/design',
            component: '@/domain/collection/views/collection-model',
            meta: { hide: true },
          },
        ],
      },
      {
        name: 'more',
        path: '/more',
        meta: { text: '更多' },
        redirect: '/about',
      },
      {
        name: 'about',
        path: '/about',
        component: '@/domain/more/views/about',
        meta: { text: '关于' },
      },
    ],
  },
];
