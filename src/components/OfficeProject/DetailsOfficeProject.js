
import { useGetSingleProjectQuery } from '../../features/project/projectApi';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';

const DetailsOfficeProject = () => {
  const { id: projectId } = useParams();
  const { data: project, isLoading: empIsLoading, isError: empIsError, refetch: refetchProject } = useGetSingleProjectQuery(projectId);

  const {name,description,startDate, deadline,client,image,}= project?.data || {}

  return (

    <div className="mx-auto">
      <div className='pr-6 pt-2 pl-6 pb-2 rounded'>
        <div className="text-sm breadcrumbs">
          <ul>
            <li><Link to='/project' className='text-blue-600'> Back to project</Link> </li>
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
                <p>{ description}</p>
              </div>

            </div>

          </header>

          <div className=" md:px-3">

            <ul className="tabs flex items-center justify-around md:justify-start space-x-12  
                    uppercase tracking-widest font-semibold text-xs text-gray-600
                    border-t border-b">
              <li className=" md:border-gray-700 md:-mt-px md:text-gray-700">
                <NavLink to={`/project/${projectId}/`} end className="  empDetails-tab  inline-block p-3" >
                  <span className="hidden md:inline">Details</span>
                </NavLink>
              </li>
            </ul>
            <div className="flex flex-wrap -mx-px md:-mx-3">

              <Outlet project={project} ></Outlet>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectDetails = () => {
  const { id: ProjectId } = useParams();
  const { data: project, isLoading: empIsLoading, isError: empIsError, refetch: refetchProject } = useGetSingleProjectQuery(ProjectId);

  const {name,startDate, deadline,client,}= project?.data || {}

  return (
    <div className="lg:w-full lg:mx-auto overflow-x-auto">
      <table className="table  border-t-blue-200 table-zebra">
        <tbody>
          <tr>
            <td>Email</td>
            <td>{ name }</td>
          </tr>
          <tr>
            <td>Client</td>
            <td>{client }</td>
          </tr>
          <tr>
            <td>Deadline</td>
            <td>{ deadline }</td>
          </tr>
          <tr>
            <td>Emargency Contact</td>
            <td>{ }</td>
          </tr>
          <tr>
            <td>Start Date</td>
            <td>{ startDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


export default DetailsOfficeProject;


