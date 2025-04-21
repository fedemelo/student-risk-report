"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"

interface StudentData {
  CODIGO_ESTUDIANTE: string;
  LOGIN: string;
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

export default function MultipleAttemptsTable({ data }: { data: StudentData[] }) {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "ascending" | "descending";
  }>({
    key: null,
    direction: "ascending",
  })

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0

    const aValue = a[sortConfig.key as keyof StudentData]
    const bValue = b[sortConfig.key as keyof StudentData]

    if ((aValue ?? "") < (bValue ?? "")) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if ((aValue ?? "") > (bValue ?? "")) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  const requestSort = (key: string | null) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (columnName: string | null) => {
    if (sortConfig.key !== columnName) {
      return null
    }
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    )
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#a7bd62]/5">
            <TableRow>
              <TableHead className="w-[100px] cursor-pointer" onClick={() => requestSort("CODIGO_ESTUDIANTE")}>
                <div className="flex items-center">Código {getSortIcon("CODIGO_ESTUDIANTE")}</div>
              </TableHead>
              <TableHead>Perfil de No Estás Solo</TableHead>
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
      <div className="p-4 border-t bg-[#a7bd62]/5">
        <p className="text-sm font-medium">Total: {sortedData.length} estudiantes en riesgo</p>
      </div>
    </div>
  )
}
