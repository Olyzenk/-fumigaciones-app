import { useLocation } from "wouter";
import { Home, Calendar, Users, BarChart3 } from "lucide-react";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Inicio" },
    { path: "/calendar", icon: Calendar, label: "Agenda" },
    { path: "/clients", icon: Users, label: "Clientes" },
    { path: "/reports", icon: BarChart3, label: "Reportes" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50 z-40 shadow-lg">
      <div className="grid grid-cols-4 h-16 px-2">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              className={`flex flex-col items-center justify-center space-y-1 h-full rounded-xl mx-1 transition-all duration-200 ${
                isActive 
                  ? "text-blue-400 bg-blue-500/20" 
                  : "text-gray-400 hover:text-blue-400 hover:bg-gray-800/50"
              }`}
              onClick={() => setLocation(item.path)}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
