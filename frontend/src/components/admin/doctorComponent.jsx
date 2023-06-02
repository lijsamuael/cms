import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import doctors from "../../models/doctors.json"
import Pagination from '../prescription/pagination/pagination';

export default function DoctorComponent(props) {

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState(doctors);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5; // Change this to adjust the number of page numbers to display
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = startPage + maxPageNumbers - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageNumbers + 1);
      // pageNumbers.pop('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 1) {
      pageNumbers.unshift("...");
      pageNumbers.unshift(1);
    }

    if (endPage < totalPages) {
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  

  //prev page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //next page
  const handleNextPage = () => {
    if (currentPage < Math.ceil(posts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };


  const handleSearch = (e) => {
    e.preventDefault();
    const results = doctors.filter((doctor) => {
      const searchQuery = searchText.toLowerCase();
      const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
      const id = doctor.id.toLowerCase();
      
      return (
        fullName.includes(searchQuery) ||
        id.includes(searchQuery)
      );
    });
    setSearchResults(results);
  };

  

 
  useEffect(() => {
    console.log(searchResults)
    console.log(posts)
  },[searchResults])


  return (
    <>
      <div class="mt-4 mx-4">
        <div class="flex flex-col items-end mb-10">
          <Link to="/adminDashbord/addDoctor">
            <button onclick="popuphandler(true)" class="focus:ring-2   bg-primary mb-5 focus:ring-offset-2 focus:ring-indigo-400 mt-4 sm:mt-0 inline-flex items-end justify-end px-6 py-3 primary hover:bg-indigo-600 focus:outline-none rounded">
              <p class="text-sm font-medium leading-none text-white">Add Doctor</p>
            </button>
          </Link>
          <form class="flex w-full items-center" onSubmit={handleSearch}>
            <label for="voice-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
              </div>
              <input type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search doctors " 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                required  />

            </div>
            <button onClick={handleSearch} type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-primary rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search</button>
          </form>

        {searchResults.length > 0 ? (
                      <table class="w-full sm:w-full mt-8">
                      <thead>
                        <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                          <th class="px-4 py-3">Doctor Full Name</th>
                          <th class="pr-4 py-3">Specialization</th>
                          <th class="px-4 py-3">Gender</th>
                          <th class="px-4 py-3">Id</th>
                          <th class="px-4 py-3">email</th>
                          <th class="px-4 py-3">password</th>
                          <th class="px-4 py-3">Contact</th>
                          <th class="px-4 py-4">Actions</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      {searchResults.map((doctor, index) => (
        
        <tr classNameName="text-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-gray-400">
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
              <img
                className=" w-full h-full rounded-full"
                src={doctor.image}
                alt=""
                loading="lazy"
              />
              <div
                className="absolute inset-0 rounded-full shadow-inner"
                aria-hidden="true"
              ></div>
            </div>
            <div>
              <p className="font-semibold">{doctor.firstName} {doctor.lastName}</p>
            </div>
          </div>
        </td>
        <td classNameName="px-4 py-3 text-sm">{doctor.specialization}</td>
        
        <td className="px-4 py-3 text-sm">{doctor.gender}</td>
        <td className="px-4 py-3 text-sm">{doctor.id}</td>
        <td className="px-4 py-3 text-sm">{doctor.email}</td>
        <td className="px-4 py-3 text-sm">{doctor.password}</td>
        <td className="px-4 py-3 text-sm">{doctor.contact}</td>
        <td className="px-2 py-3">
          <div className="inline-flex items-center space-x-3">
            <Link
              to="/adminDashbord/patientDetail"
              title="Edit"
              className="hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Link>
            <a className="w-5 h-5" x-data="{ tooltip: 'Delete' }" href="#" title="Delete" >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
                x-tooltip="tooltip"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </a>
            <Link
          to={`/adminDashbord/doctor/${doctor.id}`}
          className=" text-blue-500 hover:text-blue-200"
        >
        Detail
        </Link>
          </div>
        </td>
        </tr>
                      ))}
        
        
                      </tbody>
                    </table>
        ): (
          <p className='text-start w-full py-2 px-1'>No matching doctors found.</p>
        )}
        </div>
        <div class="w-full  rounded-lg shadow-xs">

          <div class="w-full   overflow-visible">


            <table class="w-full sm:w-full">
              <thead>
                <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th class="px-4 py-3">Doctor Full Name</th>
                  <th class="pr-4 py-3">Specialization</th>
                  <th class="px-4 py-3">Gender</th>
                  <th class="px-4 py-3">Id</th>
                  <th class="px-4 py-3">email</th>
                  <th class="px-4 py-3">password</th>
                  <th class="px-4 py-3">Contact</th>
                  <th class="px-4 py-4">Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {currentPosts.map((doctor, index) => (

<tr classNameName="text-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-gray-400">
<td className="px-4 py-3">
  <div className="flex items-center text-sm">
    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
      <img
        className=" w-full h-full rounded-full"
        src={doctor.image}
        alt=""
        loading="lazy"
      />
      <div
        className="absolute inset-0 rounded-full shadow-inner"
        aria-hidden="true"
      ></div>
    </div>
    <div>
      <p className="font-semibold">{doctor.firstName} {doctor.lastName}</p>
    </div>
  </div>
</td>
<td classNameName="px-4 py-3 text-sm">{doctor.specialization}</td>

<td className="px-4 py-3 text-sm">{doctor.gender}</td>
<td className="px-4 py-3 text-sm">{doctor.id}</td>
<td className="px-4 py-3 text-sm">{doctor.email}</td>
<td className="px-4 py-3 text-sm">{doctor.password}</td>
<td className="px-4 py-3 text-sm">{doctor.contact}</td>
<td className="px-2 py-3">
  <div className="inline-flex items-center space-x-3">
    <Link
      to="/adminDashbord/patientDetail"
      title="Edit"
      className="hover:text-black"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    </Link>
    <a className="w-5 h-5" x-data="{ tooltip: 'Delete' }" href="#" title="Delete" >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6"
        x-tooltip="tooltip"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </a>
    <Link
  to={`/adminDashbord/doctor/${doctor.id}`}
  className=" text-blue-500 hover:text-blue-200"
>
Detail
</Link>
  </div>
</td>
</tr>
              ))}


              </tbody>
            </table>
            <nav className='w-full'>
      <ul className="flex bg-blue-300  text-black rounded-lg font-[Poppins]">
        <li onClick={handlePrevPage}>
          <button
            className={`h-12 border-2 border-r-0 border-blue-500
               px-4 rounded-l-lg  ${
                 currentPage !== 1
                   ? "hover:bg-blue-500 hover:text-white border-blue-500"
                   : "hover:bg-blue-200 border-blue-300"
               }`}
          >
            prev
          </button>
        </li>
        {getPageNumbers().map((number, index) => (
          <li key={index}>
            <button
              onClick={() => {
                if (number !== "...") {
                  paginate(number);
                }
              }}
              className={`h-12 border-2 border-r-0 border-blue-500 
               w-12 hover:bg-blue-200 ${
                 currentPage === number && "bg-blue-500 text-white"
               }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li onClick={handleNextPage}>
          <button
            className={`h-12 border-2  
               px-4 rounded-r-lg ${
                 currentPage !== totalPages
                   ? "hover:bg-blue-500 hover:text-white border-blue-500"
                   : "hover:bg-blue-200 border-blue-300"
               }`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
          </div>

        </div>
      </div>
    </>);

}