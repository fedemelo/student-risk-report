"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { MultiCombobox } from "@/components/ui/multi-combobox"

export interface MultipleAttemptsStudentData {
  CODIGO_ESTUDIANTE: string;
  LOGIN: string;
  PROGRAMA_1: string;
  CLASIFICACION_BECAS_EXTENDIDA: string;
  MATERIA_1?: string;
  VECES_1?: number;
  MATERIA_2?: string;
  VECES_2?: number;
  MATERIA_3?: string;
  VECES_3?: number;
  MATERIA_4?: string;
  VECES_4?: number;
  MATERIA_5?: string;
  VECES_5?: number;
  MATERIA_6?: string;
  VECES_6?: number;
}

export default function MultipleAttemptsTable({ data }: { data: MultipleAttemptsStudentData[] }) {

  const [programFilters, setProgramFilters] = useState<string[]>([])
  const [fundingFilters, setFundingFilters] = useState<string[]>([])

  const getUniqueValues = (key: keyof MultipleAttemptsStudentData) => {
    return Array.from(new Set(data.map(item => item[key])))
      .filter(Boolean)
      .sort() as string[]
  }

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "ascending" | "descending";
  }>({
    key: null,
    direction: "ascending",
  })

  const sortedData = [...data]
    .filter(student => {
      const matchesProgram = programFilters.length === 0 || programFilters.includes(student.PROGRAMA_1)
      const matchesClasificacion = fundingFilters.length === 0 ||
        fundingFilters.includes(student.CLASIFICACION_BECAS_EXTENDIDA)
      return matchesProgram && matchesClasificacion
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0

      const aValue = a[sortConfig.key as keyof MultipleAttemptsStudentData]
      const bValue = b[sortConfig.key as keyof MultipleAttemptsStudentData]

      if ((aValue ?? "") < (bValue ?? "")) return sortConfig.direction === "ascending" ? -1 : 1
      if ((aValue ?? "") > (bValue ?? "")) return sortConfig.direction === "ascending" ? 1 : -1

      return 0
    })

  const requestSort = (key: string | null) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") direction = "descending"

    setSortConfig({ key, direction })
  }

  const getSortIcon = (columnName: string | null) => {
    if (sortConfig.key !== columnName) return null

    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    )
  }

  return (
    <div>
      <div className="px-4 flex flex-col sm:flex-row gap-2 w-full">
        <div className="w-full flex flex-col sm:flex-row gap-2 mt-3">
          <MultiCombobox
            options={getUniqueValues("PROGRAMA_1")}
            values={programFilters}
            onChange={setProgramFilters}
            placeholder="Filtrar por programa"
            className="w-full sm:w-1/2"
          />
          <MultiCombobox
            options={getUniqueValues("CLASIFICACION_BECAS_EXTENDIDA")}
            values={fundingFilters}
            onChange={setFundingFilters}
            placeholder="Filtrar por financiación"
            className="w-full sm:w-1/2"
          />
        </div>
      </div>
      <p className="text-sm mt-3 mb-3 ml-5 mr-5 font-medium">Total: {sortedData.length} estudiantes en riesgo</p>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#a7bd62]/5">
            <TableRow>
              <TableHead className="w-[100px] cursor-pointer" onClick={() => requestSort("CODIGO_ESTUDIANTE")}>
                <div className="flex items-center">Código {getSortIcon("CODIGO_ESTUDIANTE")}</div>
              </TableHead>
              <TableHead>Perfil en NES</TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort("PROGRAMA_1")}>
                <div className="flex items-center">Programa {getSortIcon("PROGRAMA_1")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort("CLASIFICACION_BECAS_EXTENDIDA")}>
                <div className="flex items-center">Financiación {getSortIcon("CLASIFICACION_BECAS_EXTENDIDA")}</div>
              </TableHead>
              <TableHead colSpan={6}>Materias y número de intentos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((student, index) => (
              <TableRow key={student.CODIGO_ESTUDIANTE} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell className="font-medium">{student.CODIGO_ESTUDIANTE}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-[#a7bd62] border-[#a7bd62] hover:bg-[#a7bd62]/10"
                    onClick={() =>
                      window.open(
                        `https://noestassolo.virtual.uniandes.edu.co/perfil-estudiante/${student.LOGIN}`,
                        "_blank",
                      )
                    }
                  >
                    Ver perfil <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </TableCell>
                <TableCell>{student.PROGRAMA_1}</TableCell>
                <TableCell>{student.CLASIFICACION_BECAS_EXTENDIDA}</TableCell>
                <TableCell className="p-2">
                  {student.MATERIA_1 && (
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium">{student.MATERIA_1}</span>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 w-fit">
                        {student.VECES_1} intentos
                      </Badge>
                    </div>
                  )}
                </TableCell>
                <TableCell className="p-2">
                  {student.MATERIA_2 && (
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium">{student.MATERIA_2}</span>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 w-fit">
                        {student.VECES_2} intentos
                      </Badge>
                    </div>
                  )}
                </TableCell>
                <TableCell className="p-2">
                  {student.MATERIA_3 && (
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium">{student.MATERIA_3}</span>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 w-fit">
                        {student.VECES_3} intentos
                      </Badge>
                    </div>
                  )}
                </TableCell>
                <TableCell className="p-2">
                  {student.MATERIA_4 && (
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium">{student.MATERIA_4}</span>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 w-fit">
                        {student.VECES_4} intentos
                      </Badge>
                    </div>
                  )}
                </TableCell>
                <TableCell className="p-2">
                  {student.MATERIA_5 && (
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium">{student.MATERIA_5}</span>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 w-fit">
                        {student.VECES_5} intentos
                      </Badge>
                    </div>
                  )}
                </TableCell>
                <TableCell className="p-2">
                  {student.MATERIA_6 && (
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium">{student.MATERIA_6}</span>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 w-fit">
                        {student.VECES_6} intentos
                      </Badge>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
