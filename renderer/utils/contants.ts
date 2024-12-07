import { FileText, GitBranch, Search, Settings, UserRound } from "lucide-react";

export const enum SidebarItemsTypes {
    EXPLORER = "Explorer",
    SEARCH = "Search",
    SOURCE_CONTROL = "Source Control",
    USER = "User",
    SETTINGS = "Settings"
}

export const SidebarItems = [
    {
        icon: FileText,
        name: SidebarItemsTypes.EXPLORER,
        tooltip: "Explorer",
    },
    {
        icon: Search,
        name: SidebarItemsTypes.SEARCH,
        tooltip: "Search",
    },
    {
        icon: GitBranch,
        name: SidebarItemsTypes.SOURCE_CONTROL,
        tooltip: "Source Control",
    },
];

export const SidebarUserItems = [
    {
        icon: UserRound,
        name: SidebarItemsTypes.USER,
        tooltip: "User",
    },
    {
        icon: Settings,
        name: SidebarItemsTypes.SETTINGS,
        tooltip: "Settings",
    },
];