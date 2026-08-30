/**
 * CoinShare Drawer & Sidebar Menu Controller
 * File Location: assets/js/menu.js
 */

const MenuController = {
  toggleSidebar() {
    const sidebar = document.getElementById('appSidebar');
    const overlay = document.getElementById('appOverlay');
    
    if (sidebar && overlay) {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    }
  },

  closeSidebar() {
    const sidebar = document.getElementById('appSidebar');
    const overlay = document.getElementById('appOverlay');
    
    if (sidebar && overlay) {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  }
};
