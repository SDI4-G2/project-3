import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";

const DashboardRoute = () => <Text>Dashboard</Text>;

const LibraryRoute = () => <Text>Library</Text>;

const BookmarkRoute = () => <Text>Bookmark</Text>;

const BottomDrawer = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "bookmark",
      title: "Bookmark",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    { key: "library", title: "Library", focusedIcon: "album" },
    { key: "dashboard", title: "Dashboard", focusedIcon: "history" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    bookmark: BookmarkRoute,
    library: LibraryRoute,
    dashboard: DashboardRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomDrawer;
