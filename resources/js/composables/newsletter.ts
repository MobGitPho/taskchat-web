import { ResponseErrorCode } from '@/enums/response-error-code'

/**
 * A composable that exposes functions to subscribe the user to the newsletter using
 * email or phone.
 *
 * @returns An object containing the subscribeEmail, subscribePhone, and isLoading
 * properties.
 *
 * @remarks
 * The subscribeEmail and subscribePhone functions are asynchronous and return nothing.
 * The isLoading property is a boolean that indicates whether a subscription request is
 * being processed.
 *
 * The subscribeEmail function takes an email address and an optional success callback.
 * The subscribePhone function takes a phone number and an optional success callback.
 *
 * If the request is successful, the user will be subscribed to the newsletter and the
 * success callback will be called. If the request fails, an appropriate error message
 * will be displayed to the user.
 *
 * The error messages are as follows:
 * - If the request is invalid, the form errors will be displayed.
 * - If the request is valid but results in an error, a generic error message will be
 * displayed.
 */
export const useNewsletter = () => {
  const { request } = useApi()
  const { displayFormErrors } = useHelper()

  const isLoading = ref(false)

  /**
   * Subscribes a user to the newsletter using their email address.
   *
   * @param email - The email address to subscribe.
   * @param successCallback - An optional callback function that is called upon
   * successful subscription.
   * @remarks
   * This function is asynchronous and does not return a value. It calls the
   * `subscribe` function with 'email' as the type.
   */
  const subscribeEmail = async (
    email: string,
    successCallback: (() => void) | undefined = undefined
  ) => {
    await subscribe('email', email, successCallback)
  }

  /**
   * Subscribes a user to the newsletter using their phone number.
   *
   * @param phone - The phone number to subscribe. The phone number will be
   * stripped of whitespace characters before it is sent to the server.
   * @param successCallback - An optional callback function that is called upon
   * successful subscription.
   * @remarks
   * This function is asynchronous and does not return a value. It calls the
   * `subscribe` function with 'phone' as the type.
   */
  const subscribePhone = async (
    phone: string,
    successCallback: (() => void) | undefined = undefined
  ) => {
    await subscribe('phone', phone.replace(/\s+/g, ''), successCallback)
  }

  /**
   * Subscribes a user to the newsletter using the specified contact information.
   *
   * @param type - The type of contact information to use. Valid values are 'email'
   * and 'phone'.
   * @param contact - The contact information to use, such as an email address or a
   * phone number.
   * @param successCallback - An optional callback function that is called upon
   * successful subscription.
   * @remarks
   * This function is asynchronous and does not return a value. If the request is
   * invalid, the form errors will be displayed. If the request is valid but results
   * in an error, a generic error message will be displayed. If the request is
   * successful and a success callback is provided, it will be called.
   */
  const subscribe = async (
    type: 'email' | 'phone',
    contact: string,
    successCallback: (() => void) | undefined = undefined
  ) => {
    isLoading.value = true

    const task = await request({
      url: `newsletter/${type}s`,
      method: 'post',
      data: type === 'email' ? { email: contact } : { phone: contact },
    })

    if (task.failure && task.error) {
      switch (task.error?.response?.data?.errorCode) {
        case ResponseErrorCode.FORM_INVALID_DATA:
          displayFormErrors(task.error?.response?.data?.data)
          break
        default:
          window.$message.error(trans('An error occurred. Please try again.'))
          break
      }
    } else {
      if (successCallback) successCallback()

      window.$message.success(trans('Successfully subscribed!'))
    }

    isLoading.value = false
  }

  return {
    subscribePhone,
    subscribeEmail,
    isLoading,
  }
}
