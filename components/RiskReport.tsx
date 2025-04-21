"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import MultipleAttemptsTable from "@/components/MultipleAttemptsTable"
import FailedSemestersTable from "@/components/FailedSemestersTable"

interface RiskReportProps {
  multipleAttemptsData: Record<string, any>[]
  failedSemestersData: Record<string, any>[]
}

export default function RiskReport({ multipleAttemptsData, failedSemestersData }: RiskReportProps) {
  const [multipleAttemptsSearch, setMultipleAttemptsSearch] = useState("")
  const [failedSemestersSearch, setFailedSemestersSearch] = useState("")
  const [activeTab, setActiveTab] = useState("multiple-attempts")

  const filteredMultipleAttemptsData = multipleAttemptsData.filter(
    (student) =>
      student.CODIGO_ESTUDIANTE.toString().includes(multipleAttemptsSearch) ||
      student.LOGIN.toLowerCase().includes(multipleAttemptsSearch.toLowerCase()),
  )

  const filteredFailedSemestersData = failedSemestersData.filter(
    (student) =>
      student.CODIGO_ESTUDIANTE.toString().includes(failedSemestersSearch) ||
      student.LOGIN.toLowerCase().includes(failedSemestersSearch.toLowerCase()),
  )

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reporte de Estudiantes en Riesgo</h1>
          <p className="text-gray-600 mt-2">
            Visualización de estudiantes con materias bloqueantes y semestres perdidos
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="multiple-attempts" className="text-base py-3">
              Estudiantes con Múltiples Intentos
            </TabsTrigger>
            <TabsTrigger value="failed-semesters" className="text-base py-3">
              Semestres Consecutivos Perdidos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="multiple-attempts">
            <Card>
              <CardHeader className="bg-[#a7bd62]/10 pb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-xl text-gray-800">Estudiantes con Materias Bloqueantes</CardTitle>
                    <CardDescription>Estudiantes que han tomado materias 4+ veces</CardDescription>
                  </div>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Buscar por código o login"
                      className="pl-8"
                      value={multipleAttemptsSearch}
                      onChange={(e) => setMultipleAttemptsSearch(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <MultipleAttemptsTable data={filteredMultipleAttemptsData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="failed-semesters">
            <Card>
              <CardHeader className="bg-[#a7bd62]/10 pb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-xl text-gray-800">Estudiantes con Semestres Perdidos</CardTitle>
                    <CardDescription>Estudiantes que han perdido 2+ semestres consecutivos</CardDescription>
                  </div>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Buscar por código o login"
                      className="pl-8"
                      value={failedSemestersSearch}
                      onChange={(e) => setFailedSemestersSearch(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <FailedSemestersTable data={filteredFailedSemestersData} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}