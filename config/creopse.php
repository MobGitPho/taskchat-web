<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Creopse Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains the configuration options for the Creopse package.
    | You can customize these settings to suit your application's needs.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | User Model
    |--------------------------------------------------------------------------
    |
    | Specifies the user model class that the package should use.
    | This is typically used for authentication, relationships, or other
    | user-related functionality.
    |
    | Default: \App\Models\User::class
    |
    */
    'user_model' => \App\Models\User::class,

    /*
    |--------------------------------------------------------------------------
    | Seed Default Data
    |--------------------------------------------------------------------------
    |
    | Determines whether the package should seed default data into the database
    | when running migrations or seeders.
    |
    | Set this to `true` to enable seeding of default data, or `false` to
    | disable it.
    |
    | Default: true
    |
    */
    'seed_default_data' => true,

    /*
    |--------------------------------------------------------------------------
    | Rate Limit
    |--------------------------------------------------------------------------
    |
    | Specifies the maximum number of requests allowed per minute for routes
    | or features protected by rate limiting.
    |
    | This value can be overridden by the `CREOPSE_RATE_LIMIT` environment
    | variable.
    |
    | Default: 600 (requests per minute)
    |
    */
    'rate_limit' => env('CREOPSE_RATE_LIMIT', 600),

    /*
    |--------------------------------------------------------------------------
    | Rate Limit By
    |--------------------------------------------------------------------------
    |
    | Specifies the criteria for applying rate limits. This can be either:
    | - 'ip': Rate limit by the client's IP address.
    | - 'user': Rate limit by the authenticated user.
    |
    | Default: 'ip'
    |
    */
    'rate_limit_by' => 'ip', // or 'user'

];
