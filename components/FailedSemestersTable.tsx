"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"

interface StudentData {
  CODIGO_ESTUDIANTE: string;
  LOGIN: string;
  NUM_SEMESTRES_PERDIDOS: string;
  PERIODO_MAS_RECIENTE_PERDIDO: string | null;
}

export default function FailedSemestersTable({ data }: { data: StudentData[] }) {
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

    if (aValue === null || bValue === null) {
      return 0
    }
    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (aValue > bValue) {
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

  const formatPeriod = (period: string | null) => {
    if (!period) return ""
    const year = period.toString().substring(0, 4)
    const semester = period.toString().substring(4)
    return `${year}-${semester}`
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
              <TableHead className="cursor-pointer" onClick={() => requestSort("NUM_SEMESTRES_PERDIDOS")}>
                <div className="flex items-center">Semestres perdidos {getSortIcon("NUM_SEMESTRES_PERDIDOS")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort("PERIODO_MAS_RECIENTE_PERDIDO")}>
                <div className="flex items-center">
                  Periodo más reciente {getSortIcon("PERIODO_MAS_RECIENTE_PERDIDO")}
                </div>
              </TableHead>
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
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      Number.parseInt(student.NUM_SEMESTRES_PERDIDOS) >= 3
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    } w-fit`}
                  >
                    {student.NUM_SEMESTRES_PERDIDOS}
                  </Badge>
                </TableCell>
                <TableCell>{formatPeriod(student.PERIODO_MAS_RECIENTE_PERDIDO)}</TableCell>
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
