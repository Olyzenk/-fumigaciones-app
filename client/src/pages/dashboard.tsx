import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Shield, Calendar, DollarSign, TrendingUp, Clock, CheckCircle, Users, Bug, Mail, Phone, Star, Award } from "lucide-react";
import BottomNavigation from "../components/bottom-navigation";

interface DashboardData {
  todayServicesCount: number;
  todayRevenue: number;
  monthRevenue: number;
  pendingServicesCount: number;
  todayServices: any[];
}

export default function Dashboard() {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard/today"],
  });

  const { data: clients = [] } = useQuery<any[]>({
    queryKey: ["/api/clients"],
  });

  if (isDashboardLoading) {
    return (
      <div className="min-h-screen bg-gray-900 pb-20">
        <div className="p-4 space-y-4">
          <div className="h-8 bg-gray-800 rounded animate-pulse"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-800 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Hero Section */}
      <div className="gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-green-900/20"></div>
        <div className="relative p-6 pt-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Control de Plagas</h1>
                <p className="text-blue-200 text-sm">Especialistas en Fumigación</p>
              </div>
            </div>
            <button className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center">
              <div className="w-6 h-0.5 bg-white/60 rounded relative">
                <div className="absolute top-2 w-6 h-0.5 bg-white/60 rounded"></div>
                <div className="absolute -top-2 w-6 h-0.5 bg-white/60 rounded"></div>
              </div>
            </button>
          </div>

          {/* Main Title */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Fumigación
              <br />
              Profesional
              <br />
              <span className="text-blue-300">en tu Ciudad</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              15 años protegiendo hogares y empresas. 
              Soluciones efectivas y seguras contra todo tipo de plagas.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setIsServiceModalOpen(true)}
              className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Nuevo Servicio
            </button>
            <button 
              onClick={() => setIsClientModalOpen(true)}
              className="flex items-center gap-2 glass-effect text-white px-6 py-3 rounded-full font-medium border border-white/20 hover:bg-white/10 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Agregar Cliente
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-effect rounded-2xl p-4 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">2400+</div>
              <div className="text-gray-400 text-sm">Clientes Activos</div>
            </div>
            
            <div className="glass-effect rounded-2xl p-4 text-center">
              <Award className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">15</div>
              <div className="text-gray-400 text-sm">Años de Experiencia</div>
            </div>
            
            <div className="glass-effect rounded-2xl p-4 text-center">
              <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">99%</div>
              <div className="text-gray-400 text-sm">Efectividad</div>
            </div>
            
            <div className="glass-effect rounded-2xl p-4 text-center">
              <Clock className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-gray-400 text-sm">Servicio Disponible</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-4 space-y-6 mt-6">
        {/* Today's Metrics */}
        <div className="card-bg rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" />
            Resumen de Hoy
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm">Servicios</p>
                  <p className="text-2xl font-bold text-white">
                    {dashboardData?.todayServicesCount || 0}
                  </p>
                </div>
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm">Ingresos</p>
                  <p className="text-2xl font-bold text-white">
                    ${dashboardData?.todayRevenue || 0}
                  </p>
                </div>
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm">Mes Actual</p>
                  <p className="text-2xl font-bold text-white">
                    ${dashboardData?.monthRevenue || 0}
                  </p>
                </div>
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-400 text-sm">Pendientes</p>
                  <p className="text-2xl font-bold text-white">
                    {dashboardData?.pendingServicesCount || 0}
                  </p>
                </div>
                <Clock className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Today's Services */}
        <div className="card-bg rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Bug className="h-5 w-5 text-green-400" />
              Servicios de Hoy
            </h3>
            <span className="text-gray-400 text-sm">
              {dashboardData?.todayServices?.length || 0} programados
            </span>
          </div>

          <div className="space-y-3">
            {dashboardData?.todayServices?.length ? (
              dashboardData.todayServices.map((service: any) => (
                <div key={service.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="font-medium text-white">{service.service_type}</span>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                          Programado
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">Cliente: {service.client_name}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(service.scheduled_date).toLocaleTimeString('es-ES', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })} - ${service.price}
                      </p>
                    </div>
                    <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-gray-400 text-xs">→</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500">No hay servicios programados para hoy</p>
                <button 
                  onClick={() => setIsServiceModalOpen(true)}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Programar Servicio
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card-bg rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setIsServiceModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition-colors"
            >
              <Plus className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Nuevo Servicio</span>
            </button>
            
            <button 
              onClick={() => setIsClientModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl transition-colors"
            >
              <Users className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Agregar Cliente</span>
            </button>
            
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl transition-colors">
              <Calendar className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Ver Agenda</span>
            </button>
            
            <button className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-xl transition-colors">
              <TrendingUp className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Reportes</span>
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}