
import { useGetSingleEmployeeQuery } from '../../features/employee/employeeApi';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';

const DetailsOfficeEmployee = () => {
  const { id: empId } = useParams();
  const { data: employee, isLoading: empIsLoading, isError: empIsError, refetch: refetchEmployee } = useGetSingleEmployeeQuery(empId);

  const {name, email, phone,emergencyContact,address,bloodGroup ,joiningDate,department,supervisor,nidNumber,passportNumber, bio,image}= employee?.data || {}

  return (

    <div className="mx-auto">
      <div className='pr-6 pt-2 pl-6 pb-2 rounded'>
        <div className="text-sm breadcrumbs">
          <ul>
            <li><Link to='/employee' className='text-blue-600'> Back to employee</Link> </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-100 bg-opacity-25">

        <div className="lg:w-8/12 lg:mx-auto mb-8">

          <header className="flex flex-wrap items-start justify-start p-4 md:py-8">

            <div className="">
              <img className="w-20 h-20 md:w-30 md:h-30 object-cover rounded-2xl
                      p-1" src={image } alt="profile" />
            </div>


            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-2">
                <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                  {name}
                </h2>
              </div>

              <div className="hidden md:block">
                <span> This is {name}..</span>
                <p>{ bio}</p>
              </div>

            </div>

          </header>

          <div className=" md:px-3">

            <ul className="tabs flex items-center justify-around md:justify-start space-x-12  
                    uppercase tracking-widest font-semibold text-xs text-gray-600
                    border-t border-b">
              <li className=" md:border-gray-700 md:-mt-px md:text-gray-700">
                <NavLink to={`/employee/${empId}/`} end className="  empDetails-tab  inline-block p-3" >
                  <span className="hidden md:inline">Details</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={`/employee/${empId}/devices`} className=" empDetails-tab inline-block p-3" >
                  <span className="hidden md:inline">Devices</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={`/employee/${empId}/leave`} className=" empDetails-tab inline-block p-3" >
                  <span className="hidden md:inline">Leave</span>
                </NavLink>
              </li>
            </ul>
            <div className="flex flex-wrap -mx-px md:-mx-3">

              <Outlet employee={employee} ></Outlet>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EmployeeDetails = () => {
  const { id: empId } = useParams();
  const { data: employee, isLoading: empIsLoading, isError: empIsError, refetch: refetchEmployee } = useGetSingleEmployeeQuery(empId);

  const {name, email, phone,emergencyContact,address,bloodGroup ,joiningDate,department,supervisor,nidNumber,passportNumber,}= employee?.data || {}

  return (
    <div className="lg:w-full lg:mx-auto overflow-x-auto">
      <table className="table  border-t-blue-200 table-zebra">
        <tbody>
          <tr>
            <td>Name</td>
            <td>{ name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{ email }</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{phone }</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{ address }</td>
          </tr>
          <tr>
            <td>Emargency Contact</td>
            <td>{ emergencyContact}</td>
          </tr>
          <tr>
            <td>Blood Group</td>
            <td>{ bloodGroup}</td>
          </tr>
          <tr>
            <td>Department</td>
            <td>{ department}</td>
          </tr>
          <tr>
            <td>Supervisor</td>
            <td>{ supervisor}</td>
          </tr>
          <tr>
            <td>Joining Date</td>
            <td>{ joiningDate}</td>
          </tr>
          <tr>
            <td>Nid Number</td>
            <td>{ nidNumber}</td>
          </tr>
          <tr>
            <td>Passport Number</td>
            <td>{ passportNumber}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export const EmployeeDevices = () => {
  const { id: empId } = useParams();
  const { data: employee, isLoading: empIsLoading, isError: empIsError, refetch: refetchEmployee } = useGetSingleEmployeeQuery(empId);
  console.log(employee?.data)
  return (
    <div className="lg:w-full lg:mx-auto overflow-x-auto">
      <table className="table  border-t-blue-200 table-zebra">
        <thead>
          <tr>
            <td>Image</td>
            <td>Name</td>
            <td>Date</td>
            <td>Purchase Date</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img className='w-10 h-10 object-cover' src='https://www.borofone.com/wp-content/uploads/2022/10/borofone-bo104-phantom-gaming-headphones.jpg ' alt='product-imag' /></td>
            <td>Dell Leptop</td>
            <td>02/12/2023</td>
            <td>02/12/2023</td>
          </tr>
          <tr>
            <td><img className='w-10 h-10 object-cover' src='https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/p/l/plextone-boost1-bone-conduction-headphones-3.jpg' alt='product-imag' /></td>
            <td>Dell Leptop</td>
            <td>02/12/2023</td>
            <td>02/12/2023</td>
          </tr>
          <tr>
            <td><img className='w-10 h-10 object-cover' src='https://m.media-amazon.com/images/I/51fXuiChdJL._AC_UF1000,1000_QL80_.jpg ' alt='product-imag' /></td>
            <td>Dell Leptop</td>
            <td>02/12/2023</td>
            <td>02/12/2023</td>
          </tr>
          <tr>
            <td><img className='w-10 h-10 object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSba_XQJTDceTk_E_sIftn78BN9tYTX1FkxJUxqzEkKeJaVJH-j9btxJBN6K5gEJ00Lmyc&usqp=CAU' alt='product-imag' /></td>
            <td>Dell Leptop</td>
            <td>02/12/2023</td>
            <td>02/12/2023</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export const EmployeeLeave = () => {
  const { id: empId } = useParams();
  const { data: employee, isLoading: empIsLoading, isError: empIsError, refetch: refetchEmployee } = useGetSingleEmployeeQuery(empId);
  return (
    <div className="lg:w-full lg:mx-auto overflow-x-auto">
      <table className="table  border-t-blue-200 table-zebra">
        <thead>
          <tr>
            <td>#</td>
            <td>Date</td>
            <td>Duration</td>
            <td>Reason</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>02/23/2023</td>
            <td>2 Day</td>
            <td>Family Reason</td>
          </tr>
          <tr>
            <td>2</td>
            <td>02/23/2023</td>
            <td>2 Day</td>
            <td>Family Reason</td>
          </tr>
          <tr>
            <td>3</td>
            <td>02/23/2023</td>
            <td>2 Day</td>
            <td>Family Reason</td>
          </tr>
          <tr>
            <td>4</td>
            <td>02/23/2023</td>
            <td>2 Day</td>
            <td>Family Reason</td>
          </tr>
          <tr>
            <td>5</td>
            <td>02/23/2023</td>
            <td>2 Day</td>
            <td>Family Reason</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DetailsOfficeEmployee;


