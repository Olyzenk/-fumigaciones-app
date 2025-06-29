import { useQuery } from "@tanstack/react-query";
import { BarChart3, DollarSign, TrendingUp, Calendar, Clock, CheckCircle } from "lucide-react";
import BottomNavigation from "../components/bottom-navigation";

interface DashboardData {
  todayServicesCount: number;
  todayRevenue: number;
  monthRevenue: number;
  pendingServicesCount: number;
}

export default function ReportsPage() {
  const { data: dashboardData, isLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard/today"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20">
        <div className="p-4 space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            Reportes
          </h1>
          <p className="text-sm text-gray-600 mt-1">Análisis y estadísticas del negocio</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Revenue Cards */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Ingresos del Mes</p>
                <p className="text-3xl font-bold">${dashboardData?.monthRevenue || 0}</p>
                <p className="text-green-100 text-sm mt-1">
                  {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="bg-white/20 p-4 rounded-full">
                <DollarSign className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ingresos Hoy</p>
                <p className="text-2xl font-bold text-green-600">
                  ${dashboardData?.todayRevenue || 0}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Servicios Hoy</p>
                <p className="text-2xl font-bold text-blue-600">
                  {dashboardData?.todayServicesCount || 0}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-orange-600">
                  {dashboardData?.pendingServicesCount || 0}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completados</p>
                <p className="text-2xl font-bold text-green-600">
                  {(dashboardData?.todayServicesCount || 0) - (dashboardData?.pendingServicesCount || 0)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Trends */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Tendencias de Ingresos
            </h3>
          </div>

          {/* Simple bar chart representation */}
          <div className="space-y-3">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, index) => {
              const value = Math.random() * 100 + 20; // Mock data for visualization
              return (
                <div key={day} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 w-8">{day}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-800 w-12">${Math.round(value * 5)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Service Types */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Tipos de Servicio
          </h3>

          <div className="space-y-3">
            {[
              { name: 'Fumigación', count: 15, color: 'bg-blue-500' },
              { name: 'Control de Roedores', count: 12, color: 'bg-green-500' },
              { name: 'Control de Cucarachas', count: 8, color: 'bg-yellow-500' },
              { name: 'Inspección', count: 6, color: 'bg-purple-500' },
              { name: 'Prevención', count: 4, color: 'bg-red-500' }
            ].map((service) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${service.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">{service.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 rounded-full h-2 w-20 overflow-hidden">
                    <div
                      className={`h-full ${service.color} rounded-full`}
                      style={{ width: `${(service.count / 15) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-6">{service.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Rendimiento</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-blue-600">95%</span>
              </div>
              <p className="text-sm text-gray-600">Satisfacción Cliente</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-green-600">98%</span>
              </div>
              <p className="text-sm text-gray-600">Servicios Completados</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}