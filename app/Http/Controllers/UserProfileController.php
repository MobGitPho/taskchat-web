<?php

namespace App\Http\Controllers;

use App\Enums\ProfileType;
use App\Models\SubscriberProfile;
use App\Models\User;
use Creopse\Creopse\Enums\ResponseErrorCode;
use Creopse\Creopse\Enums\ResponseStatusCode;
use Creopse\Creopse\Events\Auth\ProfileCreatedEvent;
use Creopse\Creopse\Events\Auth\ProfileUpdatedEvent;
use Creopse\Creopse\Http\Resources\UserResource;
use Creopse\Creopse\Http\Controllers\Controller as CreopseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserProfileController extends CreopseController
{
    /**
     * Handle an incoming profile creation request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function registerProfile(Request $request): JsonResponse
    {
        // Validate incoming request data
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'type' => 'required',
            'profile_data' => 'present|array'
        ]);

        // If data not valid return error
        if ($validator->fails()) {
            return $this->sendResponse(
                $validator->errors(),
                ResponseStatusCode::UNPROCESSABLE_ENTITY,
                'Validation failed',
                ResponseErrorCode::FORM_INVALID_DATA
            );
        }

        $user = User::find($request->input('id'));

        // Check if user already has profile
        if ($user->profile) {
            return $this->sendResponse(
                $validator->errors(),
                ResponseStatusCode::CONFLICT,
                'User already has profile',
                ResponseErrorCode::AUTH_PROFILE_ALREADY_EXISTS
            );
        }

        if ($user) {
            switch ($request->input('type')) {
                case ProfileType::SUBSCRIBER->value:
                    $subscriberValidator = Validator::make($request->input('profile_data'), []);

                    if ($subscriberValidator->fails()) {
                        return $this->sendResponse(
                            $validator->errors(),
                            ResponseStatusCode::UNPROCESSABLE_ENTITY,
                            'Validation failed',
                            ResponseErrorCode::FORM_INVALID_DATA
                        );
                    }

                    $subscriberProfile = SubscriberProfile::create([]);

                    if ($subscriberProfile) {
                        $user->profile_id = $subscriberProfile->id;
                        $user->profile_type = ProfileType::SUBSCRIBER->value;
                        $user->save();
                    }
                    break;

                default:
                    // In case user type not found
                    return $this->sendResponse(
                        $request->input('type'),
                        ResponseStatusCode::NOT_FOUND,
                        'Profile type not found',
                        ResponseErrorCode::AUTH_PROFILE_TYPE_NOT_FOUND,
                    );
            }

            $user->refresh();

            if ($user->profile) {
                event(new ProfileCreatedEvent($user->id));

                return $this->sendResponse(
                    new UserResource($user->load(['profile', 'roles', 'permissions'])),
                    ResponseStatusCode::OK,
                    'User profile created with success'
                );
            }

            // If profile not found
            return $this->sendResponse(
                null,
                ResponseStatusCode::NOT_FOUND,
                'Profile not found',
                ResponseErrorCode::AUTH_PROFILE_NOT_FOUND,
            );
        } else {
            // If user not found
            return $this->sendResponse(
                null,
                ResponseStatusCode::NOT_FOUND,
                'User not found',
                ResponseErrorCode::AUTH_USER_NOT_FOUND,
            );
        }
    }

    /**
     * Handle an incoming profile update request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function updateProfile(Request $request, int $id): JsonResponse
    {
        // Validate incoming request data
        $validator = Validator::make($request->all(), [
            'type' => 'required',
            'profile_data' => 'present|array'
        ]);

        // If data not valid return error
        if ($validator->fails()) {
            return $this->sendResponse(
                $validator->errors(),
                ResponseStatusCode::UNPROCESSABLE_ENTITY,
                'Validation failed',
                ResponseErrorCode::FORM_INVALID_DATA
            );
        }

        $profile = null;

        switch ($request->input('type')) {
            case ProfileType::SUBSCRIBER->value:

                $profile = SubscriberProfile::find($id);

                if ($profile) {
                    $profile->update($request->input('profile_data'));
                }
                break;

            default:
                // In case user type not found
                return $this->sendResponse(
                    $request->input('type'),
                    ResponseStatusCode::NOT_FOUND,
                    'Profile type not found',
                    ResponseErrorCode::AUTH_PROFILE_TYPE_NOT_FOUND,
                );
        }

        if ($profile) {
            event(new ProfileUpdatedEvent($profile, $request->input('type')));

            return $this->sendResponse(
                $profile,
                ResponseStatusCode::OK,
                'User profile updated with success'
            );
        }

        // If profile not found
        return $this->sendResponse(
            null,
            ResponseStatusCode::NOT_FOUND,
            'Profile not found',
            ResponseErrorCode::AUTH_PROFILE_NOT_FOUND,
        );
    }
}
