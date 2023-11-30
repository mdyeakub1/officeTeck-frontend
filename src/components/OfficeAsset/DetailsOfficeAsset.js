
import { useGetSingleAssetQuery } from '../../features/asset/assetApi';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';

const DetailsOfficeAsset = () => {
  const { id: assetId } = useParams();
  const { data: asset, isLoading: empIsLoading, isError: empIsError, refetch: refetchAsset } = useGetSingleAssetQuery(assetId);

  const {name,description, image,}= asset?.data || {}

  return (

    <div className="mx-auto">
      <div className='pr-6 pt-2 pl-6 pb-2 rounded'>
        <div className="text-sm breadcrumbs">
          <ul>
            <li><Link to='/asset' className='text-blue-600'> Back to asset</Link> </li>
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
                <NavLink to={`/asset/${assetId}/`} end className="  empDetails-tab  inline-block p-3" >
                  <span className="hidden md:inline">Details</span>
                </NavLink>
              </li>
            </ul>
            <div className="flex flex-wrap -mx-px md:-mx-3">

              <Outlet asset={asset} ></Outlet>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AssetDetails = () => {
  const { id: AssetId } = useParams();
  const { data: asset, isLoading: empIsLoading, isError: empIsError, refetch: refetchAsset } = useGetSingleAssetQuery(AssetId);

  const {name,buyingDate, warranty,quantity,brand,}= asset?.data || {}

  return (
    <div className="lg:w-full lg:mx-auto overflow-x-auto">
      <table className="table  border-t-blue-200 table-zebra">
        <tbody>
          <tr>
            <td>Name</td>
            <td>{ name }</td>
          </tr>
          <tr>
            <td>buyingDate</td>
            <td>{buyingDate }</td>
          </tr>
          <tr>
            <td>warranty</td>
            <td>{ warranty }</td>
          </tr>
          <tr>
            <td>quantity</td>
            <td>{quantity }</td>
          </tr>
          <tr>
            <td>brand</td>
            <td>{ brand}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


export default DetailsOfficeAsset;


