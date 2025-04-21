import * as XLSX from 'xlsx';

export default function downloadAsExcel(data: Record<string, any>[], filename: string) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
  const excelBuffer = XLSX.write(workbook, { 
    bookType: 'xlsx', 
    type: 'array' 
  });
  
  const blob = new Blob([excelBuffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
  
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    const excelFilename = filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`;
    link.setAttribute('download', excelFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}