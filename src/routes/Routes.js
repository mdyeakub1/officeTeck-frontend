import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../components/RootLayout";
import { OfficeEmployee } from "../components/OfficeEmployee/OfficeEmployee";
import { OfficeProject } from "../components/OfficeProject/OfficeProject";
import { OfficeAsset } from "../components/OfficeAsset/OfficeAsset";
import { Dashboard } from "../components/Dashboard/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import AddOfficeEmployee from "../components/OfficeEmployee/AddOfficeEmployee";
import EditOfficeEmployee from "../components/OfficeEmployee/EditOfficeEmployee";
import DetailsOfficeEmployee, { EmployeeDetails, EmployeeDevices, EmployeeLeave } from "../components/OfficeEmployee/DetailsOfficeEmployee";
import AddOfficeProject from "../components/OfficeProject/AddOfficeProject";
import EditOfficeProject from "../components/OfficeProject/EditOfficeProject";
import DetailsOfficeProject, { ProjectDetails } from "../components/OfficeProject/DetailsOfficeProject";
import AddOfficeAsset from "../components/OfficeAsset/AddOfficeAsset";
import EditOfficeAsset from "../components/OfficeAsset/EditOfficeAsset";
import DetailsOfficeAsset, { AssetDetails } from "../components/OfficeAsset/DetailsOfficeAsset";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute><RootLayout></RootLayout></PrivateRoute>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: 'employee',
                element: <PrivateRoute><OfficeEmployee></OfficeEmployee></PrivateRoute>,
            },
            {
                path: 'employee/:id',
                element: <PrivateRoute><DetailsOfficeEmployee></DetailsOfficeEmployee></PrivateRoute>,
                children: [
                    {
                        path: '',
                        element: <PrivateRoute><EmployeeDetails></EmployeeDetails></PrivateRoute>
                    },
                    {
                        path: 'devices',
                        element: <PrivateRoute><EmployeeDevices></EmployeeDevices></PrivateRoute>
                    },
                    {
                        path: 'leave',
                        element: <PrivateRoute><EmployeeLeave></EmployeeLeave></PrivateRoute>
                    },
                ]
            },
            {
                path: 'employee/add',
                element: <PrivateRoute><AddOfficeEmployee></AddOfficeEmployee></PrivateRoute>
            },
            {
                path: 'employee/edit/:id',
                element: <PrivateRoute><EditOfficeEmployee></EditOfficeEmployee></PrivateRoute>
            },

            {
                path: 'project',
                element: <PrivateRoute><OfficeProject></OfficeProject></PrivateRoute>
            },
            {
                path: 'project/add',
                element: <PrivateRoute><AddOfficeProject></AddOfficeProject></PrivateRoute>
            },
            {
                path: 'project/:id',
                element: <PrivateRoute><DetailsOfficeProject></DetailsOfficeProject></PrivateRoute>,
                children: [
                    {
                        path: '',
                        element: <PrivateRoute><ProjectDetails></ProjectDetails></PrivateRoute>
                    }
                ]
            },
            {
                path: 'project/edit/:id',
                element: <PrivateRoute><EditOfficeProject></EditOfficeProject></PrivateRoute>
            },
            {
                path: 'asset',
                element: <PrivateRoute><OfficeAsset></OfficeAsset></PrivateRoute>
            },
            {
                path: 'asset/:id',
                element: <PrivateRoute><DetailsOfficeAsset></DetailsOfficeAsset></PrivateRoute>,
                children: [
                    {
                        path: '',
                        element: <PrivateRoute><AssetDetails></AssetDetails></PrivateRoute>
                    }
                ]
            },
            {
                path: 'asset/add',
                element: <PrivateRoute><AddOfficeAsset></AddOfficeAsset></PrivateRoute>
            },
            {
                path: 'asset/edit/:id',
                element: <PrivateRoute><EditOfficeAsset></EditOfficeAsset></PrivateRoute>
            }
        ]
    },
    {
        path: 'login',
        element: <PublicRoute><Login></Login></PublicRoute>
    },
    {
        path: 'register',
        element: <PublicRoute><Register></Register></PublicRoute>
    }
])