/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  const paths = currentUser?.paths ?? [];
  return {
    // canAdmin: currentUser && currentUser.access === 'admin',
    canPath: (route: any) => {
      let path = route.path;
      path = path.replace(':appType', 'manager');
      return paths && paths.includes(path);
    },
    canAction: (path: string): boolean => {
      return paths && paths.includes(path);
    },
    canActions: (actionPaths: string[]): boolean => {
      if (paths && paths.length > 0) {
        for (let i = 0; i < actionPaths.length; i++) {
          if (paths.includes(actionPaths[i])) {
            return true;
          }
        }
      }
      return false;
    },
  };
}
