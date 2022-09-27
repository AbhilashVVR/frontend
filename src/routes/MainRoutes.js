// project imports
import MainLayout from "layout/MainLayout";
import { lazy } from "react";
import Loadable from "ui-component/Loadable";
import AddDailyCompatition from "views/GameManagement/GameList/AddDailyCompatition";
import AddWebsite from "views/GameManagement/GameList/AddWebsite";
import PrivateRoute from "views/pages/authentication/authentication3/PrivateRoute";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);

// Options routing
const LeaderBoard = Loadable(lazy(() => import("views/leaderboard")));
const AddRewards = Loadable(lazy(() => import("views/rewards/add")));
const ListRewards = Loadable(lazy(() => import("views/rewards/list")));
const CreateUser = Loadable(
  lazy(() => import("views/userManagement/createUser"))
);
const UserList = Loadable(lazy(() => import("views/userManagement/userList")));
const EditUser = Loadable(
  lazy(() => import("views/userManagement/userList/EditUser"))
);
const AddBanner = Loadable(
  lazy(() => import("views/Banner/AddBanner/AddBanner"))
);
const BannerList = Loadable(
  lazy(() => import("views/Banner/BannerList/BannerList"))
);
const CreateExercise = Loadable(
  lazy(() => import("views/Exercise/CreateExercise/CreateExercise"))
);
const EditCategory = Loadable(
  lazy(() => import("views/Exercise/ExerciseList/EditCategory"))
);
const ExerciseList = Loadable(
  lazy(() => import("views/Exercise/ExerciseList/ExerciseList"))
);
const SubCategory = Loadable(
  lazy(() => import("views/Exercise/SubCategory/SubCategory"))
);
const CoinCreation = Loadable(
  lazy(() => import("views/coinManagement/creation"))
);
const CoinList = Loadable(lazy(() => import("views/coinManagement/list")));
const GameCreation = Loadable(
  lazy(() => import("views/GameManagement/GameCreation/GameCreation"))
);
const EditGame = Loadable(
  lazy(() => import("views/GameManagement/GameList/EditGame"))
);
const AddGame = Loadable(
  lazy(() => import("views/GameManagement/GameList/AddGame"))
);
const AddMultiplayer = Loadable(
  lazy(() => import("views/GameManagement/GameList/AddMultiplayer"))
);
const GameList = Loadable(
  lazy(() => import("views/GameManagement/GameList/GameList"))
);
const Notification = Loadable(lazy(() => import("views/Notification")));
const AllNotifications = Loadable(
  lazy(() => import("views/Notification/AllNotifications"))
);
const QueryManager = Loadable(lazy(() => import("views/queryManager")));
const Transaction = Loadable(lazy(() => import("views/Transaction")));
const EditPowerUp = Loadable(
  lazy(() => import("views/GameManagement/GameList/EditPowerUp"))
);
const PowerUp = Loadable(
  lazy(() => import("views/GameManagement/GameList/PowerUp"))
);
const QuestionUpload = Loadable(
  lazy(() => import("views/Exercise/QuestionUpload/QuestionUpload"))
);
const GameQuestionUpload = Loadable(
  lazy(() => import("views/GameManagement/GameQuestionUpload/GameQuestionUpload"))
);
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <PrivateRoute>
      <MainLayout />
    </PrivateRoute>
  ),
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "/dashboard",
      element: <DashboardDefault />,
    },
    {
      path: "/leader-board",
      element: <LeaderBoard />,
    },
    {
      path: "/rewards/add-rewards",
      element: <AddRewards />,
    },
    {
      path: "/rewards/rewards-list",
      element: <ListRewards />,
    },
    {
      path: "/banner/banner-list",
      element: <BannerList />,
    },
    {
      path: "/banner/add-banner",
      element: <AddBanner />,
    },
    {
      path: "/users/create-user",
      element: <CreateUser />,
    },
    {
      path: "/users/list-users",
      element: <UserList />,
    },
    {
      path: "/users/edit-user/:userID",
      element: <EditUser />,
    },
    {
      path: "/games/game-creation",
      element: <GameCreation />,
    },
    {
      path: "/games/game-list",
      element: <GameList />,
    },
    {
      path: "/games/game-question-upload",
      element: <GameQuestionUpload />,
    },
    {
      path: "/games/game-list/editGame/:gameId",
      element: <EditGame />,
    },
    {
      path: "/games/game-list/powerUp/:gameId",
      element: <PowerUp />,
    },
    {
      path: "/games/game-list/powerUp/:gameId/editPowerUp/:powerupId",
      element: <EditPowerUp />,
    },
    {
      path: "/games/game-list/single-player/:gameId",
      element: <AddGame />,
    },
    {
      path: "/games/game-list/multi-player/:gameId",
      element: <AddMultiplayer />,
    },
    {
      path: "/games/game-list/website/:gameId",
      element: <AddWebsite />,
    },
    {
      path: "/games/game-list/dailyCompetition/:gameId",
      element: <AddDailyCompatition />,
    },
    {
      path: "/exercise/create-exercise",
      element: <CreateExercise />,
    },
    {
      path: "/exercise/exercise-list",
      element: <ExerciseList />,
    },
    {
      path: "/exercise/exercise-question-upload",
      element: <QuestionUpload />,
    },
    {
      path: "/exercise/exercise-list/editCategory/:exerciseId",
      element: <EditCategory />,
    },
    {
      path: "/exercise/exercise-list/edit-exercise-sub/:subExerciseID",
      element: <SubCategory />,
    },
    {
      path: "/coin/create-coin",
      element: <CoinCreation />,
    },
    {
      path: "/coin/coin-list",
      element: <CoinList />,
    },
    {
      path: "/transactions",
      element: <Transaction />,
    },
    {
      path: "/notifications/send-notification",
      element: <Notification />,
    },
    {
      path: "/notifications",
      element: <AllNotifications />,
    },
    {
      path: "/query-manager",
      element: <QueryManager />,
    },
  ],
};

export default MainRoutes;
