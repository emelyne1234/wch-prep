import { monitorTable } from "@/components/dashboard/constant";
import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className="lg:p-24 mt-10 p-2">
      <h1 className="text-2xl font-bold mb-6">Project Join Requests</h1>

      <div className="min-w-3/4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                monitorTable.map((item) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10">
                        <Image src={item.image} alt="user" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.user}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.project}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.requestDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600">
                    Accept
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                    Deny
                  </button>
                </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
