import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function PostGraph() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      // Extract column D (index 3)
      const dates = sheetData
        .slice(1) // skip header
        .map(row => row[3])
        .filter(val => val !== undefined && val !== null);

      const counts = {};

      dates.forEach(dateVal => {
        let jsDate;

        if (typeof dateVal === 'number') {
          // Excel stores dates as serials — convert using XLSX parser
          const parsed = XLSX.SSF.parse_date_code(dateVal);
          if (parsed) {
            jsDate = new Date(parsed.y, parsed.m - 1, parsed.d, parsed.H, parsed.M, parsed.S);
          }
        } else {
          jsDate = new Date(dateVal);
        }

        if (jsDate && !isNaN(jsDate)) {
          const key = `${jsDate.getFullYear()}-${String(jsDate.getMonth() + 1).padStart(2, '0')}`;
          counts[key] = (counts[key] || 0) + 1;
        }
      });

      const formattedData = Object.entries(counts)
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .map(([month, count]) => ({ month, count }));

      setData(formattedData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="container">
      <h2 className="section-title">Monthly Post Count</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#0074D9" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
