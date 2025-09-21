// Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { DashboardUrl } from "../data/DashboardUrl";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (url) => {
    return location.pathname.includes(url);
  };

  return (
    <div className="w-64 h-screen bg-white shadow-md p-4 overflow-y-auto">
      {DashboardUrl.map((section, idx) => (
        <div key={idx} className="mb-6">
          {section.label && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              {section.label}
            </h3>
          )}

          {section.items.map((item, itemIdx) => (
            <div key={itemIdx} className="mb-1">
              {item.children ? (
                <>
                  <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                    {item.icon}
                    {item.text}
                  </div>
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child, childIdx) => (
                      <Link
                        to={`/dashboard/${child.url}`}
                        key={childIdx}
                        className={`flex items-center justify-between px-2 py-1 text-sm rounded hover:bg-blue-50 ${
                          isActive(child.url)
                            ? "text-blue-600 bg-blue-100 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {child.icon}
                          {child.text}
                        </span>
                        {child.badge && (
                          <span className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded-full">
                            {child.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={`/dashboard/${item.url}`}
                  className={`flex items-center gap-2 px-2 py-2 text-sm rounded hover:bg-blue-50 ${
                    isActive(item.url)
                      ? "text-blue-600 bg-blue-100 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {item.icon}
                  {item.text}
                </Link>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
