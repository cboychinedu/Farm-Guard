// Importing Ionicons for icon usage in the menu items
import { Ionicons } from "@expo/vector-icons";

// Defining the interface for a menu item
export interface MenuItem {
  title: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
}

// Defining the menu items for the Users drawer modal
export const usersMenu: MenuItem[] = [
  {
    title: "Home",
    route: "/(private)/(passengers)/passengers/dashboard",
    icon: "grid-outline",
  },
  {
    title: "Profile",
    route: "/(private)/(passengers)/passengers/profile",
    icon: "person-outline",
  },
    {
    title: "History",
    route: "",
    icon: "recording-outline",
  },
  {
    title: "Payment Methods",
    route: "/(private)/(passengers)/passengers/paymentMethods",
    icon: "card-outline",
  },
  {
    title: "Report Analysis",
    route: "/(private)/(passengers)/passengers/reportDriver",
    icon: "warning-outline",
  },
  {
    title: "Settings",
    route: "/(private)/(passengers)/passengers/settings",
    icon: "settings-outline",
  },
];

// Defining the hidden passenger tab screens for navigation purposes
// export const hiddenPassengerTabScreens = [
//   { name: "settings/terms", title: "Terms of Service", headerTitle: "Terms of Service" },
//   { name: "settings/privacy", title: "Privacy Policy", headerTitle: "Privacy Policy" },
//   { name: "profile/sos", title: "SOS", headerTitle: "SOS" },
//   { name: "profile/savedPlaces", title: "Saved Places", headerTitle: "Saved Places" },
//   { name: "profile/support", title: "Support & Help Center", headerTitle: "Support & Help Center" },
//   { name: "profile/editProfile", title: "Edit Profile", headerTitle: "Edit Profile" },
//   { name: "rideHistory", title: "Ride history", headerTitle: "Ride history" },
//   { name: "paymentMethods", title: "Payment Methods", headerTitle: "Payment Methods" },
//   { name: "reportDriver", title: "Report Driver", headerTitle: "Report Driver" },
// ];