import BottomNavigation from "../components/bottom-navigation";
import { Calendar as CalendarIcon, Plus, Clock, ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarPage() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-30">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-blue-400" />
            Agenda
          </h1>
          <p className="text-sm text-gray-400 mt-1">Gestiona tus citas y servicios</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Add Service Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95">
          <div className="flex items-center justify-center space-x-2">
            <Plus className="h-5 w-5" />
            <span className="font-medium">Programar Nuevo Servicio</span>
          </div>
        </button>

        {/* Today's Date */}
        <div className="card-bg rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-3">
            Hoy - {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>
          
          <div className="space-y-3">
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No hay servicios programados para hoy</p>
            </div>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="card-bg rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </button>
            <h3 className="text-lg font-semibold text-white">
              {new Date(currentYear, currentMonth).toLocaleDateString('es-ES', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </h3>
            <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
              <div key={day} className="p-3 text-sm font-medium text-gray-400 border-b border-gray-700/50">
                {day}
              </div>
            ))}
            
            {Array.from({ length: 35 }, (_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate() && i < 31;
              return (
                <div 
                  key={i} 
                  className={`p-3 text-sm cursor-pointer transition-colors rounded-lg ${
                    day <= 31 
                      ? isToday 
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      : 'text-transparent'
                  }`}
                >
                  {day <= 31 ? day : ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Services */}
        <div className="card-bg rounded-xl p-4 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-400" />
            Próximos Servicios
          </h3>
          
          <div className="space-y-3">
            <div className="text-center py-6">
              <CalendarIcon className="h-10 w-10 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No hay servicios programados</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Programar Servicio
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}