import React from 'react';
import { Link } from 'react-router-dom';

export interface MyCardProps {
  id: string;
  index: number;
  title: string;
}

export default function MyCard({ id, index, title }: MyCardProps) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 text-[22px]">
      <td className="p-4 text-center font-bold text-gray-600">
        {index}
      </td>
      <td className="p-4 text-gray-700">
        <Link to={`/writtenpage/${id}`} className="hover:underline">
          {title}
        </Link>
      </td>
    </tr>
  );
}
