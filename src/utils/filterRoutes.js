// export default function (routes, name) {
//   routes.filter((item) => {
//     const child = item;
//     if (item.name !== name) {
//       const { children } = child;
//       if (children) {
//         child.children = children.filter((subitem) => subitem.name !== name);
//       }
//       return true;
//     }
//     return false;
//   });
// }

export default function (routes, name) {
  const newRoutes = routes;
  return newRoutes.filter((item) => {
    const child = item;
    if (!item.meta.hidden) {
      const { children } = child;
      child.children = children.filter((dd) => {
        const obj = dd;
        if (name === dd.name) {
          obj.meta.hidden = false;
        }
        return !dd.meta.hidden;
      });
      return true;
    }
    return false;
  });
}
