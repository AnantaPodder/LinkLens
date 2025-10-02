'use client';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { apiClient } from '@/lib/api';
import { useEffect, useState } from 'react';

export interface LinkResponse {
  id: number;
  url: string;
  shortenedUrl: string;
  createdAt: Date;
  deleted: boolean;
  userId: number;
}

function getShortenedLinks() {
  const [data, setData] = useState<LinkResponse[]>([]);

  useEffect(() => {
    apiClient
      .get<LinkResponse[]>('/links')
      .then(r => {
        setData(r);
      })
      .catch(err => {
        setData([]);
      });
  }, []);

  return data;
}

export function LinkDataTable() {
  const data = getShortenedLinks();

  const columnHelper = createColumnHelper<LinkResponse>();

  const columns: ColumnDef<LinkResponse>[] = [
    { accessorKey: 'id', header: 'Id' },
    { accessorKey: 'shortenedUrl', header: 'Short URL' },
    { accessorKey: 'url', header: 'URL' },
    { accessorKey: 'createdAt', header: 'Created At' },
    { accessorKey: 'deleted', header: 'Is Deleted' },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
      <table className="border border-gray-300 w-full">
        <thead>
          {table.getHeaderGroups().map(hGroup => (
            <tr key={hGroup.id}>
              {hGroup.headers.map(headers => (
                <th
                  key={headers.id}
                  className="border border-gray-300 p-2 text-left bg-gray-100"
                >
                  {flexRender(
                    headers.column.columnDef.header,
                    headers.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border border-gray-300 p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LinksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
          <h1 className="text-center text-3xl font-bold">Shortened Links</h1>
          <LinkDataTable />
        </section>
      </main>
      <Footer />
    </div>
  );
}
