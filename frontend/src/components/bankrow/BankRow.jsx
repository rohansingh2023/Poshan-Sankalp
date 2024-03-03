"use client"
import React from 'react'

function BankRow({name, email, address, contact}) {
  console.log(name, email, address, contact)
  
  return (
    <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src="https://demos.creative-tim.com/notus-js/assets/img/bootstrap.jpg"
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  />
                  <span className="ml-3 font-bold text-white">
                    {" "}
                    {name}{" "}
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  A+
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-orange-500 mr-2" />
                  units
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex">
                   {contact}
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <span className="ml-3 font-bold text-white">
                    {" "}
                    {address}{" "}
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <a
                    href="#pablo"
                    className="text-blueGray-500 block py-1 px-3"
                    onclick="openDropdown(event,'table-dark-1-dropdown')"
                  >
                    <i className="fas fa-ellipsis-v" />
                  </a>
                  <div
                    className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                    id="table-dark-1-dropdown"
                  >
                    <a
                      href="#pablo"
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    >
                      Action
                    </a>
                    <a
                      href="#pablo"
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    >
                      Another action
                    </a>
                    <a
                      href="#pablo"
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    >
                      Something else here
                    </a>
                    <div className="h-0 my-2 border border-solid border-blueGray-100" />
                    <a
                      href="#pablo"
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    >
                      Seprated link
                    </a>
                  </div>
                </td>
              </tr>
  )
}

export default BankRow