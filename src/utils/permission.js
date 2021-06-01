/* 存储：角色对应的权限名称 */
const roleToRouter = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'Category',
  }],
};

/*
    1. 编写权限信息（对象
    2. 传入参数，返回可以访问的权限

*/
/**
 * @description: 过滤
 * @param {*} role  访问人
 * @param {*} routes    路由对象
 * @return {*}
 */
export default function getMenuRouter(role, routes) {
//   // 得到你的访问权限
  const allowRoutesName = roleToRouter[role].map((item) => item.name);
  return routes.filter((r) => {
    const obj = r;
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
}
