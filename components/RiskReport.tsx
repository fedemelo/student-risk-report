"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import MultipleAttemptsTable, { MultipleAttemptsStudentData } from "@/components/MultipleAttemptsTable"
import FailedSemestersTable, { FailedSemestersStudentData } from "@/components/FailedSemestersTable"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import downloadCSV from "@/lib/csv-downloader"

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
          <h1 className="text-3xl font-bold text-gray-900">Reporte de estudiantes en riesgo</h1>
          <p className="text-gray-600 mt-2">
            Estudiantes con materias bloqueantes y semestres perdidos, dos tipos de riesgos que no generan alertas (e.g., no están en prueba académica ni similares) pero sí constituyen un riesgo inminente de deserción.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-col sm:grid sm:grid-cols-2 gap-0 mb-6 pb-10 sm:mb-8 bg-transparent">
            <TabsTrigger
              value="multiple-attempts"
              className="text-base w-full whitespace-normal text-center data-[state=active]:bg-transparent data-[state=active]:text-[#a7bd62] data-[state=active]:font-semibold border-b-2 border-transparent data-[state=active]:border-[#a7bd62]"
            >
              Materias bloqueantes
            </TabsTrigger>
            <TabsTrigger
              value="failed-semesters"
              className="text-base w-full whitespace-normal text-center data-[state=active]:bg-transparent data-[state=active]:text-[#a7bd62] data-[state=active]:font-semibold border-b-2 border-transparent data-[state=active]:border-[#a7bd62]"
            >
              Semestres perdidos consecutivos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="multiple-attempts">
            <Card>
              <CardHeader className="bg-[#a7bd62]/10 pb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-xl text-gray-800">Estudiantes con materias bloqueantes</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Han tomado una o más materias 4+ veces sin aprobarlas.
                      <span className="hidden sm:inline"><br />Esto constituye un riesgo inminente de deserción.</span>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-[#a7bd62] border-[#a7bd62] hover:bg-[#a7bd62]/10"
                      onClick={() => downloadCSV(multipleAttemptsData, 'estudiantes_materias_bloqueantes.csv')}
                    >
                      <Download className="h-4 w-4" /> Descargar CSV
                    </Button>
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
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <MultipleAttemptsTable data={filteredMultipleAttemptsData as MultipleAttemptsStudentData[]} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="failed-semesters">
            <Card>
              <CardHeader className="bg-[#a7bd62]/10 pb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-xl text-gray-800">Estudiantes con semestres perdidos</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Han perdido 2+ semestres consecutivos sin estar en prueba académica.
                      <span className="hidden sm:inline"><br />Son estudiantes en riesgo que han permanecido indetectados.</span>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-[#a7bd62] border-[#a7bd62] hover:bg-[#a7bd62]/10"
                      onClick={() => downloadCSV(failedSemestersData, 'estudiantes_semestres_perdidos.csv')}
                    >
                      <Download className="h-4 w-4" /> Descargar CSV
                    </Button>
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
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <FailedSemestersTable data={filteredFailedSemestersData as FailedSemestersStudentData[]} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}