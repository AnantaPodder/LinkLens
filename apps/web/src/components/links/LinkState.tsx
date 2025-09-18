import { apiClient } from '@/lib/api';
import { useState } from 'react';

export default function LinkStateData() {
  const [totalLinks, setTotalLinks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [clicksThisMonth, setClicksThisMonth] = useState(0);

  apiClient
    .get<{
      totalLinks: number;
      totalClicks: number;
      thisMonthClicks: number;
    }>('/links/state')
    .then(response => {
      setTotalLinks(response.totalLinks);
      setTotalClicks(response.totalClicks);
      setClicksThisMonth(response.thisMonthClicks);
    })
    .catch(err => console.log(err));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Total Links
        </h3>
        <p className="text-3xl font-bold text-blue-600">{totalLinks}</p>
      </div>
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Total Clicks
        </h3>
        <p className="text-3xl font-bold text-green-600">{totalClicks}</p>
      </div>
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">This Month</h3>
        <p className="text-3xl font-bold text-purple-600">{clicksThisMonth}</p>
      </div>
    </div>
  );
}
