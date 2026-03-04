import { jwtDecode } from 'jwt-decode';

// ✅ FIX: localStorage use kiya gaya hai
const TOKEN_KEY = 'token';

// Token decode aur role extract karne ke liye
export const decodeToken = () => {
  try {
    // ✅ FIX: sessionStorage -> localStorage
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    
    const decoded = jwtDecode(token);
    
    // console.log("=== TOKEN DEBUG ===");
    // console.log("Full decoded token:", decoded);
    // console.log("Roles property:", decoded.roles);
    // console.log("Role property:", decoded.role);
    // console.log("=== END DEBUG ===");
    
    // Extract roles - handle different formats
    let rolesArray = [];
    
    // Case 1: Agar roles array mein hai
    if (decoded.roles && Array.isArray(decoded.roles)) {
      rolesArray = decoded.roles.map(role => role.toString().toLowerCase());
    } 
    // Case 2: Agar roles string mein hai
    else if (typeof decoded.roles === 'string') {
      rolesArray = [decoded.roles.toLowerCase()];
    }
    // Case 3: Agar role property hai (single role)
    else if (decoded.role) {
      rolesArray = [decoded.role.toString().toLowerCase()];
    }
    // Case 4: Agar Role property hai (capital R)
    else if (decoded.Role) {
      rolesArray = [decoded.Role.toString().toLowerCase()];
    }
    // Case 5: Agar koi role nahi mila toh default patient
    else {
      rolesArray = ['patient'];
    }
    
    // console.log("Extracted roles array:", rolesArray);
    
    return {
      token,
      ...decoded,
      roles: rolesArray,
      primaryRole: rolesArray.length > 0 ? rolesArray[0] : 'patient'
    };
  } catch (error) {
    // console.error('Token decode error:', error);
    // ✅ FIX: sessionStorage -> localStorage
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
};

// Primary role check karne ke liye (first role from array)
export const getUserRole = () => {
  const userData = decodeToken();
  if (!userData || !userData.roles || userData.roles.length === 0) return 'patient';
  
  // Pehla role return karein (primary role)
  return userData.primaryRole || userData.roles[0];
};

// All roles get karne ke liye
export const getUserRoles = () => {
  const userData = decodeToken();
  if (!userData || !userData.roles) return ['patient'];
  
  return userData.roles;
};

// SUPER ADMIN check
export const isSuperAdmin = () => {
  const userRoles = getUserRoles();
  return userRoles.some(role => 
    role.toLowerCase() === 'superadmin' || 
    role.toLowerCase() === 'super_admin'
  );
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const userData = decodeToken();
  if (!userData) return false;
  
  // Check token expiry
  if (userData.exp * 1000 < Date.now()) {
    // ✅ FIX: sessionStorage -> localStorage
    localStorage.removeItem(TOKEN_KEY);
    return false;
  }
  
  return true;
};

// Get user info
export const getUserInfo = () => {
  return decodeToken();
};

// Check specific role access - Multiple roles support
export const hasRole = (requiredRoles) => {
  const userRoles = getUserRoles();
  if (!userRoles || !requiredRoles) return false;
  
  // SUPER ADMIN ko sab kuch access dein
  if (isSuperAdmin()) {
    return true;
  }
  
  const rolesArray = Array.isArray(requiredRoles) 
    ? requiredRoles 
    : [requiredRoles];
  
  // Sabko lowercase mein convert karein for comparison
  const userRolesLower = userRoles.map(r => r.toLowerCase());
  const requiredRolesLower = rolesArray.map(r => r.toLowerCase());
  
  // Check if any user role matches required roles
  return userRolesLower.some(userRole => 
    requiredRolesLower.includes(userRole)
  );
};

// Check if user has ALL required roles
export const hasAllRoles = (requiredRoles) => {
  const userRoles = getUserRoles();
  if (!userRoles || !requiredRoles) return false;
  
  const rolesArray = Array.isArray(requiredRoles) 
    ? requiredRoles 
    : [requiredRoles];
  
  const requiredRolesLower = rolesArray.map(r => r.toLowerCase());
  const userRolesLower = userRoles.map(r => r.toLowerCase());
  
  return requiredRolesLower.every(role => 
    userRolesLower.includes(role)
  );
};

// ✅ FIX: Logout function updated
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  // Saare tabs mein logout ho jaye iske liye
  localStorage.setItem('logoutEvent', Date.now().toString());
  window.location.href = '/auth/login';
};

// ✅ NEW: Storage event listener for cross-tab synchronization
export const setupAuthSync = () => {
  window.addEventListener('storage', (event) => {
    if (event.key === 'token' && !event.newValue) {
      // Kisi aur tab mein logout hua hai
      window.location.href = '/auth/login';
    }
    if (event.key === 'logoutEvent') {
      // Force logout in current tab
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/auth/login';
    }
  });
};