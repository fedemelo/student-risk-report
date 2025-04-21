export function parseMultipleAttemptsCSV(csvText: string) {
  // Split the CSV text into lines
  const lines = csvText.split("\n")

  // Extract headers (first line)
  const headers = lines[0].split(",")

  // Process each line (skip the header)
  return lines
    .slice(1)
    .filter((line) => line.trim() !== "") // Skip empty lines
    .map((line) => {
      const values = line.split(",")
      const student: Record<string, any> = {}

      // Map each value to its corresponding header
      headers.forEach((header, index) => {
        // Clean up the header (remove quotes, trim whitespace)
        const cleanHeader = header.replace(/"/g, "").trim()
        // Clean up the value (remove quotes, trim whitespace)
        const cleanValue = values[index] ? values[index].replace(/"/g, "").trim() : ""
        student[cleanHeader] = cleanValue
      })

      return student
    })
}

export function parseFailedSemestersCSV(csvText: string) {
  // Split the CSV text into lines
  const lines = csvText.split("\n")

  // Extract headers (first line)
  const headers = lines[0].split(",")

  // Process each line (skip the header)
  return lines
    .slice(1)
    .filter((line) => line.trim() !== "") // Skip empty lines
    .map((line) => {
      const values = line.split(",")
      const student: Record<string, any> = {}

      // Map each value to its corresponding header
      headers.forEach((header, index) => {
        // Clean up the header (remove quotes, trim whitespace)
        const cleanHeader = header.replace(/"/g, "").trim()
        // Clean up the value (remove quotes, trim whitespace)
        const cleanValue = values[index] ? values[index].replace(/"/g, "").trim() : ""
        student[cleanHeader] = cleanValue
      })

      return student
    })
}
