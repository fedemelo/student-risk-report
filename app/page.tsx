import fs from 'fs/promises'
import path from 'path'
import { parseMultipleAttemptsCSV, parseFailedSemestersCSV } from "@/lib/csv-parser"
import RiskReport from '@/components/RiskReport'

export default async function Home() {
  const multipleAttemptsPath = path.join(process.cwd(), 'data', 'estudiantes_con_materia_bloqueante.csv')
  const failedSemestersPath = path.join(process.cwd(), 'data', 'estudiantes_semestres_perdidos_estado_normal.csv')

  const [multipleAttemptsContent, failedSemestersContent] = await Promise.all([
    fs.readFile(multipleAttemptsPath, 'utf-8'),
    fs.readFile(failedSemestersPath, 'utf-8')
  ])

  const multipleAttemptsData = parseMultipleAttemptsCSV(multipleAttemptsContent)
  const failedSemestersData = parseFailedSemestersCSV(failedSemestersContent)

  return (
    <RiskReport
      multipleAttemptsData={multipleAttemptsData}
      failedSemestersData={failedSemestersData}
    />
  )
}