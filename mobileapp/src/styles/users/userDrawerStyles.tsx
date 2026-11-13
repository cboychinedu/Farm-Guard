// Importing the necessary modules 
import { StyleSheet, Dimensions } from 'react-native'; 
import COLORS from "@/styles/colors/colors";

// Getting the screen width 
const { width: screenWidth } = Dimensions.get("window");
const drawerWidth = screenWidth * 0.95;

// Creating the styles 
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  drawerContainer: {
    width: drawerWidth,
    height: "100%",
    backgroundColor: "#ffffff",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  drawerInner: {
    flex: 1,
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: COLORS.primary || "#951613",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  drawerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
    menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 10, 
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  closeBtn: {
    padding: 4,
  },
  drawerBody: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 12,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold", 
    color: "#139541",
  },
});

// Exporting the styles 
export default styles; 