import { API_REQUEST_HEADERS, API_URL } from '@/utils/constants'

type Method = 'get' | 'post' | 'put' | 'delete'

interface Payload {
  method?: Method
  routeBase?: string
  params?: object
  data?: object
  url?: string
  id?: string
}

/**
 * This composable is used to make API requests.
 *
 * @function useApi
 * @returns {Object} An object containing the following methods:
 *  - `request`: Makes an API request with the given payload.
 *  - `addItem`: Adds an item to the API.
 *  - `deleteItem`: Deletes an item from the API.
 *  - `updateItem`: Updates an item in the API.
 *  - `getAllItems`: Gets all items from the API.
 *  - `getItem`: Gets an item from the API.
 *  - `handleError`: Handles an error from the API.
 */
export const useApi = () => {
  /**
   * Handles an error from the API.
   *
   * If the error is an AxiosError, logs the error response to the console.
   * If the error is a generic Error, logs the error message to the console.
   * If the error request exists, logs the request to the console.
   * Logs the config to the console.
   *
   * @param {Error} error - The error to handle.
   * @returns {void}
   */
  const handleError = (error: any): void => {
    if (import.meta.env.DEV) {
      if (error.response) {
        console.log('data:', error.response.data)
        console.log('status:', error.response.status)
        console.log('headers:', error.response.headers)
      } else if (error.request) {
        console.log('request:', error.request)
      } else {
        console.log('error:', error.message)
      }

      console.log('config:', error.config)
    }
  }

  /**
   * Makes an API request with the given payload.
   *
   * @param {Payload} payload - The request payload containing method, params, data, url, etc.
   * @returns {Promise<any>} A promise that resolves to an object containing:
   *   - `success`: A boolean indicating the success of the request.
   *   - `failure`: A boolean indicating the failure of the request.
   *   - `result`: The data returned from the API if the request is successful.
   *   - `error`: The error object if the request fails.
   */
  const request = async (payload: Payload): Promise<any> => {
    const authStore = useAuthStore()

    let success = false

    let response: any = null
    let error = null

    try {
      const headers: {
        'X-API-Key': string
        Authorization?: string
      } = API_REQUEST_HEADERS

      headers['Authorization'] = `Bearer ${authStore.accessToken}`

      response = await axios.request({
        method: payload.method || 'get',
        params: payload.params || {},
        data: payload.data || {},
        url: payload.url || '/',
        baseURL: API_URL,
        headers,
      })

      success = true
    } catch (err: any) {
      error = err

      success = false

      if (err.response && err.response.status == 401) {
        authStore.resetAuthData()

        router.replace('/login')
      } else handleError(err)
    }

    return {
      success: success,
      failure: !success,
      result: response ? response.data : null,
      error: error,
    }
  }

  /**
   * Sends a POST request to add a new item to the given route base.
   * @param {Payload} payload The payload to send with the request.
   * @returns {Promise<{success: boolean, failure: boolean, result: any, error: any}>} The result of the request.
   */
  const addItem = async (
    payload: Payload
  ): Promise<{
    success: boolean
    failure: boolean
    result: any
    error: any
  }> => {
    const task = await request({
      url: `/${payload.routeBase}`,
      method: 'post',
      data: payload.data,
    })

    return task
  }

  /**
   * Sends a DELETE request to remove an item from the specified route base.
   * @param {Payload} payload - The payload containing routeBase and id of the item to be deleted.
   * @returns {Promise<{success: boolean, failure: boolean, result: any, error: any}>} The result of the request.
   */
  const deleteItem = async (
    payload: Payload
  ): Promise<{
    success: boolean
    failure: boolean
    result: any
    error: any
  }> => {
    const task = await request({
      url: `/${payload.routeBase}/${payload.id}`,
      method: 'delete',
    })

    return task
  }

  /**
   * Sends a PUT request to update an item at the specified route base.
   * @param {Payload} payload - The payload containing routeBase, id of the item to be updated, and the data to be updated with.
   * @returns {Promise<{success: boolean, failure: boolean, result: any, error: any}>} The result of the request.
   */
  const updateItem = async (
    payload: Payload
  ): Promise<{
    success: boolean
    failure: boolean
    result: any
    error: any
  }> => {
    const task = await request({
      url: `/${payload.routeBase}/${payload.id}`,
      method: 'put',
      data: payload.data,
    })

    return task
  }

  /**
   * Sends a GET request to retrieve all items from the given route base.
   * @param {Payload} payload The payload containing routeBase.
   * @returns {Promise<{success: boolean, failure: boolean, result: any, error: any}>} The result of the request.
   */
  const getAllItems = async (
    payload: Payload
  ): Promise<{
    success: boolean
    failure: boolean
    result: any
    error: any
  }> => {
    const task = await request({
      url: `/${payload.routeBase}`,
    })

    return task
  }

  /**
   * Sends a GET request to retrieve an item from the given route base.
   * @param {Payload} payload The payload containing routeBase and id of the item to be retrieved.
   * @returns {Promise<{success: boolean, failure: boolean, result: any, error: any}>} The result of the request.
   */
  const getItem = async (
    payload: Payload
  ): Promise<{
    success: boolean
    failure: boolean
    result: any
    error: any
  }> => {
    const task = await request({
      url: `/${payload.routeBase}/${payload.id}`,
    })

    return task
  }

  return {
    request,
    getItem,
    addItem,
    updateItem,
    deleteItem,
    getAllItems,
    handleError,
  }
}
