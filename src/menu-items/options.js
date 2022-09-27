// assets
import {
  IconBallAmericanFootball,
  IconBellRinging,
  IconChartLine,
  IconCoin,
  IconCurrencyDollar,
  IconPhoto,
  IconQuestionMark,
  IconRun,
  IconTrophy,
  IconUser,
} from "@tabler/icons";

// constant
const icons = {
  IconChartLine,
  IconTrophy,
  IconPhoto,
  IconUser,
  IconBallAmericanFootball,
  IconRun,
  IconCoin,
  IconCurrencyDollar,
  IconBellRinging,
  IconQuestionMark,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const options = {
  id: "options",
  // title: 'Options',
  type: "group",
  children: [
    {
      id: "leader-board",
      title: "Leaderboard",
      type: "item",
      url: "/leader-board",
      icon: icons.IconChartLine,
      breadcrumbs: false,
    },
    {
      id: "rewards",
      title: "Rewards",
      type: "collapse",
      icon: icons.IconTrophy,
      children: [
        {
          id: "rewards-list",
          title: "Rewards List",
          type: "item",
          url: "/rewards/rewards-list",
          breadcrumbs: false,
        },
        {
          id: "add-rewards",
          title: "Add Rewards",
          type: "item",
          url: "/rewards/add-rewards",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "banner",
      title: "Banner",
      type: "collapse",
      icon: icons.IconPhoto,
      children: [
        {
          id: "banner-list",
          title: "Banner List",
          type: "item",
          url: "/banner/banner-list",
          breadcrumbs: false,
        },
        {
          id: "add-banner",
          title: "Add Banner",
          type: "item",
          url: "/banner/add-banner",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "user-management",
      title: "User Management",
      type: "collapse",
      icon: icons.IconUser,
      children: [
        {
          id: "create-user",
          title: "Create User",
          type: "item",
          url: "/users/create-user",
          breadcrumbs: false,
        },
        {
          id: "users-list",
          title: "Users List",
          type: "item",
          url: "/users/list-users",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "game-management",
      title: "Game Management",
      type: "collapse",
      icon: icons.IconBallAmericanFootball,
      children: [
        {
          id: "game-creation",
          title: "Game Creation",
          type: "item",
          url: "/games/game-creation",
          breadcrumbs: false,
        },
        {
          id: "game-list",
          title: "Game List",
          type: "item",
          url: "/games/game-list",
          breadcrumbs: false,
        },
        {
          id: "question-upload",
          title: "Question Upload",
          type: "item",
          url: "/games/game-question-upload",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "exercise-management",
      title: "Exercise Management",
      type: "collapse",
      icon: icons.IconRun,
      children: [
        {
          id: "create-exercise",
          title: "Create Exercise",
          type: "item",
          url: "/exercise/create-exercise",
          breadcrumbs: false,
        },
        {
          id: "exercise-list",
          title: "List",
          type: "item",
          url: "/exercise/exercise-list",
          breadcrumbs: false,
        },
        {
          id: "question-upload",
          title: "Question Upload",
          type: "item",
          url: "/exercise/exercise-question-upload",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "coin-management",
      title: "Coin Management",
      type: "collapse",
      icon: icons.IconCoin,
      children: [
        {
          id: "create-Coin",
          title: "Coin Creation",
          type: "item",
          url: "/coin/create-coin",
          breadcrumbs: false,
        },
        {
          id: "coin-list",
          title: "List",
          type: "item",
          url: "/coin/coin-list",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "transactions",
      title: "Transactions",
      type: "item",
      url: "/transactions",
      icon: icons.IconCurrencyDollar,
      breadcrumbs: false,
    },
    {
      id: "notification-manager",
      title: "Notification Manager",
      type: "collapse",
      icon: icons.IconBellRinging,
      children: [
        {
          id: "notifications",
          title: "All Notifications",
          type: "item",
          url: "/notifications",
          breadcrumbs: false,
        },
        {
          id: "send-notification",
          title: "Send Notification",
          type: "item",
          url: "/notifications/send-notification",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "query-manager",
      title: "Query Manager",
      type: "item",
      url: "/query-manager",
      icon: icons.IconQuestionMark,
      breadcrumbs: false,
    },
  ],
};

export default options;
