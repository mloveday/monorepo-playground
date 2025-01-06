import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiBaseQuery = fetchBaseQuery({baseUrl: '/api'});